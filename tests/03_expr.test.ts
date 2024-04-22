import { CharStream, CommonTokenStream }  from 'antlr4';
import { File_Context } from './grammars/expr/ExprParser';
import ExprLexer from './grammars/expr/ExprLexer';

import { ErrorLocation, ErrorLocationListener } from './utils';
import { ExtendedExprParser, MakeExpr } from './exprVisitors';

const getExprTree = (data: string) : [File_Context, ErrorLocation[]] => {
  const chars = new CharStream(data); // replace this with a FileStream as required
  const lexer = new ExprLexer(chars);
  lexer.removeErrorListeners()
  const listener = new ErrorLocationListener()
  lexer.addErrorListener(listener)
  const tokens = new CommonTokenStream(lexer);
  const parser = new ExtendedExprParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(listener);
  const tree = parser.file_();
  //console.log(listener.getErrors())
  return [tree, listener.getErrors()]
}

describe('Parse Expr example', () => {
  it('Eval expr "x = 1 + 1" as "x = 2"', () => {
    const data = 'x = 1 + 1'
    const [tree, errors] = getExprTree(data)
    const maker = new MakeExpr(data, errors)
    const expr = maker.visitFile_(tree)
  })
})