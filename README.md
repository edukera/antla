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

The basename for alternatives is the concatenation of each alternative name. An alternative name is also the concatenation of elements (see [`punctuation`](./src/tokendb.ts) dictionary for tokens).

Concatenation is only feasible when the alternative is not too complex. When it is, it is necessary to have another strategy.

For example the following rule 'typedargslist' from Python" grammar:

```
typedargslist
    : (
        tfpdef ('=' test)? (',' tfpdef ('=' test)?)* (
            ',' (
                '*' tfpdef? (',' tfpdef ('=' test)?)* (',' ('**' tfpdef ','?)?)?
                | '**' tfpdef ','?
            )?
        )?
        | '*' tfpdef? (',' tfpdef ('=' test)?)* (',' ('**' tfpdef ','?)?)?
        | '**' tfpdef ','?
    )
    ;

```

generates the following type name:
`ITfpdefEqTestQmarkComTfpdefEqTestQmarkStarComMultTfpdefComTfpdefEqTestQmarkStarComPowTfpdefComQmarkQmarkPowTfpdefComQmarkQmark` for the first alternative ...

The idea here is to base the naming of an alternative on its structural complexity (number of components and/or depth of ebnf structure ...)

Typically the third alternative `'**' tfpdef ','?` is simple, and the generated name by concatenation is manageable: `IPowTfpdefCom`.

In the above example, we need to rely on the `typedargslist`

```ts
type typedargslist = Itypedargslist1 | Itypedargslist2 | IPowTfpdefCom
```

#### Fields Naming

Each ebnf alternative generates an interface with fields.

The field naming strategy is as follows, based on the type of the element:
* reference: the field and type are named as the rule
* ebnf:
  * if alternatives are literals, the field is named as the *concatenation*of these literals
  * otherwise:
    - the *field* is named as the concatenation of the ebnf elements(concatenation keywords first, then parser rules ) under length constraint
    - the *type* is named as `<interface>_f<idx>`

Other elements are not considered for interface fields.

The naming question is partially answered. The `Itypedargslist1` type is an interface with 4 fields. The last field is for the following complex ebnf:

```
(
  '*' tfpdef? (',' tfpdef ('=' test)?)* (',' ('**' tfpdef ','?)?)?
  | '**' tfpdef ','?
)
```

With concatenation strategy, the field/type name would be `ComMultTfpdefComTfpdefEqTestQmarkStarComPowTfpdefComQmarkQmarkPowTfpdefComQmark` ...

Hence the naming strategy here is to use the interface name suffixed by `_f<idx>` as illustrated below:

```ts
interface Itypedargslist1 extends withType<"Itypedargslist1"> {
    tfpdef: tfpdef;
    eqTest?: EqTest;
    comTfpdefEqTestQmarks: ComTfpdefEqTestQmark[];
    typedargslist1_f4?: Itypedargslist1_field4;
}
```

For Parser rules, the alternatives name is over-written by the rule name.

### Alternatives Typings

The TS type of an alternatives is the *union* of each alternative.

An alternative type is a *pojo*.

Each elligible element generates a pojo *field*. Elligigle elements for fields are non-unique elements:
* parser rule
* non unique token
* ebnf

## Simplifications

An important step is the simplification of generated types.

For example:

```ts
interface IEqTest extends withType<"IEqTest"> {
    test: test;
}
type typedargslist133 = IEqTest;
interface IComTfpdefEqTestQmark extends withType<"IComTfpdefEqTestQmark"> {
    tfpdef: tfpdef;
    test?: typedargslist133;
}
```

is reduced to:
```ts
interface IComTfpdefEqTestQmark extends withType<"IComTfpdefEqTestQmark"> {
    tfpdef: tfpdef;
    test?: test;
}
```

The process applies the chain of equalities: `typedargslist133 -> IEqTest -> test`:
* first pass registers equalities `IEqTest = test; typedargslist133 = IEqTest`
* second pass reduces interface field type `typedargslist133`
* last phase removes unused types (here `typedargslist133` and `IEqTest`)

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

```antlr
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