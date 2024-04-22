import { Expr } from "./expr";
import { EquationContext, ExpressionContext, File_Context, RelopContext } from "./grammars/expr/ExprParser";
import ExprVisitor from "./grammars/expr/ExprVisitor"
import { ErrorLocation } from "./utils";
import ExprParser from './grammars/expr/ExprParser';
import { CommonTokenStream, ParserRuleContext } from 'antlr4';

export class ExtendedExprParser extends ExprParser {
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

//
export class MakeExpr extends ExprVisitor<Expr.Expr> {
  count : { [rule: string] : number }
  errors: ErrorLocation[]
  data : string
  constructor(data: string, errors: ErrorLocation[]) {
    super()
    this.count = {}
    this.errors = errors
    this.data = data
  }
  public visitFile_ = (ctx: File_Context) : Expr.file_ => {
    return {
      type: 'IEquationEof',
      equations: ctx.equation_list().map(ctx => this.visitEquation(ctx))
    }
  };
  public visitEquation = (ctx: EquationContext) : Expr.equation => {
    return {
      type: 'IExpressionRelopExpression',
      expression1: this.visitExpression(ctx.expression(0)),
      relop: this.visitRelop(ctx.relop()),
      expression2: this.visitExpression(ctx.expression(1))
    }
  }
  public visitExpression = (ctx: ExpressionContext) : Expr.expression => {
    return { type: 'IError', slice: '' }
  }
  public visitRelop = (ctx: RelopContext) : '='|'<'|'>' => {
    const eq = ctx.EQ()
    const lt = ctx.LT()
    const gt = ctx.GT()
    if (eq !== null) return '='
    else if (lt !== null) return '<'
    else if (gt !== null) return '>'
    else return '='
  };
}
