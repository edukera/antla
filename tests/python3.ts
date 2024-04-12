type withType<T> = {
    type: T;
};
type single_input = INl | ISimple_stmts | ICompound_stmtNl;
interface INl extends withType<"INl"> {
    nl: "NEWLINE";
}
interface ISimple_stmts extends withType<"ISimple_stmts"> {
    simple_stmt: simple_stmt;
    tScolSimple_stmts: simple_stmt[];
}
interface ICompound_stmtNl extends withType<"ICompound_stmtNl"> {
    compound_stmt: compound_stmt;
}
type file_input = tNlIStmt[];
type tNlIStmt = INl | IStmt;
interface IStmt extends withType<"IStmt"> {
    stmt: stmt;
}
type decorator = {
    dotted_name: dotted_name;
    tLBrArglistRBr?: tLBrArglistRBr;
};
type tLBrArglistRBr = ILBrArglistRBr;
interface ILBrArglistRBr extends withType<"ILBrArglistRBr"> {
    arglist?: arglist;
}
type decorators = decorator[];
type tClassdefIFuncdefIAsync_funcdef = IClassdef | IFuncdef | IAsync_funcdef;
interface IClassdef extends withType<"IClassdef"> {
    name: name;
    tLBrArglistRBr?: tLBrArglistRBr;
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
    tArrTest?: test;
    block: block;
};
type parameters = {
    typedargslist?: typedargslist;
};
type typedargslist = Itypedargslist1 | Itypedargslist2 | IPowTfpdefCom;
type tComTfpdefEqTestQmark = {
    tfpdef: tfpdef;
    tEqTest?: test;
};
type ttypedargslist141 = {
    ttypedargslist14121IPowTfpdefCom?: ttypedargslist14121IPowTfpdefCom;
};
type ttypedargslist14121IPowTfpdefCom = Itypedargslist14121 | IPowTfpdefCom;
type tComPowTfpdefComQmark = {
    tPowTfpdefCom?: tPowTfpdefCom;
};
type tPowTfpdefCom = IPowTfpdefCom;
interface IPowTfpdefCom extends withType<"IPowTfpdefCom"> {
    tfpdef: tfpdef;
}
interface Itypedargslist14121 extends withType<"Itypedargslist14121"> {
    tfpdef?: tfpdef;
    tComTfpdefEqTestQmarks: tComTfpdefEqTestQmark[];
    tComPowTfpdefComQmark?: tComPowTfpdefComQmark;
}
interface Itypedargslist1 extends withType<"Itypedargslist1"> {
    tfpdef: tfpdef;
    tEqTest?: test;
    tComTfpdefEqTestQmarks: tComTfpdefEqTestQmark[];
    ttypedargslist141?: ttypedargslist141;
}
interface Itypedargslist2 extends withType<"Itypedargslist2"> {
    tfpdef?: tfpdef;
    tComTfpdefEqTestQmarks: tComTfpdefEqTestQmark[];
    tComPowTfpdefComQmark?: tComPowTfpdefComQmark;
}
type tfpdef = {
    name: name;
    tColTest?: tColTest;
};
type tColTest = IColTest;
interface IColTest extends withType<"IColTest"> {
    test: test;
}
type varargslist = Ivarargslist1 | Ivarargslist2 | IPowVfpdefCom;
type tComVfpdefEqTestQmark = {
    vfpdef: vfpdef;
    tEqTest?: test;
};
type tvarargslist141 = {
    tvarargslist14121IPowVfpdefComQmark?: tvarargslist14121IPowVfpdefComQmark;
};
type tvarargslist14121IPowVfpdefComQmark = Ivarargslist14121 | IPowVfpdefComQmark;
type tComPowVfpdefComQmark = {
    tPowVfpdefCom?: tPowVfpdefCom;
};
type tPowVfpdefCom = IPowVfpdefCom;
interface IPowVfpdefCom extends withType<"IPowVfpdefCom"> {
    vfpdef: vfpdef;
}
interface Ivarargslist14121 extends withType<"Ivarargslist14121"> {
    vfpdef?: vfpdef;
    tComVfpdefEqTestQmarks: tComVfpdefEqTestQmark[];
    tComPowVfpdefComQmark?: tComPowVfpdefComQmark;
}
interface IPowVfpdefComQmark extends withType<"IPowVfpdefComQmark"> {
    vfpdef: vfpdef;
    tCom?: ",";
}
interface Ivarargslist1 extends withType<"Ivarargslist1"> {
    vfpdef: vfpdef;
    tEqTest?: test;
    tComVfpdefEqTestQmarks: tComVfpdefEqTestQmark[];
    tvarargslist141?: tvarargslist141;
}
interface Ivarargslist2 extends withType<"Ivarargslist2"> {
    vfpdef?: vfpdef;
    tComVfpdefEqTestQmarks: tComVfpdefEqTestQmark[];
    tComPowVfpdefComQmark?: tComPowVfpdefComQmark;
}
type vfpdef = IName;
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
    tAnnassignIAugassignYield_exprTestlistIEqYield_exprTestlist_star_exprStar: tAnnassignIAugassignYield_exprTestlistIEqYield_exprTestlist_star_exprStar;
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
    tComNames: name[];
}
interface INonlocal_stmt extends withType<"INonlocal_stmt"> {
    name: name;
    tComNames: name[];
}
interface IAssert_stmt extends withType<"IAssert_stmt"> {
    test: test;
    tComTest?: test;
}
type tAnnassignIAugassignYield_exprTestlistIEqYield_exprTestlist_star_exprStar = IAnnassign | IAugassignYield_exprTestlist | IEqYield_exprTestlist_star_exprStar;
type tYield_exprITestlist = IYield_expr | ITestlist;
interface IYield_expr extends withType<"IYield_expr"> {
    yield_arg?: yield_arg;
}
interface ITestlist extends withType<"ITestlist"> {
    testlist: testlist;
}
type tEqYield_exprTestlist_star_expr = IYield_expr | ITestlist_star_expr;
interface ITestlist_star_expr extends withType<"ITestlist_star_expr"> {
    testlist_star_expr: testlist_star_expr;
}
interface IAnnassign extends withType<"IAnnassign"> {
    test: test;
    tEqTest?: test;
}
interface IAugassignYield_exprTestlist extends withType<"IAugassignYield_exprTestlist"> {
    augassign: "+=" | "-=" | "*=" | "@=" | "/=" | "%=" | "&=" | "|=" | "^=" | "<<=" | ">>=" | "**=" | "//=";
    tYield_exprITestlist: tYield_exprITestlist;
}
interface IEqYield_exprTestlist_star_exprStar extends withType<"IEqYield_exprTestlist_star_exprStar"> {
    tEqYield_exprTestlist_star_exprs: tEqYield_exprTestlist_star_expr[];
}
type testlist_star_expr = {
    tTestIStar_expr: tTestIStar_expr;
    tComTestStar_exprs: tTestIStar_expr[];
};
type tTestIStar_expr = ITest | IStar_expr;
interface ITest extends withType<"ITest"> {
    test: test;
}
interface IStar_expr extends withType<"IStar_expr"> {
    star_expr: star_expr;
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
    tTestFromTestQmark?: tTestFromTestQmark;
}
interface IYield_stmt extends withType<"IYield_stmt"> {
    yield_stmt: yield_stmt;
}
type yield_stmt = IYield_expr;
type tTestFromTestQmark = {
    test: test;
    tFromTest?: tFromTest;
};
type tFromTest = IFromTest;
interface IFromTest extends withType<"IFromTest"> {
    test: test;
}
type import_stmt = IImport_name | IImport_from;
interface IImport_name extends withType<"IImport_name"> {
    import_name: import_name;
}
interface IImport_from extends withType<"IImport_from"> {
    tDotDddotStarDotted_nameIDotDddotPlus: tDotDddotStarDotted_nameIDotDddotPlus;
    tMultILBrImport_as_namesRBrIImport_as_names: tMultILBrImport_as_namesRBrIImport_as_names;
}
type import_name = {
    dotted_as_name: dotted_as_name;
    tComDotted_as_names: dotted_as_name[];
};
type tDotDddotStarDotted_nameIDotDddotPlus = IDotDddotStarDotted_name | IDotDddotPlus;
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
type tMultILBrImport_as_namesRBrIImport_as_names = IMult | ILBrImport_as_namesRBr | IImport_as_names;
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
    tAsName?: name;
};
type dotted_as_name = {
    dotted_name: dotted_name;
    tAsName?: name;
};
type import_as_names = {
    import_as_name: import_as_name;
    tComImport_as_names: import_as_name[];
};
type dotted_name = {
    name: name;
    tDotNames: tDotName[];
};
type tDotName = IDotName;
interface IDotName extends withType<"IDotName"> {
    name: name;
}
type compound_stmt = IIf_stmt | IWhile_stmt | IFor_stmt | ITry_stmt | IWith_stmt | IFuncdef | IClassdef | IDecorated | IAsync_stmt | IMatch_stmt;
interface IIf_stmt extends withType<"IIf_stmt"> {
    test: test;
    block: block;
    tElifTestColBlocks: tElifTestColBlock[];
    tElseColBlock?: block;
}
interface IWhile_stmt extends withType<"IWhile_stmt"> {
    test: test;
    block: block;
    tElseColBlock?: block;
}
interface IFor_stmt extends withType<"IFor_stmt"> {
    exprlist: exprlist;
    testlist: testlist;
    block: block;
    tElseColBlock?: block;
}
interface ITry_stmt extends withType<"ITry_stmt"> {
    block: block;
    ttry_stmt141IFinallyColBlock: ttry_stmt141IFinallyColBlock;
}
interface IWith_stmt extends withType<"IWith_stmt"> {
    with_item: with_item;
    tComWith_items: with_item[];
    block: block;
}
interface IDecorated extends withType<"IDecorated"> {
    decorators: decorators;
    tClassdefIFuncdefIAsync_funcdef: tClassdefIFuncdefIAsync_funcdef;
}
interface IAsync_stmt extends withType<"IAsync_stmt"> {
    async_stmt: async_stmt;
}
interface IMatch_stmt extends withType<"IMatch_stmt"> {
    subject_expr: subject_expr;
    case_blocks: case_block[];
}
type async_stmt = IFuncdef | IWith_stmt | IFor_stmt;
type tElifTestColBlock = {
    test: test;
    block: block;
};
type ttry_stmt141IFinallyColBlock = Itry_stmt141 | IFinallyColBlock;
type tExcept_clauseColBlock = {
    except_clause: except_clause;
    block: block;
};
type tFinallyColBlock = IFinallyColBlock;
interface IFinallyColBlock extends withType<"IFinallyColBlock"> {
    block: block;
}
interface Itry_stmt141 extends withType<"Itry_stmt141"> {
    tExcept_clauseColBlocks: tExcept_clauseColBlock[];
    tElseColBlock?: block;
    tFinallyColBlock?: tFinallyColBlock;
}
type with_item = {
    test: test;
    tAsExpr?: expr;
};
type except_clause = {
    tTestAsNameQmark?: tTestAsNameQmark;
};
type tTestAsNameQmark = {
    test: test;
    tAsName?: name;
};
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
    tOrClosed_patterns: closed_pattern[];
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
    value_pattern: value_pattern;
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
    strings: strings;
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
    imaginary_number: imaginary_number;
}
interface ISigned_real_numberMinImaginary_number extends withType<"ISigned_real_numberMinImaginary_number"> {
    signed_real_number: signed_real_number;
    imaginary_number: imaginary_number;
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
    real_number: real_number;
}
interface IMinReal_number extends withType<"IMinReal_number"> {
    real_number: real_number;
}
type real_number = INumber;
type imaginary_number = INumber;
type pattern_capture_target = IName;
interface IUndsc extends withType<"IUndsc"> {
    undsc: "_";
}
type value_pattern = IAttr;
interface IAttr extends withType<"IAttr"> {
    name: name;
    tDotNames: tDotName[];
}
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
    tComMaybe_star_patterns: maybe_star_pattern[];
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
    tComKey_value_patterns: key_value_pattern[];
};
type key_value_pattern = {
    tLiteral_exprIAttr: tLiteral_exprIAttr;
    pattern: pattern;
};
type tLiteral_exprIAttr = ILiteral_expr | IAttr;
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
    tComPatterns: pattern[];
};
type keyword_patterns = {
    keyword_pattern: keyword_pattern;
    tComKeyword_patterns: keyword_pattern[];
};
type keyword_pattern = {
    name: name;
    pattern: pattern;
};
type test = Itest1 | ILambdef;
type tIfOr_testElseTest = {
    or_test: or_test;
    test: test;
};
interface Itest1 extends withType<"Itest1"> {
    or_test: or_test;
    tIfOr_testElseTest?: tIfOr_testElseTest;
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
    tOrAnd_tests: and_test[];
};
type and_test = {
    not_test: not_test;
    tAndNot_tests: not_test[];
};
type not_test = INotNot_test | IComparison;
interface INotNot_test extends withType<"INotNot_test"> {
    not_test: not_test;
}
interface IComparison extends withType<"IComparison"> {
    expr: expr;
    tComp_opExprs: tComp_opExpr[];
}
type tComp_opExpr = {
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
type tYield_exprITestlist_comp = IYield_expr | ITestlist_comp;
interface ITestlist_comp extends withType<"ITestlist_comp"> {
    testlist_comp: testlist_comp;
}
interface ILBrYield_exprTestlist_compQmarkRBr extends withType<"ILBrYield_exprTestlist_compQmarkRBr"> {
    tYield_exprITestlist_comp?: tYield_exprITestlist_comp;
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
    tTestIStar_expr: tTestIStar_expr;
    tComp_forIComTestStar_exprStarCom: tComp_forIComTestStar_exprStarCom;
};
type tComp_forIComTestStar_exprStarCom = IComp_for | IComTestStar_exprStarCom;
interface IComp_for extends withType<"IComp_for"> {
    comp_for: comp_for;
}
interface IComTestStar_exprStarCom extends withType<"IComTestStar_exprStarCom"> {
    tComTestStar_exprs: tTestIStar_expr[];
}
type trailer = ILBrArglistRBr | ILCBrSubscriptlistRCBr | IDotName;
interface ILCBrSubscriptlistRCBr extends withType<"ILCBrSubscriptlistRCBr"> {
    subscript_: subscript_;
    tComSubscript_s: subscript_[];
}
type subscript_ = ITest | ITestColTestSliceop;
interface ITestColTestSliceop extends withType<"ITestColTestSliceop"> {
    test1?: test;
    test2?: test;
    sliceop?: sliceop;
}
type sliceop = IColTest;
type exprlist = {
    tExprIStar_expr: tExprIStar_expr;
    tComExprStar_exprs: tExprIStar_expr[];
};
type tExprIStar_expr = IExpr | IStar_expr;
interface IExpr extends withType<"IExpr"> {
    expr: expr;
}
type testlist = {
    test: test;
    tComTests: test[];
};
type dictorsetmaker = Idictorsetmaker1 | Idictorsetmaker2;
type tTestColTestIPowExpr = ITestColTest | IPowExpr;
interface ITestColTest extends withType<"ITestColTest"> {
    test1: test;
    test2: test;
}
interface IPowExpr extends withType<"IPowExpr"> {
    expr: expr;
}
type tComp_forIdictorsetmaker11122 = IComp_for | Idictorsetmaker11122;
interface Idictorsetmaker11122 extends withType<"Idictorsetmaker11122"> {
    tdictorsetmaker1112211s: tTestColTestIPowExpr[];
}
interface Idictorsetmaker1 extends withType<"Idictorsetmaker1"> {
    tTestColTestIPowExpr: tTestColTestIPowExpr;
    tComp_forIdictorsetmaker11122: tComp_forIdictorsetmaker11122;
}
interface Idictorsetmaker2 extends withType<"Idictorsetmaker2"> {
    tTestIStar_expr: tTestIStar_expr;
    tComp_forIComTestStar_exprStarCom: tComp_forIComTestStar_exprStarCom;
}
type arglist = {
    argument: argument;
    tComArguments: argument[];
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
type encoding_decl = IName;
type yield_arg = IFromTest | ITestlist;
type strings = IString;
