export namespace Basic {
    export type withType<T> = {
        type: T;
    };
    export type expr = IExprMultDivExpr | IExprPlusMinExpr | IInt | ILBrExprRBr;
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