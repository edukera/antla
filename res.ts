type withType<T> = {
    type: T;
};
type single_input = INl | ISimple_stmts | ICompound_stmtNl;
interface INl extends withType<"INl"> {
    nl: "NEWLINE";
}
interface ISimple_stmts extends withType<"ISimple_stmts"> {
    simple_stmt: simple_stmt;
    iScolSimple_stmtTypes: simple_stmt[];
}
interface ICompound_stmtNl extends withType<"ICompound_stmtNl"> {
    compound_stmt: compound_stmt;
}
type file_input = INlIStmtType[];
type INlIStmtType = INl | IStmt;
interface IStmt extends withType<"IStmt"> {
    stmt: stmt;
}
type decorator = {
    dotted_name: dotted_name;
    iLBrArglistRBrType?: ILBrArglistRBrType;
};
type ILBrArglistRBrType = ILBrArglistRBr;
interface ILBrArglistRBr extends withType<"ILBrArglistRBr"> {
    arglist?: arglist;
}
type decorators = decorator[];
type IClassdefIFuncdefIAsync_funcdefType = IClassdef | IFuncdef | IAsync_funcdef;
interface IClassdef extends withType<"IClassdef"> {
    name: name;
    iLBrArglistRBrType?: ILBrArglistRBrType;
    block: block;
}
interface IFuncdef extends withType<"IFuncdef"> {
    funcdef: funcdef;
}
interface IAsync_funcdef extends withType<"IAsync_funcdef"> {
    async_funcdef: async_funcdef;
}
type async_funcdef = IAsync;
interface IAsync extends withType<"IAsync"> {
    funcdef: funcdef;
}
type funcdef = {
    name: name;
    parameters: parameters;
    iArrTestType?: test;
    block: block;
};
type parameters = {
    typedargslist?: typedargslist;
};
type typedargslist = Itypedargslist000 | Itypedargslist001 | IPowTfpdefCom;
type IComTfpdefEqTestQmarkType = {
    tfpdef: tfpdef;
    iEqTestType?: test;
};
type Itypedargslist00030Type = {
    itypedargslist0003010IPowTfpdefComType?: Itypedargslist0003010IPowTfpdefComType;
};
type Itypedargslist0003010IPowTfpdefComType = Itypedargslist0003010 | IPowTfpdefCom;
type IComPowTfpdefComQmarkType = {
    iPowTfpdefComType?: IPowTfpdefComType;
};
type IPowTfpdefComType = IPowTfpdefCom;
interface IPowTfpdefCom extends withType<"IPowTfpdefCom"> {
    tfpdef: tfpdef;
}
interface Itypedargslist0003010 extends withType<"Itypedargslist0003010"> {
    tfpdef?: tfpdef;
    iComTfpdefEqTestQmarkTypes: IComTfpdefEqTestQmarkType[];
    iComPowTfpdefComQmarkType?: IComPowTfpdefComQmarkType;
}
interface Itypedargslist000 extends withType<"Itypedargslist000"> {
    tfpdef: tfpdef;
    iEqTestType?: test;
    iComTfpdefEqTestQmarkTypes: IComTfpdefEqTestQmarkType[];
    itypedargslist00030Type?: Itypedargslist00030Type;
}
interface Itypedargslist001 extends withType<"Itypedargslist001"> {
    tfpdef?: tfpdef;
    iComTfpdefEqTestQmarkTypes: IComTfpdefEqTestQmarkType[];
    iComPowTfpdefComQmarkType?: IComPowTfpdefComQmarkType;
}
type tfpdef = {
    name: name;
    iColTestType?: IColTestType;
};
type IColTestType = IColTest;
interface IColTest extends withType<"IColTest"> {
    test: test;
}
type varargslist = Ivarargslist000 | Ivarargslist001 | IPowVfpdefCom;
type IComVfpdefEqTestQmarkType = {
    vfpdef: vfpdef;
    iEqTestType?: test;
};
type Ivarargslist00030Type = {
    ivarargslist0003010IPowVfpdefComQmarkType?: Ivarargslist0003010IPowVfpdefComQmarkType;
};
type Ivarargslist0003010IPowVfpdefComQmarkType = Ivarargslist0003010 | IPowVfpdefComQmark;
type IComPowVfpdefComQmarkType = {
    iPowVfpdefComType?: IPowVfpdefComType;
};
type IPowVfpdefComType = IPowVfpdefCom;
interface IPowVfpdefCom extends withType<"IPowVfpdefCom"> {
    vfpdef: vfpdef;
}
interface Ivarargslist0003010 extends withType<"Ivarargslist0003010"> {
    vfpdef?: vfpdef;
    iComVfpdefEqTestQmarkTypes: IComVfpdefEqTestQmarkType[];
    iComPowVfpdefComQmarkType?: IComPowVfpdefComQmarkType;
}
interface IPowVfpdefComQmark extends withType<"IPowVfpdefComQmark"> {
    vfpdef: vfpdef;
    iComType?: ",";
}
interface Ivarargslist000 extends withType<"Ivarargslist000"> {
    vfpdef: vfpdef;
    iEqTestType?: test;
    iComVfpdefEqTestQmarkTypes: IComVfpdefEqTestQmarkType[];
    ivarargslist00030Type?: Ivarargslist00030Type;
}
interface Ivarargslist001 extends withType<"Ivarargslist001"> {
    vfpdef?: vfpdef;
    iComVfpdefEqTestQmarkTypes: IComVfpdefEqTestQmarkType[];
    iComPowVfpdefComQmarkType?: IComPowVfpdefComQmarkType;
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
    iAnnassignIAugassignYield_exprTestlistIEqYield_exprTestlist_star_exprStarType: IAnnassignIAugassignYield_exprTestlistIEqYield_exprTestlist_star_exprStarType;
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
    iComNameTypes: name[];
}
interface INonlocal_stmt extends withType<"INonlocal_stmt"> {
    name: name;
    iComNameTypes: name[];
}
interface IAssert_stmt extends withType<"IAssert_stmt"> {
    test: test;
    iComTestType?: test;
}
type IAnnassignIAugassignYield_exprTestlistIEqYield_exprTestlist_star_exprStarType = IAnnassign | IAugassignYield_exprTestlist | IEqYield_exprTestlist_star_exprStar;
type IYield_exprITestlistType = IYield_expr | ITestlist;
interface IYield_expr extends withType<"IYield_expr"> {
    yield_arg?: yield_arg;
}
interface ITestlist extends withType<"ITestlist"> {
    testlist: testlist;
}
type IEqYield_exprTestlist_star_exprType = IYield_expr | ITestlist_star_expr;
interface ITestlist_star_expr extends withType<"ITestlist_star_expr"> {
    testlist_star_expr: testlist_star_expr;
}
interface IAnnassign extends withType<"IAnnassign"> {
    test: test;
    iEqTestType?: test;
}
interface IAugassignYield_exprTestlist extends withType<"IAugassignYield_exprTestlist"> {
    augassign: "+=" | "-=" | "*=" | "@=" | "/=" | "%=" | "&=" | "|=" | "^=" | "<<=" | ">>=" | "**=" | "//=";
    iYield_exprITestlistType: IYield_exprITestlistType;
}
interface IEqYield_exprTestlist_star_exprStar extends withType<"IEqYield_exprTestlist_star_exprStar"> {
    iEqYield_exprTestlist_star_exprTypes: IEqYield_exprTestlist_star_exprType[];
}
type testlist_star_expr = {
    iTestIStar_exprType: ITestIStar_exprType;
    iComTestStar_exprTypes: ITestIStar_exprType[];
};
type ITestIStar_exprType = ITest | IStar_expr;
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
    iTestFromQmarkType?: ITestFromQmarkType;
}
interface IYield_stmt extends withType<"IYield_stmt"> {
    yield_stmt: yield_stmt;
}
type yield_stmt = IYield_expr;
type ITestFromQmarkType = {
    test: test;
    iFromType?: IFromType;
};
type IFromType = IFrom;
interface IFrom extends withType<"IFrom"> {
    test: test;
}
type import_stmt = IImport_name | IImport_from;
interface IImport_name extends withType<"IImport_name"> {
    import_name: import_name;
}
interface IImport_from extends withType<"IImport_from"> {
    import_from: import_from;
}
type import_name = {
    dotted_as_name: dotted_as_name;
    iComDotted_as_nameTypes: dotted_as_name[];
};
type import_from = IFromImport;
type IFromImportType = IFromImport;
type IDotDddotStarDotted_nameIDotDddotPlusType = IDotDddotStarDotted_name | IDotDddotPlus;
interface IDddot extends withType<"IDddot"> {
    dddot: "...";
}
interface IDotDddotStarDotted_name extends withType<"IDotDddotStarDotted_name"> {
    iDotIDddotTypes: ("." | "...")[];
    dotted_name: dotted_name;
}
interface IDotDddotPlus extends withType<"IDotDddotPlus"> {
    iDotIDddotTypes: ("." | "...")[];
}
type IMultILBrImport_as_namesRBrIImport_as_namesType = IMult | ILBrImport_as_namesRBr | IImport_as_names;
interface IMult extends withType<"IMult"> {
    mult: "*";
}
interface ILBrImport_as_namesRBr extends withType<"ILBrImport_as_namesRBr"> {
    import_as_names: import_as_names;
}
interface IImport_as_names extends withType<"IImport_as_names"> {
    import_as_names: import_as_names;
}
interface IFromImport extends withType<"IFromImport"> {
    iDotDddotStarDotted_nameIDotDddotPlusType: IDotDddotStarDotted_nameIDotDddotPlusType;
    iMultILBrImport_as_namesRBrIImport_as_namesType: IMultILBrImport_as_namesRBrIImport_as_namesType;
}
type import_as_name = {
    name: name;
    iAsType?: IAsType;
};
type IAsType = IAs;
interface IAs extends withType<"IAs"> {
    name: name;
}
type dotted_as_name = {
    dotted_name: dotted_name;
    iAsType?: IAsType;
};
type import_as_names = {
    import_as_name: import_as_name;
    iComImport_as_nameTypes: import_as_name[];
};
type dotted_name = {
    name: name;
    iDotNameTypes: IDotNameType[];
};
type IDotNameType = IDotName;
interface IDotName extends withType<"IDotName"> {
    name: name;
}
type compound_stmt = IIf_stmt | IWhile_stmt | IFor_stmt | ITry_stmt | IWith_stmt | IFuncdef | IClassdef | IDecorated | IAsync_stmt | IMatch_stmt;
interface IIf_stmt extends withType<"IIf_stmt"> {
    if_stmt: if_stmt;
}
interface IWhile_stmt extends withType<"IWhile_stmt"> {
    test: test;
    block: block;
    iElseType?: block;
}
interface IFor_stmt extends withType<"IFor_stmt"> {
    exprlist: exprlist;
    testlist: testlist;
    block: block;
    iElseType?: block;
}
interface ITry_stmt extends withType<"ITry_stmt"> {
    try_stmt: try_stmt;
}
interface IWith_stmt extends withType<"IWith_stmt"> {
    with_item: with_item;
    iComWith_itemTypes: with_item[];
    block: block;
}
interface IDecorated extends withType<"IDecorated"> {
    decorators: decorators;
    iClassdefIFuncdefIAsync_funcdefType: IClassdefIFuncdefIAsync_funcdefType;
}
interface IAsync_stmt extends withType<"IAsync_stmt"> {
    async_stmt: async_stmt;
}
interface IMatch_stmt extends withType<"IMatch_stmt"> {
    match_stmt: match_stmt;
}
type async_stmt = IAsync;
type IFuncdefIWith_stmtIFor_stmtType = IFuncdef | IWith_stmt | IFor_stmt;
type if_stmt = IIf;
type IElifType = {
    test: test;
    block: block;
};
interface IIf extends withType<"IIf"> {
    test: test;
    block: block;
    iElifTypes: IElifType[];
    iElseType?: block;
}
type try_stmt = ITry;
type ITryType = ITry;
type Itry_stmt00030IFinallyType = Itry_stmt00030 | IFinally;
type IExcept_clauseColBlockType = {
    except_clause: except_clause;
    block: block;
};
type IFinallyType = IFinally;
interface IFinally extends withType<"IFinally"> {
    block: block;
}
interface Itry_stmt00030 extends withType<"Itry_stmt00030"> {
    iExcept_clauseColBlockTypes: IExcept_clauseColBlockType[];
    iElseType?: block;
    iFinallyType?: IFinallyType;
}
interface ITry extends withType<"ITry"> {
    block: block;
    itry_stmt00030IFinallyType: Itry_stmt00030IFinallyType;
}
type with_item = ITestAsQmark;
interface ITestAsQmark extends withType<"ITestAsQmark"> {
    test: test;
    iAsType?: IAsType;
}
type except_clause = {
    iTestAsQmarkType?: ITestAsQmarkType;
};
type ITestAsQmarkType = ITestAsQmark;
type block = ISimple_stmts | INlIdtStmtDdt;
interface INlIdtStmtDdt extends withType<"INlIdtStmtDdt"> {
    stmts: stmt[];
}
type match_stmt = IMatch;
interface IMatch extends withType<"IMatch"> {
    subject_expr: subject_expr;
    case_blocks: case_block[];
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
    guard?: guard;
    block: block;
};
type guard = IIf;
type patterns = IOpen_sequence_pattern | IPattern;
interface IOpen_sequence_pattern extends withType<"IOpen_sequence_pattern"> {
    open_sequence_pattern: open_sequence_pattern;
}
interface IPattern extends withType<"IPattern"> {
    pattern: pattern;
}
type pattern = IAs_pattern | IOr_pattern;
interface IAs_pattern extends withType<"IAs_pattern"> {
    as_pattern: as_pattern;
}
interface IOr_pattern extends withType<"IOr_pattern"> {
    closed_pattern: closed_pattern;
    iOrClosed_patternTypes: closed_pattern[];
}
type as_pattern = IAs;
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
    iDotNameTypes: IDotNameType[];
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
    iComMaybe_star_patternTypes: maybe_star_pattern[];
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
type mapping_pattern = ILCBrRCBr | ILCBrDouble_star_patternComRCBr | Imapping_pattern2 | ILCBrItems_patternComRCBr;
interface ILCBrRCBr extends withType<"ILCBrRCBr"> {
    lCBrrCBr: "{ }";
}
interface ILCBrDouble_star_patternComRCBr extends withType<"ILCBrDouble_star_patternComRCBr"> {
    double_star_pattern: pattern_capture_target;
}
interface Imapping_pattern2 extends withType<"Imapping_pattern2"> {
    items_pattern: items_pattern;
    double_star_pattern: pattern_capture_target;
}
interface ILCBrItems_patternComRCBr extends withType<"ILCBrItems_patternComRCBr"> {
    items_pattern: items_pattern;
}
type items_pattern = {
    key_value_pattern: key_value_pattern;
    iComKey_value_patternTypes: key_value_pattern[];
};
type key_value_pattern = {
    iLiteral_exprIAttrType: ILiteral_exprIAttrType;
    pattern: pattern;
};
type ILiteral_exprIAttrType = ILiteral_expr | IAttr;
interface ILiteral_expr extends withType<"ILiteral_expr"> {
    literal_expr: literal_expr;
}
type class_pattern = IName_or_attrLBrRBr | IName_or_attrLBrPositional_patternsComRBr | IName_or_attrLBrKeyword_patternsComRBr | Iclass_pattern3;
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
interface Iclass_pattern3 extends withType<"Iclass_pattern3"> {
    name_or_attr: name_or_attr;
    positional_patterns: positional_patterns;
    keyword_patterns: keyword_patterns;
}
type positional_patterns = {
    pattern: pattern;
    iComPatternTypes: pattern[];
};
type keyword_patterns = {
    keyword_pattern: keyword_pattern;
    iComKeyword_patternTypes: keyword_pattern[];
};
type keyword_pattern = {
    name: name;
    pattern: pattern;
};
type test = IOr_testIfElseQmark | ILambdef;
type IIfElseType = {
    or_test: or_test;
    test: test;
};
interface IOr_testIfElseQmark extends withType<"IOr_testIfElseQmark"> {
    or_test: or_test;
    iIfElseType?: IIfElseType;
}
interface ILambdef extends withType<"ILambdef"> {
    lambdef: lambdef;
}
type test_nocond = IOr_test | ILambdef_nocond;
interface IOr_test extends withType<"IOr_test"> {
    or_test: or_test;
}
interface ILambdef_nocond extends withType<"ILambdef_nocond"> {
    lambdef_nocond: lambdef_nocond;
}
type lambdef = ILambda;
interface ILambda extends withType<"ILambda"> {
    varargslist?: varargslist;
    test: test;
}
type lambdef_nocond = ILambda;
type or_test = {
    and_test: and_test;
    iOrTypes: and_test[];
};
type and_test = {
    not_test: not_test;
    iAndTypes: not_test[];
};
type not_test = INot | IComparison;
interface INot extends withType<"INot"> {
    not_test: not_test;
}
interface IComparison extends withType<"IComparison"> {
    expr: expr;
    iComp_opExprTypes: IComp_opExprType[];
}
type IComp_opExprType = {
    comp_op: "<" | ">" | "==" | ">=" | "<=" | "<>" | "<>" | "in" | "not in" | "is" | "is not";
    expr: expr;
};
type star_expr = IMultExpr;
type expr = IAtom_expr | IExprPowExpr | IPlusMinTldPlusExpr | Iexpr3 | IExprPlusMinExpr | IExprShLShRExpr | IExprAndExpr | IExprXorExpr | IExprOrExpr;
interface IAtom_expr extends withType<"IAtom_expr"> {
    atom: atom;
    trailers: trailer[];
}
interface IExprPowExpr extends withType<"IExprPowExpr"> {
    expr1: expr;
    expr2: expr;
}
interface IPlusMinTldPlusExpr extends withType<"IPlusMinTldPlusExpr"> {
    iPlusIMinITldTypes: ("+" | "-" | "~")[];
    expr: expr;
}
interface Iexpr3 extends withType<"Iexpr3"> {
    expr1: expr;
    iMultIAtIDivIModIDdivType: "*" | "@" | "/" | "%" | "//";
    expr2: expr;
}
interface IExprPlusMinExpr extends withType<"IExprPlusMinExpr"> {
    expr1: expr;
    iPlusIMinType: "+" | "-";
    expr2: expr;
}
interface IExprShLShRExpr extends withType<"IExprShLShRExpr"> {
    expr1: expr;
    iShLIShRType: "<<" | ">>";
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
type IYield_exprITestlist_compType = IYield_expr | ITestlist_comp;
interface ITestlist_comp extends withType<"ITestlist_comp"> {
    testlist_comp: testlist_comp;
}
interface ILBrYield_exprTestlist_compQmarkRBr extends withType<"ILBrYield_exprTestlist_compQmarkRBr"> {
    iYield_exprITestlist_compType?: IYield_exprITestlist_compType;
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
type testlist_comp = {
    iTestIStar_exprType: ITestIStar_exprType;
    iComp_forIComTestStar_exprStarComType: IComp_forIComTestStar_exprStarComType;
};
type IComp_forIComTestStar_exprStarComType = IComp_for | IComTestStar_exprStarCom;
interface IComp_for extends withType<"IComp_for"> {
    comp_for: comp_for;
}
interface IComTestStar_exprStarCom extends withType<"IComTestStar_exprStarCom"> {
    iComTestStar_exprTypes: ITestIStar_exprType[];
}
type trailer = ILBrArglistRBr | ILCBrSubscriptlistRCBr | IDotName;
interface ILCBrSubscriptlistRCBr extends withType<"ILCBrSubscriptlistRCBr"> {
    subscript_: subscript_;
    iComSubscript_Types: subscript_[];
}
type subscript_ = ITest | ITestColTestSliceop;
interface ITestColTestSliceop extends withType<"ITestColTestSliceop"> {
    test1?: test;
    test2?: test;
    sliceop?: sliceop;
}
type sliceop = IColTest;
type exprlist = {
    iExprIStar_exprType: IExprIStar_exprType;
    iComExprStar_exprTypes: IExprIStar_exprType[];
};
type IExprIStar_exprType = IExpr | IStar_expr;
interface IExpr extends withType<"IExpr"> {
    expr: expr;
}
type testlist = {
    test: test;
    iComTestTypes: test[];
};
type dictorsetmaker = Idictorsetmaker000 | Idictorsetmaker001;
type ITestColTestIPowExprType = ITestColTest | IPowExpr;
interface ITestColTest extends withType<"ITestColTest"> {
    test1: test;
    test2: test;
}
interface IPowExpr extends withType<"IPowExpr"> {
    expr: expr;
}
type IComp_forIdictorsetmaker0000011Type = IComp_for | Idictorsetmaker0000011;
interface Idictorsetmaker0000011 extends withType<"Idictorsetmaker0000011"> {
    idictorsetmaker000001100Types: ITestColTestIPowExprType[];
}
interface Idictorsetmaker000 extends withType<"Idictorsetmaker000"> {
    iTestColTestIPowExprType: ITestColTestIPowExprType;
    iComp_forIdictorsetmaker0000011Type: IComp_forIdictorsetmaker0000011Type;
}
interface Idictorsetmaker001 extends withType<"Idictorsetmaker001"> {
    iTestIStar_exprType: ITestIStar_exprType;
    iComp_forIComTestStar_exprStarComType: IComp_forIComTestStar_exprStarComType;
}
type arglist = {
    argument: argument;
    iComArgumentTypes: argument[];
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
    comp_if: comp_if;
}
type comp_for = {
    exprlist: exprlist;
    or_test: or_test;
    comp_iter?: comp_iter;
};
type comp_if = IIf;
type encoding_decl = IName;
type yield_arg = IFrom | ITestlist;
type strings = IString;

