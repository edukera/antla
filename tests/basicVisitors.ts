import { Basic } from './basic'
import { BasicError } from './basic_error'
import { ProgContext } from "./grammars/basic/BasicParser";
import { ExprContext } from "./grammars/basic/BasicParser";
import BasicVistor from './grammars/basic/BasicVisitor'
import { ErrorLocation, getErrorLocation } from './utils';

export class MakeBasic extends BasicVistor<Basic.expr> {
  constructor() {
    super()
  }

	public visitProg = (ctx: ProgContext) : Basic.expr => {
    return this.visitExpr(ctx.expr())
  }

	public visitExpr = (ctx: ExprContext) : Basic.expr => {
    if (ctx.expr_list().length === 2) {
      const expr1 = this.visitExpr(ctx.expr(0))
      const expr2 = this.visitExpr(ctx.expr(1))
      const op = ctx.getChild(1).getText()
      switch (op) {
        case "+":
        case "-": return {
          type: 'IExprPlusMinExpr',
          expr1: expr1,
          tPlusIMin: op,
          expr2: expr2
        }
        case "*":
        case "/": return {
          type: 'IExprMultDivExpr',
          expr1: expr1,
          tMultIDiv: op,
          expr2: expr2
        }
      }
    } else if (ctx.expr_list().length === 1) {
      const expr = this.visitExpr(ctx.expr(0))
      return {
        type: 'ILBrExprRBr',
        expr: expr
      }
    } else {
      const int = Number.parseInt(ctx.INT().getText())
      return {
        type: 'IInt',
        int: int
      }
    }
    throw new Error(`Cannot visit Expr: ${JSON.stringify(ctx, null, 2)}`)
  }
}

export class MakeBasicError extends BasicVistor<BasicError.expr> {
  count : { [rule: string] : number }
  errors: ErrorLocation[]
  data : string
  constructor(data: string, errors: ErrorLocation[]) {
    super()
    this.count = {}
    this.errors = errors
    this.data = data
  }

  private incrCount(rule: string) {
    if (rule in this.count) {
      this.count[rule] += 1
    } else {
      this.count[rule] = 1
    }
  }

	public visitProg = (ctx: ProgContext) : BasicError.expr => {
    return this.visitExpr(ctx.expr())
  }

	public visitExpr = (ctx: ExprContext) : BasicError.expr => {
    this.incrCount('expr')
    //console.log(this.data.slice(ctx.start.start, (ctx.stop? 1+ctx.stop.start : undefined)))
    const error = getErrorLocation(ctx, this.errors, this.count['expr'])
    if (error !== undefined) {
      return {
        type: 'IError',
        slice: this.data.slice(ctx.start.start, (ctx.stop? 1+ctx.stop.start : undefined))
      }
    } else if (ctx.exception !== null) {
      return {
        type: 'IError',
        slice: this.data.slice(ctx.start.start, (ctx.stop? 1+ctx.stop.start : undefined))
      }
    }
    if (ctx.expr_list().length === 2) {
      const expr1 = this.visitExpr(ctx.expr(0))
      const expr2 = this.visitExpr(ctx.expr(1))
      const op = ctx.getChild(1).getText()
      switch (op) {
        case "+":
        case "-": return {
          type: 'IExprPlusMinExpr',
          expr1: expr1,
          tPlusIMin: op,
          expr2: expr2
        }
        case "*":
        case "/": return {
          type: 'IExprMultDivExpr',
          expr1: expr1,
          tMultIDiv: op,
          expr2: expr2
        }
      }
    } else if (ctx.expr_list().length === 1) {
      const expr = this.visitExpr(ctx.expr(0))
      return {
        type: 'ILBrExprRBr',
        expr: expr
      }
    } else {
      const int = Number.parseInt(ctx.INT().getText())
      return {
        type: 'IInt',
        int: int
      }
    }
    throw new Error(`Cannot visit Expr: ${JSON.stringify(ctx, null, 2)}`)
  }
}

export const evalExpr = (expr: Basic.expr) : number => {
  switch(expr.type) {
    case 'IExprMultDivExpr': {
      const eval1 = evalExpr(expr.expr1)
      const eval2 = evalExpr(expr.expr2)
      switch (expr.tMultIDiv) {
        case '*': return eval1 * eval2
        case '/': return eval1 / eval2
      }
    }
    case 'IExprPlusMinExpr': {
      const eval1 = evalExpr(expr.expr1)
      const eval2 = evalExpr(expr.expr2)
      switch (expr.tPlusIMin) {
        case '+': return eval1 + eval2
        case '-': return eval1 - eval2
      }
    }
    case 'ILBrExprRBr': return evalExpr(expr.expr)
    case 'IInt': return expr.int
  }
}

const evalOpExpr = (
  e1: BasicError.expr,
  e2: BasicError.expr,
  org: BasicError.expr,
  op: '+' | '-' | '*' | '/'
) : BasicError.expr => {
  switch (e1.type) {
    case 'IError': return org
    case 'IInt': {
      switch (e2.type) {
        case 'IError': return org
        case 'IInt': {
          switch (op) {
            case '*': return { type: 'IInt', int: e1.int * e2.int }
            case '/': return { type: 'IInt', int: e1.int / e2.int }
            case '+': return { type: 'IInt', int: e1.int + e2.int }
            case '-': return { type: 'IInt', int: e1.int - e2.int }
          }
        }
      }
    }
  }
  return org
}

export const evalExprError = (expr: BasicError.expr) : BasicError.expr => {
  switch(expr.type) {
    case 'IExprMultDivExpr': {
      const eval1 = evalExprError(expr.expr1)
      const eval2 = evalExprError(expr.expr2)
      return evalOpExpr(eval1, eval2, { ...expr, expr1: eval1, expr2: eval2 }, expr.tMultIDiv)
    }
    case 'IExprPlusMinExpr': {
      const eval1 = evalExprError(expr.expr1)
      const eval2 = evalExprError(expr.expr2)
      return evalOpExpr(eval1, eval2, { ...expr, expr1: eval1, expr2: eval2 }, expr.tPlusIMin)
    }
    case 'ILBrExprRBr': return evalExprError(expr.expr)
    case 'IInt': return expr
    case 'IError': return expr
  }
}

export const ppBasicError = (expr: BasicError.expr) : string => {
  switch (expr.type) {
    case 'IExprPlusMinExpr': {
      const eval1 = ppBasicError(expr.expr1)
      const eval2 = ppBasicError(expr.expr2)
      return [eval1, expr.tPlusIMin, eval2].join(' ')
    }
    case 'IExprMultDivExpr': {
      const eval1 = ppBasicError(expr.expr1)
      const eval2 = ppBasicError(expr.expr2)
      return [eval1, expr.tMultIDiv, eval2].join(' ')
    }
    case 'ILBrExprRBr': {
      return ['(', ppBasicError(expr.expr), ')'].join(' ')
    }
    case 'IInt': return '' + expr.int
    case 'IError': return 'error{ ' + expr.slice + ' }'
  }
}
