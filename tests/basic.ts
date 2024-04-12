type withType<T> = {
    type: T;
};
type expr = IExprMultDivExpr | IExprPlusMinExpr | IInt | ILBrExprRBr;
interface IExprMultDivExpr extends withType<"IExprMultDivExpr"> {
    expr1: expr;
    tMultIDiv: "*" | "/";
    expr2: expr;
}
interface IExprPlusMinExpr extends withType<"IExprPlusMinExpr"> {
    expr1: expr;
    tPlusIMin: "+" | "-";
    expr2: expr;
}
interface IInt extends withType<"IInt"> {
    int: number;
}
interface ILBrExprRBr extends withType<"ILBrExprRBr"> {
    expr: expr;
}
