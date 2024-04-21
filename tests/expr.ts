export namespace Expr {
    export type withType<T> = {
        type: T;
    };
    export interface Error extends withType<"IError"> {
        slice: string;
    }
    export type file_ = IEquationEof | Error;
    export interface IEquationEof extends withType<"IEquationEof"> {
        equations: equation[];
    }
    export type equation = IExpressionRelopExpression | Error;
    export interface IExpressionRelopExpression extends withType<"IExpressionRelopExpression"> {
        expression1: expression;
        relop: "=" | ">" | "<";
        expression2: expression;
    }
    export type expression = IExpressionPowExpression | IExpressionTimesDivExpression | IExpressionPlusMinusExpression | ILparenExpressionRparen | IPlusMinusStarAtom | Error;
    export interface IExpressionPowExpression extends withType<"IExpressionPowExpression"> {
        expression1: expression;
        expression2: expression;
    }
    export interface IExpressionTimesDivExpression extends withType<"IExpressionTimesDivExpression"> {
        expression1: expression;
        tTimesIDiv: "*" | "/";
        expression2: expression;
    }
    export interface IExpressionPlusMinusExpression extends withType<"IExpressionPlusMinusExpression"> {
        expression1: expression;
        tPlusIMinus: "+" | "-";
        expression2: expression;
    }
    export interface ILparenExpressionRparen extends withType<"ILparenExpressionRparen"> {
        expression: expression;
    }
    export interface IPlusMinusStarAtom extends withType<"IPlusMinusStarAtom"> {
        tPlusIMinuss: ("+" | "-")[];
        atom: atom;
    }
    export type atom = IScientific | IVariable | Error;
    export interface IScientific extends withType<"IScientific"> {
        scientific: number;
    }
    export interface IVariable extends withType<"IVariable"> {
        variable: string;
    }
}