type withType<T> = {
    type: T;
};
type single_input = INl | ISimple_stmts | ICompound_stmtNl;
interface INl extends withType<"INl"> {
    nl: "NEWLINE";
}
interface ISimple_stmts extends withType<"ISimple_stmts"> {
    simple_stmt: simple_stmt;
    simple_stmts: simple_stmt[];
}
interface ICompound_stmtNl extends withType<"ICompound_stmtNl"> {
    compound_stmt: compound_stmt;
}
type file_input = file_input1[];
type file_input1 = INl | IStmt;
interface IStmt extends withType<"IStmt"> {
    stmt: stmt;
}
type decorator = {
    dotted_name: dotted_name;
    arglist?: ILBrArglistRBr;
};
interface ILBrArglistRBr extends withType<"ILBrArglistRBr"> {
    arglist?: arglist;
}
type decorators = decorator[];
type decorated2 = IClassdef | IFuncdef | IAsync_funcdef;
interface IClassdef extends withType<"IClassdef"> {
    name: name;
    arglist?: ILBrArglistRBr;
    block: block;
}
interface IFuncdef extends withType<"IFuncdef"> {
    funcdef: funcdef;
}
interface IAsync_funcdef extends withType<"IAsync_funcdef"> {
    async_funcdef: funcdef;
}
type funcdef = {
    name: name;
    parameters: parameters;
    test?: test;
    block: block;
};
type parameters = {
    typedargslist?: typedargslist;
};
type typedargslist = Itypedargslist1 | Itypedargslist2 | IPowTfpdefCom;
interface IEqTest extends withType<"IEqTest"> {
    test: test;
}
type typedargslist133 = IEqTest;
interface IComTfpdefEqTestQmark extends withType<"IComTfpdefEqTestQmark"> {
    tfpdef: tfpdef;
    test?: typedargslist133;
}
type typedargslist14 = {
    tfpdefebnfebnftfpdef?: typedargslist142;
};
type typedargslist142 = Itypedargslist1421 | IPowTfpdefCom;
interface IPowTfpdefCom extends withType<"IPowTfpdefCom"> {
    tfpdef: tfpdef;
}
interface IComPowTfpdefComQmark extends withType<"IComPowTfpdefComQmark"> {
    tfpdef?: tfpdef;
}
interface Itypedargslist1421 extends withType<"Itypedargslist1421"> {
    tfpdef?: tfpdef;
    tfpdefebnfs: IComTfpdefEqTestQmark[];
    ebnf?: IComPowTfpdefComQmark;
}
interface Itypedargslist1 extends withType<"Itypedargslist1"> {
    tfpdef: tfpdef;
    test?: test;
    tfpdefebnfs: IComTfpdefEqTestQmark[];
    ebnf?: typedargslist14;
}
interface Itypedargslist2 extends withType<"Itypedargslist2"> {
    tfpdef?: tfpdef;
    tfpdefebnfs: IComTfpdefEqTestQmark[];
    ebnf?: IComPowTfpdefComQmark;
}
type tfpdef = {
    name: name;
    test?: test;
};
interface IColTest extends withType<"IColTest"> {
    test: test;
}
type varargslist = Ivarargslist1 | Ivarargslist2 | IPowVfpdefCom;
type varargslist12 = IEqTest;
type varargslist133 = IEqTest;
interface IComVfpdefEqTestQmark extends withType<"IComVfpdefEqTestQmark"> {
    vfpdef: name;
    test?: varargslist133;
}
type varargslist14 = {
    vfpdefebnfebnfvfpdefebnf?: varargslist142;
};
type varargslist142 = Ivarargslist1421 | IPowVfpdefComQmark;
interface IPowVfpdefCom extends withType<"IPowVfpdefCom"> {
    vfpdef: name;
}
interface IComPowVfpdefComQmark extends withType<"IComPowVfpdefComQmark"> {
    vfpdef?: name;
}
interface Ivarargslist1421 extends withType<"Ivarargslist1421"> {
    vfpdef?: name;
    vfpdefebnfs: IComVfpdefEqTestQmark[];
    ebnf?: IComPowVfpdefComQmark;
}
interface IPowVfpdefComQmark extends withType<"IPowVfpdefComQmark"> {
    vfpdef: name;
    tCom?: ",";
}
interface Ivarargslist1 extends withType<"Ivarargslist1"> {
    vfpdef: name;
    test?: varargslist12;
    vfpdefebnfs: IComVfpdefEqTestQmark[];
    ebnf?: varargslist14;
}
interface Ivarargslist2 extends withType<"Ivarargslist2"> {
    vfpdef?: name;
    vfpdefebnfs: IComVfpdefEqTestQmark[];
    ebnf?: IComPowVfpdefComQmark;
}
interface IName extends withType<"IName"> {
    name: name;
}
type stmt = ISimple_stmts | ICompound_stmt;
interface ICompound_stmt extends withType<"ICompound_stmt"> {
    compound_stmt: compound_stmt;
}
type simple_stmt = IExpr_stmt | IDel_stmt | IPass_stmt | IFlow_stmt | IImport_stmt | IGlobal_stmt | INonlocal_stmt | IAssert_stmt;
interface IExpr_stmt extends withType<"IExpr_stmt"> {
    testlist_star_expr: testlist_star_expr;
    annassignaugassignebnfebnf: expr_stmt2;
}
interface IDel_stmt extends withType<"IDel_stmt"> {
    del_stmt: exprlist;
}
interface IPass_stmt extends withType<"IPass_stmt"> {
    pass_stmt: "pass";
}
interface IFlow_stmt extends withType<"IFlow_stmt"> {
    flow_stmt: flow_stmt;
}
interface IImport_stmt extends withType<"IImport_stmt"> {
    import_stmt: import_stmt;
}
interface IGlobal_stmt extends withType<"IGlobal_stmt"> {
    name: name;
    names: name[];
}
interface INonlocal_stmt extends withType<"INonlocal_stmt"> {
    name: name;
    names: nonlocal_stmt3[];
}
interface IAssert_stmt extends withType<"IAssert_stmt"> {
    test1: test;
    test2?: test;
}
type expr_stmt2 = IAnnassign | IAugassignYield_exprTestlist | IEqYield_exprTestlist_star_exprStar;
type expr_stmt222 = IYield_expr | ITestlist;
interface IYield_expr extends withType<"IYield_expr"> {
    yield_arg?: yield_arg;
}
interface ITestlist extends withType<"ITestlist"> {
    testlist: testlist;
}
type expr_stmt231 = IYield_expr | ITestlist_star_expr;
interface ITestlist_star_expr extends withType<"ITestlist_star_expr"> {
    testlist_star_expr: testlist_star_expr;
}
interface IAnnassign extends withType<"IAnnassign"> {
    test1: test;
    test2?: annassign3;
}
interface IAugassignYield_exprTestlist extends withType<"IAugassignYield_exprTestlist"> {
    augassign: "+=" | "-=" | "*=" | "@=" | "/=" | "%=" | "&=" | "|=" | "^=" | "<<=" | ">>=" | "**=" | "//=";
    yield_exprtestlist: expr_stmt222;
}
interface IEqYield_exprTestlist_star_exprStar extends withType<"IEqYield_exprTestlist_star_exprStar"> {
    ebnfs: expr_stmt231[];
}
type annassign3 = IEqTest;
type testlist_star_expr = {
    teststar_expr: testlist_star_expr1;
    ebnfs: testlist_star_expr22[];
};
type testlist_star_expr1 = ITest | IStar_expr;
interface ITest extends withType<"ITest"> {
    test: test;
}
interface IStar_expr extends withType<"IStar_expr"> {
    star_expr: star_expr;
}
type testlist_star_expr22 = ITest | IStar_expr;
interface IComTestStar_expr extends withType<"IComTestStar_expr"> {
    teststar_expr: testlist_star_expr22;
}
type flow_stmt = IBreak_stmt | IContinue_stmt | IReturn_stmt | IRaise_stmt | IYield_stmt;
interface IBreak_stmt extends withType<"IBreak_stmt"> {
    break_stmt: "break";
}
interface IContinue_stmt extends withType<"IContinue_stmt"> {
    continue_stmt: "continue";
}
interface IReturn_stmt extends withType<"IReturn_stmt"> {
    testlist?: testlist;
}
interface IRaise_stmt extends withType<"IRaise_stmt"> {
    testebnf?: raise_stmt2;
}
interface IYield_stmt extends withType<"IYield_stmt"> {
    yield_stmt: IYield_expr;
}
type raise_stmt2 = {
    test: test;
    from?: test;
};
interface IFromTest extends withType<"IFromTest"> {
    test: test;
}
type import_stmt = IImport_name | IImport_from;
interface IImport_name extends withType<"IImport_name"> {
    import_name: import_name;
}
interface IImport_from extends withType<"IImport_from"> {
    ebnfdotted_nameebnf: import_from2;
    import_as_namesimport_as_names: import_from4;
}
type import_name = {
    dotted_as_name: dotted_as_name;
    dotted_as_names: dotted_as_name[];
};
type import_from2 = IDotDddotStarDotted_name | IDotDddotPlus;
interface IDddot extends withType<"IDddot"> {
    dddot: "...";
}
interface IDotDddotStarDotted_name extends withType<"IDotDddotStarDotted_name"> {
    tDotIDddots: ("." | "...")[];
    dotted_name: dotted_name;
}
interface IDotDddotPlus extends withType<"IDotDddotPlus"> {
    tDotIDddots: ("." | "...")[];
}
type import_from4 = IMult | ILBrImport_as_namesRBr | IImport_as_names;
interface IMult extends withType<"IMult"> {
    mult: "*";
}
interface ILBrImport_as_namesRBr extends withType<"ILBrImport_as_namesRBr"> {
    import_as_names: import_as_names;
}
interface IImport_as_names extends withType<"IImport_as_names"> {
    import_as_names: import_as_names;
}
type import_as_name = {
    name: name;
    as?: name;
};
interface IAsName extends withType<"IAsName"> {
    name: name;
}
type dotted_as_name = {
    dotted_name: dotted_name;
    as?: dotted_as_name2;
};
type dotted_as_name2 = IAsName;
type import_as_names = {
    import_as_name: import_as_name;
    import_as_names: import_as_name[];
};
type dotted_name = {
    name: name;
    names: name[];
};
interface IDotName extends withType<"IDotName"> {
    name: name;
}
interface IComName extends withType<"IComName"> {
    name: name;
}
type nonlocal_stmt3 = IComName;
interface IComTest extends withType<"IComTest"> {
    test: test;
}
type compound_stmt = IIf_stmt | IWhile_stmt | IFor_stmt | ITry_stmt | IWith_stmt | IFuncdef | IClassdef | IDecorated | IAsync_stmt | IMatch_stmt;
interface IIf_stmt extends withType<"IIf_stmt"> {
    test: test;
    block: block;
    elifs: if_stmt5[];
    else?: block;
}
interface IWhile_stmt extends withType<"IWhile_stmt"> {
    test: test;
    block: block;
    else?: while_stmt5;
}
interface IFor_stmt extends withType<"IFor_stmt"> {
    exprlist: exprlist;
    testlist: testlist;
    block: block;
    else?: for_stmt7;
}
interface ITry_stmt extends withType<"ITry_stmt"> {
    block: block;
    finally: try_stmt4;
}
interface IWith_stmt extends withType<"IWith_stmt"> {
    with_item: with_item;
    with_items: with_item[];
    block: block;
}
interface IDecorated extends withType<"IDecorated"> {
    decorators: decorators;
    classdeffuncdefasync_funcdef: decorated2;
}
interface IAsync_stmt extends withType<"IAsync_stmt"> {
    async_stmt: async_stmt;
}
interface IMatch_stmt extends withType<"IMatch_stmt"> {
    subject_expr: subject_expr;
    case_blocks: case_block[];
}
type async_stmt = IFuncdef | IWith_stmt | IFor_stmt;
type if_stmt5 = {
    test: test;
    block: block;
};
interface IElseColBlock extends withType<"IElseColBlock"> {
    block: block;
}
type while_stmt5 = IElseColBlock;
type for_stmt7 = IElseColBlock;
type try_stmt4 = Itry_stmt41 | IFinallyColBlock;
type try_stmt411 = {
    except_clause: except_clause;
    block: block;
};
type try_stmt412 = IElseColBlock;
interface IFinallyColBlock extends withType<"IFinallyColBlock"> {
    block: block;
}
interface Itry_stmt41 extends withType<"Itry_stmt41"> {
    except_clauseblocks: try_stmt411[];
    else?: try_stmt412;
    finally?: block;
}
type with_item = {
    test: test;
    as?: expr;
};
type except_clause = {
    testebnf?: except_clause2;
};
type except_clause2 = {
    test: test;
    as?: except_clause22;
};
type except_clause22 = IAsName;
type block = ISimple_stmts | INlIdtStmtDdt;
interface INlIdtStmtDdt extends withType<"INlIdtStmtDdt"> {
    stmts: stmt[];
}
type subject_expr = IStar_named_expressionComStar_named_expressions | ITest;
interface IStar_named_expressionComStar_named_expressions extends withType<"IStar_named_expressionComStar_named_expressions"> {
    star_named_expression: star_named_expression;
    star_named_expressions?: star_named_expressions;
}
type star_named_expressions = star_named_expression[];
type star_named_expression = IMultExpr | ITest;
interface IMultExpr extends withType<"IMultExpr"> {
    expr: expr;
}
type case_block = {
    patterns: patterns;
    guard?: test;
    block: block;
};
type patterns = IOpen_sequence_pattern | IPattern;
interface IOpen_sequence_pattern extends withType<"IOpen_sequence_pattern"> {
    open_sequence_pattern: open_sequence_pattern;
}
interface IPattern extends withType<"IPattern"> {
    pattern: pattern;
}
type pattern = IAs_pattern | IOr_pattern;
interface IAs_pattern extends withType<"IAs_pattern"> {
    or_pattern: or_pattern;
    pattern_capture_target: pattern_capture_target;
}
interface IOr_pattern extends withType<"IOr_pattern"> {
    or_pattern: or_pattern;
}
type or_pattern = {
    closed_pattern: closed_pattern;
    closed_patterns: closed_pattern[];
};
type closed_pattern = ILiteral_pattern | ICapture_pattern | IWildcard_pattern | IValue_pattern | IGroup_pattern | ISequence_pattern | IMapping_pattern | IClass_pattern;
interface ILiteral_pattern extends withType<"ILiteral_pattern"> {
    literal_pattern: literal_pattern;
}
interface ICapture_pattern extends withType<"ICapture_pattern"> {
    capture_pattern: pattern_capture_target;
}
interface IWildcard_pattern extends withType<"IWildcard_pattern"> {
    wildcard_pattern: "_";
}
interface IValue_pattern extends withType<"IValue_pattern"> {
    value_pattern: IAttr;
}
interface IGroup_pattern extends withType<"IGroup_pattern"> {
    group_pattern: pattern;
}
interface ISequence_pattern extends withType<"ISequence_pattern"> {
    sequence_pattern: sequence_pattern;
}
interface IMapping_pattern extends withType<"IMapping_pattern"> {
    mapping_pattern: mapping_pattern;
}
interface IClass_pattern extends withType<"IClass_pattern"> {
    class_pattern: class_pattern;
}
type literal_pattern = ISigned_number | IComplex_number | IStrings | INone | ITrue | IFalse;
interface ISigned_number extends withType<"ISigned_number"> {
    signed_number: signed_number;
}
interface IComplex_number extends withType<"IComplex_number"> {
    complex_number: complex_number;
}
interface IStrings extends withType<"IStrings"> {
    strings: IString;
}
interface INone extends withType<"INone"> {
    none: "None";
}
interface ITrue extends withType<"ITrue"> {
    true: "True";
}
interface IFalse extends withType<"IFalse"> {
    false: "False";
}
type literal_expr = ISigned_number | IComplex_number | IStrings | INone | ITrue | IFalse;
type complex_number = ISigned_real_numberPlusImaginary_number | ISigned_real_numberMinImaginary_number;
interface ISigned_real_numberPlusImaginary_number extends withType<"ISigned_real_numberPlusImaginary_number"> {
    signed_real_number: signed_real_number;
    imaginary_number: INumber;
}
interface ISigned_real_numberMinImaginary_number extends withType<"ISigned_real_numberMinImaginary_number"> {
    signed_real_number: signed_real_number;
    imaginary_number: INumber;
}
type signed_number = INumber | IMinNumber;
interface INumber extends withType<"INumber"> {
    number: number;
}
interface IMinNumber extends withType<"IMinNumber"> {
    number: number;
}
type signed_real_number = IReal_number | IMinReal_number;
interface IReal_number extends withType<"IReal_number"> {
    real_number: INumber;
}
interface IMinReal_number extends withType<"IMinReal_number"> {
    real_number: INumber;
}
type pattern_capture_target = IName;
interface IUndsc extends withType<"IUndsc"> {
    undsc: "_";
}
interface IAttr extends withType<"IAttr"> {
    name: name;
    names: attr2[];
}
type attr2 = IDotName;
type name_or_attr = IAttr | IName;
type sequence_pattern = ILCBrMaybe_sequence_patternRCBr | ILBrOpen_sequence_patternRBr;
interface ILCBrMaybe_sequence_patternRCBr extends withType<"ILCBrMaybe_sequence_patternRCBr"> {
    maybe_sequence_pattern?: maybe_sequence_pattern;
}
interface ILBrOpen_sequence_patternRBr extends withType<"ILBrOpen_sequence_patternRBr"> {
    open_sequence_pattern?: open_sequence_pattern;
}
type open_sequence_pattern = {
    maybe_star_pattern: maybe_star_pattern;
    maybe_sequence_pattern?: maybe_sequence_pattern;
};
type maybe_sequence_pattern = {
    maybe_star_pattern: maybe_star_pattern;
    maybe_star_patterns: maybe_star_pattern[];
};
type maybe_star_pattern = IStar_pattern | IPattern;
interface IStar_pattern extends withType<"IStar_pattern"> {
    star_pattern: star_pattern;
}
type star_pattern = IMultPattern_capture_target | IMultWildcard_pattern;
interface IMultPattern_capture_target extends withType<"IMultPattern_capture_target"> {
    pattern_capture_target: pattern_capture_target;
}
interface IMultWildcard_pattern extends withType<"IMultWildcard_pattern"> {
    wildcard_pattern: "_";
}
type mapping_pattern = ILCBrRCBr | ILCBrDouble_star_patternComRCBr | Imapping_pattern3 | ILCBrItems_patternComRCBr;
interface ILCBrRCBr extends withType<"ILCBrRCBr"> {
    lCBrrCBr: "{ }";
}
interface ILCBrDouble_star_patternComRCBr extends withType<"ILCBrDouble_star_patternComRCBr"> {
    double_star_pattern: pattern_capture_target;
}
interface Imapping_pattern3 extends withType<"Imapping_pattern3"> {
    items_pattern: items_pattern;
    double_star_pattern: pattern_capture_target;
}
interface ILCBrItems_patternComRCBr extends withType<"ILCBrItems_patternComRCBr"> {
    items_pattern: items_pattern;
}
type items_pattern = {
    key_value_pattern: key_value_pattern;
    key_value_patterns: key_value_pattern[];
};
type key_value_pattern = {
    literal_exprattr: key_value_pattern1;
    pattern: pattern;
};
type key_value_pattern1 = ILiteral_expr | IAttr;
interface ILiteral_expr extends withType<"ILiteral_expr"> {
    literal_expr: literal_expr;
}
type class_pattern = IName_or_attrLBrRBr | IName_or_attrLBrPositional_patternsComRBr | IName_or_attrLBrKeyword_patternsComRBr | Iclass_pattern4;
interface IName_or_attrLBrRBr extends withType<"IName_or_attrLBrRBr"> {
    name_or_attr: name_or_attr;
}
interface IName_or_attrLBrPositional_patternsComRBr extends withType<"IName_or_attrLBrPositional_patternsComRBr"> {
    name_or_attr: name_or_attr;
    positional_patterns: positional_patterns;
}
interface IName_or_attrLBrKeyword_patternsComRBr extends withType<"IName_or_attrLBrKeyword_patternsComRBr"> {
    name_or_attr: name_or_attr;
    keyword_patterns: keyword_patterns;
}
interface Iclass_pattern4 extends withType<"Iclass_pattern4"> {
    name_or_attr: name_or_attr;
    positional_patterns: positional_patterns;
    keyword_patterns: keyword_patterns;
}
type positional_patterns = {
    pattern: pattern;
    patterns: pattern[];
};
type keyword_patterns = {
    keyword_pattern: keyword_pattern;
    keyword_patterns: keyword_pattern[];
};
type keyword_pattern = {
    name: name;
    pattern: pattern;
};
type test = Itest1 | ILambdef;
type test12 = {
    or_test: or_test;
    test: test;
};
interface Itest1 extends withType<"Itest1"> {
    or_test: or_test;
    ifElse?: test12;
}
interface ILambdef extends withType<"ILambdef"> {
    varargslist?: varargslist;
    test: test;
}
type test_nocond = IOr_test | ILambdef_nocond;
interface IOr_test extends withType<"IOr_test"> {
    or_test: or_test;
}
interface ILambdef_nocond extends withType<"ILambdef_nocond"> {
    varargslist?: varargslist;
    test_nocond: test_nocond;
}
type or_test = {
    and_test: and_test;
    ors: and_test[];
};
type and_test = {
    not_test: not_test;
    ands: not_test[];
};
type not_test = INotNot_test | IComparison;
interface INotNot_test extends withType<"INotNot_test"> {
    not_test: not_test;
}
interface IComparison extends withType<"IComparison"> {
    expr: expr;
    comp_opexprs: comparison2[];
}
type comparison2 = {
    comp_op: "<" | ">" | "==" | ">=" | "<=" | "<>" | "<>" | "in" | "not in" | "is" | "is not";
    expr: expr;
};
type star_expr = IMultExpr;
type expr = IAtom_expr | IExprPowExpr | IPlusMinTldPlusExpr | Iexpr4 | IExprPlusMinExpr | IExprShLShRExpr | IExprAndExpr | IExprXorExpr | IExprOrExpr;
interface IAtom_expr extends withType<"IAtom_expr"> {
    atom: atom;
    trailers: trailer[];
}
interface IExprPowExpr extends withType<"IExprPowExpr"> {
    expr1: expr;
    expr2: expr;
}
interface IPlusMinTldPlusExpr extends withType<"IPlusMinTldPlusExpr"> {
    tPlusIMinITlds: ("+" | "-" | "~")[];
    expr: expr;
}
interface Iexpr4 extends withType<"Iexpr4"> {
    expr1: expr;
    tMultIAtIDivIModIDdiv: "*" | "@" | "/" | "%" | "//";
    expr2: expr;
}
interface IExprPlusMinExpr extends withType<"IExprPlusMinExpr"> {
    expr1: expr;
    tPlusIMin: "+" | "-";
    expr2: expr;
}
interface IExprShLShRExpr extends withType<"IExprShLShRExpr"> {
    expr1: expr;
    tShLIShR: "<<" | ">>";
    expr2: expr;
}
interface IExprAndExpr extends withType<"IExprAndExpr"> {
    expr1: expr;
    expr2: expr;
}
interface IExprXorExpr extends withType<"IExprXorExpr"> {
    expr1: expr;
    expr2: expr;
}
interface IExprOrExpr extends withType<"IExprOrExpr"> {
    expr1: expr;
    expr2: expr;
}
type atom = ILBrYield_exprTestlist_compQmarkRBr | ILCBrTestlist_compRCBr | ILCBrDictorsetmakerRCBr | IName | INumber | IString | IDddot | INone | ITrue | IFalse;
type atom12 = IYield_expr | ITestlist_comp;
interface ITestlist_comp extends withType<"ITestlist_comp"> {
    testlist_comp: testlist_comp;
}
interface ILBrYield_exprTestlist_compQmarkRBr extends withType<"ILBrYield_exprTestlist_compQmarkRBr"> {
    yield_exprtestlist_comp?: atom12;
}
interface ILCBrTestlist_compRCBr extends withType<"ILCBrTestlist_compRCBr"> {
    testlist_comp?: testlist_comp;
}
interface ILCBrDictorsetmakerRCBr extends withType<"ILCBrDictorsetmakerRCBr"> {
    dictorsetmaker?: dictorsetmaker;
}
interface IString extends withType<"IString"> {
    strings: string[];
}
type name = IName | IUndsc | IMatch;
interface IMatch extends withType<"IMatch"> {
    match: "match";
}
type testlist_comp = {
    teststar_expr: testlist_comp1;
    comp_forebnf: testlist_comp2;
};
type testlist_comp1 = ITest | IStar_expr;
type testlist_comp2 = IComp_for | IComTestStar_exprStarCom;
type testlist_comp221 = IComTestStar_expr;
type testlist_comp2212 = ITest | IStar_expr;
interface IComp_for extends withType<"IComp_for"> {
    comp_for: comp_for;
}
interface IComTestStar_exprStarCom extends withType<"IComTestStar_exprStarCom"> {
    ebnfs: testlist_comp221[];
}
type trailer = ILBrArglistRBr | ILCBrSubscriptlistRCBr | IDotName;
interface ILCBrSubscriptlistRCBr extends withType<"ILCBrSubscriptlistRCBr"> {
    subscript_: subscript_;
    subscript_s: subscript_[];
}
type subscript_ = ITest | ITestColTestSliceop;
interface ITestColTestSliceop extends withType<"ITestColTestSliceop"> {
    test1?: test;
    test2?: test;
    sliceop?: sliceop;
}
type sliceop = IColTest;
type exprlist = {
    exprstar_expr: exprlist1;
    ebnfs: exprlist2[];
};
type exprlist1 = IExpr | IStar_expr;
interface IExpr extends withType<"IExpr"> {
    expr: expr;
}
type exprlist2 = IExpr | IStar_expr;
type testlist = {
    test: test;
    tests: testlist2[];
};
type testlist2 = IComTest;
type dictorsetmaker = Idictorsetmaker1 | Idictorsetmaker2;
type dictorsetmaker111 = ITestColTest | IPowExpr;
interface ITestColTest extends withType<"ITestColTest"> {
    test1: test;
    test2: test;
}
interface IPowExpr extends withType<"IPowExpr"> {
    expr: expr;
}
type dictorsetmaker112 = IComp_for | Idictorsetmaker1122;
type dictorsetmaker11221 = ITestColTest | IPowExpr;
interface Idictorsetmaker1122 extends withType<"Idictorsetmaker1122"> {
    ebnfs: dictorsetmaker11221[];
}
type dictorsetmaker211 = ITest | IStar_expr;
type dictorsetmaker212 = IComp_for | IComTestStar_exprStarCom;
type dictorsetmaker212212 = ITest | IStar_expr;
interface Idictorsetmaker1 extends withType<"Idictorsetmaker1"> {
    testtestexpr: dictorsetmaker111;
    comp_forebnf: dictorsetmaker112;
}
interface Idictorsetmaker2 extends withType<"Idictorsetmaker2"> {
    teststar_expr: dictorsetmaker211;
    comp_forebnf: dictorsetmaker212;
}
type arglist = {
    argument: argument;
    arguments: argument[];
};
type argument = ITestComp_for | ITestEqTest | IPowTest | IMultTest;
interface ITestComp_for extends withType<"ITestComp_for"> {
    test: test;
    comp_for?: comp_for;
}
interface ITestEqTest extends withType<"ITestEqTest"> {
    test1: test;
    test2: test;
}
interface IPowTest extends withType<"IPowTest"> {
    test: test;
}
interface IMultTest extends withType<"IMultTest"> {
    test: test;
}
type comp_iter = IComp_for | IComp_if;
interface IComp_if extends withType<"IComp_if"> {
    test_nocond: test_nocond;
    comp_iter?: comp_iter;
}
type comp_for = {
    exprlist: exprlist;
    or_test: or_test;
    comp_iter?: comp_iter;
};
type yield_arg = IFromTest | ITestlist;
