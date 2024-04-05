# ANTLA

ANother Tool for Language Analysis

ANTLA generates a [*Typescript*](https://www.typescriptlang.org/) strongly-typed [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) from an [ANTLR](https://www.antlr.org/) grammar.

## Typing & Naming strategy

One of the main feature of the STAST is the automatic AST type generation.

Each parser rule generates a type. When the parser rule is a set of alternatives (separated by `|`), each atternative generates a type. The rule type is then the union of the alternative types.

A parser rule, just like an EBNF, is made of a list of alternatives, which itself is a list of elements:
* the alternative *name* is made of *all* its elements.
* The alternative *type* is only made of *non unique* elements.

An alternative, just like an EBNF, generates a *pojo* (aka record) type.

### Alternatives Naming

The basename for alternatives is the concatenation of each alternative name. An alternative name is also the concatenation of elements.

For Parser rules, the alternatives name is over-written by the rule name.

### Alternatives Typings

The TS type of an alternatives is the *union* of each alternative.

An alternative type is a *pojo*.

Each elligible element generates a pojo *field*. Elligigle elements are non-unique elements:
* parser rule
* non unique token
* ebnf

### Implementation

There is a common code for parser rule and EBNF, since both are list of list of elements.

Naming:
* `alternativesToName`
* `alternativeToName`
* `elementToName`:
  * `ebnf`: name of dedicated generated type (concateniation of alternative names)
  * `rule`: rule name
  * `token`:
    * concatenation of token names when alternatives of lexer elements
    * lexer rule name otherwise

Typing:
* `alternativesToType`
* `alternativeToType`
* `elementToType`:
  * `ebnf`: reference to dedicated generated type
  * `rule`: reference to rule
  * `token` (when non unique):
    * union of tokens when alternatives of lexer elements
    * atomic type (`string` or `number`) when specified

EBNF elements are typed as a reference type to a dedicated type.

## Examples

Example 1:

```antlr
prog:	expr EOF ;
````

generates:
```ts
type prog = {
  expr: expr // rule has only one alternative
}
```

Example 2:

```
expr:	expr ('*'|'/') expr
    |	expr ('+'|'-') expr
    |	INT
    |	'(' expr ')'
````

generates the basic following types (before simplification):

```ts

interface multToken expands withType<'mult'> {
  token : '*'
}

interface divToken expands withType<'div'> {
  token : '/'
}

type multDivToken = mult | div

interface plusToken expands withType<'plus'> {
  token : '+'
}

interface minusToken expands withType<'minus'> {
  token : '-'
}

type plusMinusToken = plus | minus

interface multDivExpr extends withType<'multDivExpr'> {
  expr1 : expr
  token : multDivToken
  expr2 : expr
}

interface plusMinusExpr extends withType<'plusMinusExpr'> {
  expr1 : expr
  token : plusMinusToken
  expr2 : expr
}

interface intExpr extends withType<'intExpr'> {
  value: number
}

interface leftBrightBrExpr extends withType<'leftBrightBrExpr'> {
  expr: expr
}

type expr = multDivExpr | plusMinusExpr | intExpr | leftBrightBrExpr
```

After simplification:

```ts

interface multDivPlusMinusExpr extends withType<'multDivExpr'> {
  expr1 : expr
  token : '*' | '/' | '+' | '-'
  expr2 : expr
}

interface intExpr extends withType<'intExpr'> {
  value: number
}

interface leftBrightBrExpr extends withType<'leftBrightBrExpr'> {
  expr: expr
}

type expr = multDivPlusMinusExpr | intExpr | leftBrightBrExpr

```

The POC for this project is to display the simplified (aka 'minimal') [`SimplExpr`](./tests/grammars/ExprSimple.g4) AST

TODO:
* ~~map grammar to grammar type (see [`grammar.ts`](./src/grammar.ts))~~
* simplify grammar (merge rules, ...)
* generate TS:
  * types (with error node)
  * visitor from antlr to TS type
  * generic folder/mapper

FURTHER TODO:
* package as command line tool
* mocha non regression tests