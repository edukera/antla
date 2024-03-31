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

The POC for this project is to display the simplified (aka 'minimal') [`SimplExpr`](./tests/grammars/ExprSimple.g4) AST

### Naming strategy

This section analyses the type naming strategy.

Type fields are named according to parser rule names, or `token` for parser rules.

Types are named:
* as the parser rule when there is only 1 alternative
* as the concatenated tokens, followed by parser rule name

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

generates:

```ts
interface multDivExpr extends withType<'multDivExpr'> {
  expr1 : expr
  token : '*' | '/'
  expr2 : expr
}

interface plusMinusExpr extends withType<'plusMinusExpr'> {
  expr1 : expr
  token : '+' | '-'
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