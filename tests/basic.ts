export namespace Basic {
    export type withType<T> = {
        type: T;
    };
    export interface Error extends withType<"IError"> {
        slice: string;
    }
    export type prog = IExprEof | Error;
    export interface IExprEof extends withType<"IExprEof"> {
        expr: expr;
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