import { existsSync } from 'fs';
import { generate } from '../src/generate'

describe('Genreate files', () => {
  beforeAll(() => {
    // remove files ?
  })
  it('Generate Basic', () => {
    generate('./tests/grammars/basic/Basic.g4', './tests/basic.ts')
    const doesExist = existsSync('./tests/basic.ts');
    expect(doesExist).toBe(true)
  });
  it('Generate Expr', () => {
    generate('./tests/grammars/expr/Expr.g4', './tests/expr.ts')
    const doesExist = existsSync('./tests/expr.ts');
    expect(doesExist).toBe(true)
  });
  it('Generate Python3', () => {
    generate('./tests/grammars/python3/Python3Parser.g4', './tests/python3.ts')
    const doesExist = existsSync('./tests/python3.ts');
    expect(doesExist).toBe(true)
  });
})