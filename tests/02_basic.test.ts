import { CharStream, CommonTokenStream }  from 'antlr4';

import { ExtendedBasicParser } from './basic_error';
import { evalExpr, MakeBasicError, ppBasicError } from './basicVisitors';
import BasicLexer from './grammars/basic/BasicLexer'
import { ProgContext } from './grammars/basic/BasicParser'
import { ErrorLocation, ErrorLocationListener } from './utils';

const getBasicTree = (data: string) : [ProgContext, ErrorLocation[]] => {
  const chars = new CharStream(data); // replace this with a FileStream as required
  const lexer = new BasicLexer(chars);
  lexer.removeErrorListeners()
  const listener = new ErrorLocationListener()
  lexer.addErrorListener(listener)
  const tokens = new CommonTokenStream(lexer);
  const parser = new ExtendedBasicParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(listener);
  const tree = parser.prog();
  //console.log(listener.getErrors())
  return [tree, listener.getErrors()]
}

describe('Parse Basic example', () => {
  beforeAll(() => {})
  it('Eval basic expr "1 + 2 * (4 / 2)" as "5"', () => {
    const data = '1 + 2 * (4 / 2)'
    const [tree, errors] = getBasicTree('1 + 2 * (4 / 2)')
    const maker = new MakeBasicError(data, errors)
    const expr = maker.visitProg(tree)
    expect(ppBasicError(evalExpr(expr))).toBe('5')
  })
//  it('Eval basic expr with error: 1 + 2 * toto', () => {
//    const tree = getBasicTree('1 + 2 * toto')
//    const maker = new MakeBasicError()
//    const expr = maker.visitProg(tree)
//    expect(ppBasicError(evalExprError(expr))).toBe('1 + 2 * error')
//  })
//  it('Partial evaluation with error: (1 + 1) + 2 * toto', () => {
//    const tree = getBasicTree('(1 + 1) + 2 * toto \n')
//    const maker = new MakeBasicError()
//    const expr = maker.visitProg(tree)
//    console.log(JSON.stringify(evalExprError(expr), null, 2))
//    expect(ppBasicError(evalExprError(expr))).toBe('2 + 2 * error')
//  })
//  it('Partial evaluation with error: (1 + 1) + 2 % (3 + 5)', () => {
//    const data = '(1 + 1) + 2 % (3 + 5)\n'
//    const [tree, errors] = getBasicTree(data)
//    const maker = new MakeBasicError(data, errors)
//    const expr = maker.visitProg(tree)
//    //console.log(JSON.stringify(expr, null, 2))
//    //console.log(JSON.stringify(evalExprError(expr), null, 2))
//    expect(ppBasicError(evalExprError(expr))).toBe('2 + error{ 2 % (3 + 5) }')
//  })
  it('Partial evaluation with error "(1 1) + 2 * 3" as "error{ (1 1) } + 6"', () => {
    const data = '(1 1) + 2 * 3\n'
    const [tree, errors] = getBasicTree(data)
    const maker = new MakeBasicError(data, errors)
    const expr = maker.visitProg(tree)
    expect(ppBasicError(evalExpr(expr))).toBe('error{ (1 1) } + 6')
  })
})