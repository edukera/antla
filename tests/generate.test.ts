import { existsSync, unlinkSync } from 'fs';
import { generate } from '../src/generate'

const rm = (file: string) : void => {
  if (existsSync(file)) unlinkSync(file);
}

interface GenerateTest {
  title: string
  source: string
  output: string
}

const tests : GenerateTest[] = [
  {
    title: 'Generate Basic',
    source: './tests/grammars/basic/Basic.g4',
    output: './tests/basic.ts'
  },
  {
    title: 'Generate Expr',
    source: './tests/grammars/expr/Expr.g4',
    output: './tests/expr.ts'
  },
  {
    title: 'Generate Python3',
    source: './tests/grammars/python3/Python3Parser.g4',
    output: './tests/python3.ts'
  }
]

describe('Genreate files', () => {
  beforeAll(() => {
    tests.forEach(test => {
      rm(test.output)
    })
  })
  tests.forEach(test => {
    it(test.title, () => {
      generate(test.source, test.output)
      const doesExist = existsSync(test.output);
      expect(doesExist).toBe(true)
    });
  })
})