namespace Expr {
    type withType<T> = {
        type: T;
    };
    type file_ = equation[];
    type equation = {
        expression1: expression;
        relop: "=" | ">" | "<";
        expression2: expression;
    };
    type expression = IExpressionPowExpression | IExpressionTimesDivExpression | IExpressionPlusMinusExpression | ILparenExpressionRparen | IPlusMinusStarAtom;
    interface IExpressionPowExpression extends withType<"IExpressionPowExpression"> {
        expression1: expression;
        expression2: expression;
    }
    interface IExpressionTimesDivExpression extends withType<"IExpressionTimesDivExpression"> {
        expression1: expression;
        tTimesIDiv: "*" | "/";
        expression2: expression;
    }
    interface IExpressionPlusMinusExpression extends withType<"IExpressionPlusMinusExpression"> {
        expression1: expression;
        tPlusIMinus: "+" | "-";
        expression2: expression;
    }
    interface ILparenExpressionRparen extends withType<"ILparenExpressionRparen"> {
        expression: expression;
    }
    interface IPlusMinusStarAtom extends withType<"IPlusMinusStarAtom"> {
        tPlusIMinuss: ("+" | "-")[];
        atom: atom;
    }
    type atom = IScientific | IVariable;
    interface IScientific extends withType<"IScientific"> {
        scientific: number;
    }
    interface IVariable extends withType<"IVariable"> {
        variable: string;
    }
}