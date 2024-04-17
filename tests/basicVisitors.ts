import { Basic } from './basic'
import { ProgContext } from "./grammars/basic/BasicParser";
import { ExprContext } from "./grammars/basic/BasicParser";
import BasicVistor from './grammars/basic/BasicVisitor'

export class MakeBasic extends BasicVistor<Basic.expr> {
  constructor() {
    super()
  }

	public visitProg = (ctx: ProgContext) : Basic.expr => {
    return this.visitExpr(ctx.expr())
  }

	public visitExpr = (ctx: ExprContext) : Basic.expr => {
    return { type: 'IInt', int: 0 }
  }

}
