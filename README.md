TODO:
* map grammar to grammar type (see [`grammar.ts`](./src/grammar.ts))
* simplify grammar (merge rules, ...)
* generate TS:
  * types (with error node)
  * visitor from antlr to TS type
  * generic folder/mapper

FURTHER TODO:
* package as command line tool
* mocha non regression tests

The POC for this project is to display the simplified (aka 'minimal') [`SimplExpr`](./tests/grammars/ExprSimple.g4) AST