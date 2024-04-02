type withType<T> = {
  type: T;
};
type timesDivType = "TIMES" | "DIV";
type plusMinusType = "PLUS" | "MINUS";
type file_ = {
  equation: equation;
};
type equation = {
  expression1: expression;
  relop: relop;
  expression3: expression;
};
interface powExpression extends withType<"powExpression"> {
  expression1: expression;
  expression2: expression;
}
interface timesDivExpression extends withType<"timesDivExpression"> {
  expression1: expression;
  token: timesDivType;
  expression2: expression;
}
interface plusMinusExpression extends withType<"plusMinusExpression"> {
  expression1: expression;
  token: plusMinusType;
  expression2: expression;
}
interface lparenRparenExpression extends withType<"lparenRparenExpression"> {
  expression: expression;
}
interface plusMinusAtomExpression extends withType<"plusMinusAtomExpression"> {
  token: plusMinusType;
  atom: atom;
}
type expression = powExpression | timesDivExpression | plusMinusExpression | lparenRparenExpression | plusMinusAtomExpression;
interface scientificAtom extends withType<"scientificAtom"> {
  scientific: scientific;
}
interface variableAtom extends withType<"variableAtom"> {
  variable: variable;
}
type atom = scientificAtom | variableAtom;
type scientific = {
  field: number;
};
type variable = {
  field: string;
};
interface eqRelop extends withType<"eqRelop"> {
  field0: "=";
}
interface gtRelop extends withType<"gtRelop"> {
  field0: ">";
}
interface ltRelop extends withType<"ltRelop"> {
  field0: "<";
}
type relop = eqRelop | gtRelop | ltRelop;