import BasicParser from "./grammars/basic/BasicParser";
import  { CommonTokenStream, ParserRuleContext } from "antlr4"

export namespace BasicError {
  export type withType<T> = {
      type: T;
  };
  export interface ExprError extends withType<'IError'> {
    slice: string
  }
  export type expr = IExprMultDivExpr | IExprPlusMinExpr | IInt | ILBrExprRBr | ExprError;
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
  enterOuterAlt(localctx: ParserRuleContext, altNum: number): void {
    super.enterOuterAlt(localctx, altNum);
    if (localctx.parser !== undefined) {
      const rule = localctx.parser?.getRuleInvocationStack()[0]
      if (rule in this.count) {
        this.count[rule] += 1
      } else {
        this.count[rule] = 1
      }
    }
    //console.log(`Entering alternative ${altNum} of rule ${localctx.parser?.getRuleInvocationStack()}`);
  }

  getCount(rule: string) : number {
    return this.count[rule]
  }
}