import { CharStream, CommonTokenStream }  from 'antlr4';

import { MakeBasic } from './basicVisitors';
import BasicLexer from './grammars/basic/BasicLexer'
import BasicParser from './grammars/basic/BasicParser'

describe('Parse Basic example', () => {
  beforeAll(() => {})
  it('Parse basic expr: 1 + 1', () => {
    const data = '1 + 1'
    const chars = new CharStream(data); // replace this with a FileStream as required
    const lexer = new BasicLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new BasicParser(tokens);
    const tree = parser.prog();
    const maker = new MakeBasic()
    const expr = maker.visitProg(tree)
    console.log(JSON.stringify(expr, null, 2))
  })
})