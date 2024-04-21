import { ErrorListener, IntervalSet, Lexer, Parser, ParserRuleContext, RecognitionException, Recognizer, Token, TokenStream } from "antlr4"

export type ErrorLocation = {
  line: number
  position: number
  rule: string
  count: number
}

interface CountWize {
  getCount: (rule: string) => number
}

export class ErrorLocationListener<T, P extends CountWize & Parser> implements ErrorListener<T> {
  errors : ErrorLocation[]
  constructor() {
    this.errors = []
  }
  syntaxError(
      recognizer: Recognizer<T>,
      offendingSymbol: T | undefined,
      line: number,
      charPositionInLine: number,
      msg: string,
      e: RecognitionException | undefined
  ): void {
    if (recognizer instanceof Parser) {
      const parser = recognizer as P
      const stack = parser.getRuleInvocationStack()
      this.errors.push({
        line: line,
        position: charPositionInLine,
        rule: stack[0],
        count: parser.getCount(stack[0])
      })
      //console.log(`Parser error at ${charPositionInLine} line ${line} with stack ${stack}`)
    } else if (recognizer instanceof Lexer) {
      //console.log(`Lexer error at ${charPositionInLine} line ${line}`)
      //const lexer = recognizer as Lexer
    } else {
      throw new Error('recognizer is not a parser or a lexer')
    }
  }
  public getErrors() : ErrorLocation[] {
    return this.errors
  }
}

export class SilentErrorListener extends ErrorListener<number> {
  syntaxError(
      recognizer: Recognizer<number>,
      offendingSymbol: number | undefined,
      line: number,
      charPositionInLine: number,
      msg: string,
      e: RecognitionException | undefined
  ): void {}
}

export const getErrorLocation = (ctx: ParserRuleContext, errors: ErrorLocation[], count: number) : ErrorLocation | undefined => {
  const start = ctx.start.start
  const stop = ctx.stop ? ctx.stop.start : start
  return errors.find(el => {
    return (el.count === count && el.position >= start && el.position <= stop)
  })
}

