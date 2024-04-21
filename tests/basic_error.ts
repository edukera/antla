import  { CommonTokenStream, ParserRuleContext } from "antlr4"

import BasicParser from "./grammars/basic/BasicParser";

export class ExtendedBasicParser extends BasicParser {
  count : { [rule: string] : number }
  constructor(input: CommonTokenStream) {
    super(input)
    this.count = {}
  }

  enterOuterAlt(ctx: ParserRuleContext, altNum: number): void {
    super.enterOuterAlt(ctx, altNum);
    //console.log(`Entering rule ${ctx.parser?.getRuleInvocationStack()[0]} (${altNum}) (between ${ctx.start.start} and ${ctx.start.stop} and ${ctx.stop?.start} and ${ctx.stop?.stop})`);
    if (ctx.parser !== undefined) {
      const rule = ctx.parser.getRuleInvocationStack()[0]
      if (rule in this.count) {
        this.count[rule] += 1
      } else {
        this.count[rule] = 1
      }
    }
  }

  getCount(rule: string) : number {
    return this.count[rule]
  }
}