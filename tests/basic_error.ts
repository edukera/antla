import  { CommonTokenStream, ParserRuleContext } from "antlr4"

import BasicParser from "./grammars/basic/BasicParser";

export namespace BasicError {
  export type withType<T> = {
      type: T;
  };
  export interface Error extends withType<'IError'> {
    slice: string
  }
  export type expr = IExprMultDivExpr | IExprPlusMinExpr | IInt | ILBrExprRBr | Error;
  export interface IExprMultDivExpr extends withType<"IExprMultDivExpr"> {
      expr1: expr;
      tMultIDiv: "*" | "/";
      expr2: expr;
  }
  export interface IExprPlusMinExpr extends withType<"IExprPlusMinExpr"> {
      expr1: expr;
      tPlusIMin: "+" | "-";
      expr2: expr;
  }
  export interface IInt extends withType<"IInt"> {
      int: number;
  }
  export interface ILBrExprRBr extends withType<"ILBrExprRBr"> {
      expr: expr;
  }
}

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