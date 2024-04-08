type withType<T> = {
    type: T;
};
type single_input = INlSingle_input | ISimple_stmtsSingle_input | ICompound_stmtNlSingle_input;
interface INlSingle_input extends withType<"NlSingle_input"> {
    nl: "NEWLINE";
}
interface ISimple_stmtsSingle_input extends withType<"Simple_stmtsSingle_input"> {
    simple_stmts: simple_stmts;
}
interface ICompound_stmtNlSingle_input extends withType<"Compound_stmtNlSingle_input"> {
    compound_stmt: compound_stmt;
}
type file_input = NlStmt[];
type NlStmt = INl | IStmt;
interface INl extends withType<"Nl"> {
    nl: "NEWLINE";
}
interface IStmt extends withType<"Stmt"> {
    stmt: stmt;
}
type eval_input = testlist;
type decorator = {
    dotted_name: dotted_name;
    lBrArglistRBr?: LBrArglistRBr;
};
type LBrArglistRBr = arglist;
type decorators = decorator[];
type decorated = {
    decorators: decorators;
    classdefFuncdefAsync_funcdef: ClassdefFuncdefAsync_funcdef;
};
type ClassdefFuncdefAsync_funcdef = IClassdef | IFuncdef | IAsync_funcdef;
interface IClassdef extends withType<"Classdef"> {
    classdef: classdef;
}
interface IFuncdef extends withType<"Funcdef"> {
    funcdef: funcdef;
}
interface IAsync_funcdef extends withType<"Async_funcdef"> {
    async_funcdef: async_funcdef;
}
type async_funcdef = funcdef;
type funcdef = {
    name: name;
    parameters: parameters;
    arrTest?: ArrTest;
    block: block;
};
type ArrTest = test;
type parameters = typedargslist;
type typedargslist = TfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom;
type TfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom = ITfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom | IMultTfpdefComTfpdefEqTestComPowTfpdefCom | IPowTfpdefCom;
type EqTest = test;
type ComTfpdefEqTest = {
    tfpdef: tfpdef;
    eqTest?: EqTest;
};
type ComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom = MultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom;
type MultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom = IMultTfpdefComTfpdefEqTestComPowTfpdefCom | IPowTfpdefCom;
type ComPowTfpdefCom = PowTfpdefCom;
type PowTfpdefCom = IPowTfpdefCom;
interface IPowTfpdefCom extends withType<"PowTfpdefCom"> {
    tfpdef: tfpdef;
}
interface IMultTfpdefComTfpdefEqTestComPowTfpdefCom extends withType<"MultTfpdefComTfpdefEqTestComPowTfpdefCom"> {
    tfpdef?: tfpdef;
    comTfpdefEqTests: ComTfpdefEqTest[];
    comPowTfpdefCom?: ComPowTfpdefCom;
}
interface ITfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom extends withType<"TfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom"> {
    tfpdef: tfpdef;
    eqTest?: EqTest;
    comTfpdefEqTests: ComTfpdefEqTest[];
    comMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom?: ComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom;
}
type tfpdef = {
    name: name;
    colTest?: ColTest;
};
type ColTest = test;
type varargslist = VfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom;
type VfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom = IVfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom | IMultVfpdefComVfpdefEqTestComPowVfpdefCom | IPowVfpdefCom;
type ComVfpdefEqTest = {
    vfpdef: vfpdef;
    eqTest?: EqTest;
};
type ComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom = MultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom;
type MultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom = IMultVfpdefComVfpdefEqTestComPowVfpdefCom | IPowVfpdefCom;
type ComPowVfpdefCom = PowVfpdefCom;
type PowVfpdefCom = IPowVfpdefCom;
interface IPowVfpdefCom extends withType<"PowVfpdefCom"> {
    vfpdef: vfpdef;
}
interface IMultVfpdefComVfpdefEqTestComPowVfpdefCom extends withType<"MultVfpdefComVfpdefEqTestComPowVfpdefCom"> {
    vfpdef?: vfpdef;
    comVfpdefEqTests: ComVfpdefEqTest[];
    comPowVfpdefCom?: ComPowVfpdefCom;
}
interface IVfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom extends withType<"VfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom"> {
    vfpdef: vfpdef;
    eqTest?: EqTest;
    comVfpdefEqTests: ComVfpdefEqTest[];
    comMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom?: ComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom;
}
type vfpdef = name;
type stmt = ISimple_stmtsStmt | ICompound_stmtStmt;
interface ISimple_stmtsStmt extends withType<"Simple_stmtsStmt"> {
    simple_stmts: simple_stmts;
}
interface ICompound_stmtStmt extends withType<"Compound_stmtStmt"> {
    compound_stmt: compound_stmt;
}
type simple_stmts = {
    simple_stmt: simple_stmt;
    scolSimple_stmts: ScolSimple_stmt[];
};
type ScolSimple_stmt = simple_stmt;
type simple_stmt = Expr_stmtDel_stmtPass_stmtFlow_stmtImport_stmtGlobal_stmtNonlocal_stmtAssert_stmt;
type Expr_stmtDel_stmtPass_stmtFlow_stmtImport_stmtGlobal_stmtNonlocal_stmtAssert_stmt = IExpr_stmt | IDel_stmt | IPass_stmt | IFlow_stmt | IImport_stmt | IGlobal_stmt | INonlocal_stmt | IAssert_stmt;
interface IExpr_stmt extends withType<"Expr_stmt"> {
    expr_stmt: expr_stmt;
}
interface IDel_stmt extends withType<"Del_stmt"> {
    del_stmt: del_stmt;
}
interface IPass_stmt extends withType<"Pass_stmt"> {
    pass_stmt: "pass";
}
interface IFlow_stmt extends withType<"Flow_stmt"> {
    flow_stmt: flow_stmt;
}
interface IImport_stmt extends withType<"Import_stmt"> {
    import_stmt: import_stmt;
}
interface IGlobal_stmt extends withType<"Global_stmt"> {
    global_stmt: global_stmt;
}
interface INonlocal_stmt extends withType<"Nonlocal_stmt"> {
    nonlocal_stmt: nonlocal_stmt;
}
interface IAssert_stmt extends withType<"Assert_stmt"> {
    assert_stmt: assert_stmt;
}
type expr_stmt = {
    testlist_star_expr: testlist_star_expr;
    annassignAugassignYield_exprTestlistEqYield_exprTestlist_star_expr: AnnassignAugassignYield_exprTestlistEqYield_exprTestlist_star_expr;
};
type AnnassignAugassignYield_exprTestlistEqYield_exprTestlist_star_expr = IAnnassign | IAugassignYield_exprTestlist | IEqYield_exprTestlist_star_expr;
type Yield_exprTestlist = IYield_expr | ITestlist;
interface IYield_expr extends withType<"Yield_expr"> {
    yield_expr: yield_expr;
}
interface ITestlist extends withType<"Testlist"> {
    testlist: testlist;
}
type EqYield_exprTestlist_star_expr = IEqYield_exprTestlist_star_expr;
type Yield_exprTestlist_star_expr = IYield_expr | ITestlist_star_expr;
interface ITestlist_star_expr extends withType<"Testlist_star_expr"> {
    testlist_star_expr: testlist_star_expr;
}
interface IEqYield_exprTestlist_star_expr extends withType<"EqYield_exprTestlist_star_expr"> {
    yield_exprTestlist_star_expr: Yield_exprTestlist_star_expr;
}
interface IAnnassign extends withType<"Annassign"> {
    annassign: annassign;
}
interface IAugassignYield_exprTestlist extends withType<"AugassignYield_exprTestlist"> {
    augassign: augassign;
    yield_exprTestlist: Yield_exprTestlist;
}
type annassign = {
    test: test;
    eqTest?: EqTest;
};
type testlist_star_expr = {
    testStar_expr: TestStar_expr;
    comTestStar_exprs: ComTestStar_expr[];
};
type TestStar_expr = ITest | IStar_expr;
interface ITest extends withType<"Test"> {
    test: test;
}
interface IStar_expr extends withType<"Star_expr"> {
    star_expr: star_expr;
}
type ComTestStar_expr = TestStar_expr;
type augassign = "+=" | "-=" | "*=" | "@=" | "/=" | "%=" | "&=" | "|=" | "^=" | "<<=" | ">>=" | "**=" | "//=";
type del_stmt = exprlist;
type flow_stmt = IBreak_stmtFlow_stmt | IContinue_stmtFlow_stmt | IReturn_stmtFlow_stmt | IRaise_stmtFlow_stmt | IYield_stmtFlow_stmt;
interface IBreak_stmtFlow_stmt extends withType<"Break_stmtFlow_stmt"> {
    break_stmt: "break";
}
interface IContinue_stmtFlow_stmt extends withType<"Continue_stmtFlow_stmt"> {
    continue_stmt: "continue";
}
interface IReturn_stmtFlow_stmt extends withType<"Return_stmtFlow_stmt"> {
    return_stmt: return_stmt;
}
interface IRaise_stmtFlow_stmt extends withType<"Raise_stmtFlow_stmt"> {
    raise_stmt: raise_stmt;
}
interface IYield_stmtFlow_stmt extends withType<"Yield_stmtFlow_stmt"> {
    yield_stmt: yield_stmt;
}
type return_stmt = testlist;
type yield_stmt = yield_expr;
type raise_stmt = TestFrom;
type TestFrom = {
    test: test;
    from?: From;
};
type From = test;
type import_stmt = IImport_nameImport_stmt | IImport_fromImport_stmt;
interface IImport_nameImport_stmt extends withType<"Import_nameImport_stmt"> {
    import_name: import_name;
}
interface IImport_fromImport_stmt extends withType<"Import_fromImport_stmt"> {
    import_from: import_from;
}
type import_name = dotted_as_names;
type import_from = FromImport;
type FromImport = {
    dotDddotDotted_nameDotDddot: DotDddotDotted_nameDotDddot;
    multLBrImport_as_namesRBrImport_as_names: MultLBrImport_as_namesRBrImport_as_names;
};
type DotDddotDotted_nameDotDddot = IDotDddotDotted_name | IDotDddot;
interface IDotDddotDotted_name extends withType<"DotDddotDotted_name"> {
    dotDddots: ("." | "...")[];
    dotted_name: dotted_name;
}
interface IDotDddot extends withType<"DotDddot"> {
    dotDddots: ("." | "...")[];
}
type MultLBrImport_as_namesRBrImport_as_names = IMult | ILBrImport_as_namesRBr | IImport_as_names;
interface IMult extends withType<"Mult"> {
    mult: "*";
}
interface ILBrImport_as_namesRBr extends withType<"LBrImport_as_namesRBr"> {
    import_as_names: import_as_names;
}
interface IImport_as_names extends withType<"Import_as_names"> {
    import_as_names: import_as_names;
}
type import_as_name = {
    name: name;
    as?: As;
};
type As = name;
type dotted_as_name = {
    dotted_name: dotted_name;
    as?: As;
};
type import_as_names = {
    import_as_name: import_as_name;
    comImport_as_names: ComImport_as_name[];
};
type ComImport_as_name = import_as_name;
type dotted_as_names = {
    dotted_as_name: dotted_as_name;
    comDotted_as_names: ComDotted_as_name[];
};
type ComDotted_as_name = dotted_as_name;
type dotted_name = {
    name: name;
    dotNames: DotName[];
};
type DotName = name;
type global_stmt = {
    name: name;
    comNames: ComName[];
};
type ComName = name;
type nonlocal_stmt = {
    name: name;
    comNames: ComName[];
};
type assert_stmt = {
    test: test;
    comTest?: ComTest;
};
type ComTest = test;
type compound_stmt = IIf_stmtCompound_stmt | IWhile_stmtCompound_stmt | IFor_stmtCompound_stmt | ITry_stmtCompound_stmt | IWith_stmtCompound_stmt | IFuncdefCompound_stmt | IClassdefCompound_stmt | IDecoratedCompound_stmt | IAsync_stmtCompound_stmt | IMatch_stmtCompound_stmt;
interface IIf_stmtCompound_stmt extends withType<"If_stmtCompound_stmt"> {
    if_stmt: if_stmt;
}
interface IWhile_stmtCompound_stmt extends withType<"While_stmtCompound_stmt"> {
    while_stmt: while_stmt;
}
interface IFor_stmtCompound_stmt extends withType<"For_stmtCompound_stmt"> {
    for_stmt: for_stmt;
}
interface ITry_stmtCompound_stmt extends withType<"Try_stmtCompound_stmt"> {
    try_stmt: try_stmt;
}
interface IWith_stmtCompound_stmt extends withType<"With_stmtCompound_stmt"> {
    with_stmt: with_stmt;
}
interface IFuncdefCompound_stmt extends withType<"FuncdefCompound_stmt"> {
    funcdef: funcdef;
}
interface IClassdefCompound_stmt extends withType<"ClassdefCompound_stmt"> {
    classdef: classdef;
}
interface IDecoratedCompound_stmt extends withType<"DecoratedCompound_stmt"> {
    decorated: decorated;
}
interface IAsync_stmtCompound_stmt extends withType<"Async_stmtCompound_stmt"> {
    async_stmt: async_stmt;
}
interface IMatch_stmtCompound_stmt extends withType<"Match_stmtCompound_stmt"> {
    match_stmt: match_stmt;
}
type async_stmt = FuncdefWith_stmtFor_stmt;
type FuncdefWith_stmtFor_stmt = IFuncdef | IWith_stmt | IFor_stmt;
interface IWith_stmt extends withType<"With_stmt"> {
    with_stmt: with_stmt;
}
interface IFor_stmt extends withType<"For_stmt"> {
    for_stmt: for_stmt;
}
type if_stmt = {
    test: test;
    block: block;
    elifs: Elif[];
    else?: Else;
};
type Elif = {
    test: test;
    block: block;
};
type Else = block;
type while_stmt = {
    test: test;
    block: block;
    else?: Else;
};
type for_stmt = {
    exprlist: exprlist;
    testlist: testlist;
    block: block;
    else?: Else;
};
type try_stmt = Try;
type Try = {
    block: block;
    except_clauseColBlockElseFinallyFinally: Except_clauseColBlockElseFinallyFinally;
};
type Except_clauseColBlockElseFinallyFinally = IExcept_clauseColBlockElseFinally | IFinally;
type Except_clauseColBlock = {
    except_clause: except_clause;
    block: block;
};
type Finally = IFinally;
interface IFinally extends withType<"Finally"> {
    block: block;
}
interface IExcept_clauseColBlockElseFinally extends withType<"Except_clauseColBlockElseFinally"> {
    except_clauseColBlocks: Except_clauseColBlock[];
    else?: Else;
    finally?: Finally;
}
type with_stmt = {
    with_item: with_item;
    comWith_items: ComWith_item[];
    block: block;
};
type ComWith_item = with_item;
type with_item = {
    test: test;
    as?: As;
};
type except_clause = TestAs;
type TestAs = {
    test: test;
    as?: As;
};
type block = ISimple_stmtsBlock | INlIdtStmtDdtBlock;
interface ISimple_stmtsBlock extends withType<"Simple_stmtsBlock"> {
    simple_stmts: simple_stmts;
}
interface INlIdtStmtDdtBlock extends withType<"NlIdtStmtDdtBlock"> {
    stmts: stmt[];
}
type match_stmt = {
    subject_expr: subject_expr;
    case_blocks: case_block[];
};
type subject_expr = IStar_named_expressionComStar_named_expressionsSubject_expr | ITestSubject_expr;
interface IStar_named_expressionComStar_named_expressionsSubject_expr extends withType<"Star_named_expressionComStar_named_expressionsSubject_expr"> {
    star_named_expression: star_named_expression;
    star_named_expressions?: star_named_expressions;
}
interface ITestSubject_expr extends withType<"TestSubject_expr"> {
    test: test;
}
type star_named_expressions = star_named_expression[];
type star_named_expression = IMultExprStar_named_expression | ITestStar_named_expression;
interface IMultExprStar_named_expression extends withType<"MultExprStar_named_expression"> {
    expr: expr;
}
interface ITestStar_named_expression extends withType<"TestStar_named_expression"> {
    test: test;
}
type case_block = {
    patterns: patterns;
    guard?: guard;
    block: block;
};
type guard = test;
type patterns = IOpen_sequence_patternPatterns | IPatternPatterns;
interface IOpen_sequence_patternPatterns extends withType<"Open_sequence_patternPatterns"> {
    open_sequence_pattern: open_sequence_pattern;
}
interface IPatternPatterns extends withType<"PatternPatterns"> {
    pattern: pattern;
}
type pattern = IAs_patternPattern | IOr_patternPattern;
interface IAs_patternPattern extends withType<"As_patternPattern"> {
    as_pattern: as_pattern;
}
interface IOr_patternPattern extends withType<"Or_patternPattern"> {
    or_pattern: or_pattern;
}
type as_pattern = {
    or_pattern: or_pattern;
    pattern_capture_target: pattern_capture_target;
};
type or_pattern = {
    closed_pattern: closed_pattern;
    orClosed_patterns: OrClosed_pattern[];
};
type OrClosed_pattern = closed_pattern;
type closed_pattern = ILiteral_patternClosed_pattern | ICapture_patternClosed_pattern | IWildcard_patternClosed_pattern | IValue_patternClosed_pattern | IGroup_patternClosed_pattern | ISequence_patternClosed_pattern | IMapping_patternClosed_pattern | IClass_patternClosed_pattern;
interface ILiteral_patternClosed_pattern extends withType<"Literal_patternClosed_pattern"> {
    literal_pattern: literal_pattern;
}
interface ICapture_patternClosed_pattern extends withType<"Capture_patternClosed_pattern"> {
    capture_pattern: capture_pattern;
}
interface IWildcard_patternClosed_pattern extends withType<"Wildcard_patternClosed_pattern"> {
    wildcard_pattern: "_";
}
interface IValue_patternClosed_pattern extends withType<"Value_patternClosed_pattern"> {
    value_pattern: value_pattern;
}
interface IGroup_patternClosed_pattern extends withType<"Group_patternClosed_pattern"> {
    group_pattern: group_pattern;
}
interface ISequence_patternClosed_pattern extends withType<"Sequence_patternClosed_pattern"> {
    sequence_pattern: sequence_pattern;
}
interface IMapping_patternClosed_pattern extends withType<"Mapping_patternClosed_pattern"> {
    mapping_pattern: mapping_pattern;
}
interface IClass_patternClosed_pattern extends withType<"Class_patternClosed_pattern"> {
    class_pattern: class_pattern;
}
type literal_pattern = ISigned_numberDummyLiteral_pattern | IComplex_numberLiteral_pattern | IStringsLiteral_pattern | INoneLiteral_pattern | ITrueLiteral_pattern | IFalseLiteral_pattern;
interface ISigned_numberDummyLiteral_pattern extends withType<"Signed_numberDummyLiteral_pattern"> {
    signed_number: signed_number;
    dummy: boolean;
}
interface IComplex_numberLiteral_pattern extends withType<"Complex_numberLiteral_pattern"> {
    complex_number: complex_number;
}
interface IStringsLiteral_pattern extends withType<"StringsLiteral_pattern"> {
    strings: strings;
}
interface INoneLiteral_pattern extends withType<"NoneLiteral_pattern"> {
    none: "None";
}
interface ITrueLiteral_pattern extends withType<"TrueLiteral_pattern"> {
    true: "True";
}
interface IFalseLiteral_pattern extends withType<"FalseLiteral_pattern"> {
    false: "False";
}
type literal_expr = ISigned_numberDummyLiteral_expr | IComplex_numberLiteral_expr | IStringsLiteral_expr | INoneLiteral_expr | ITrueLiteral_expr | IFalseLiteral_expr;
interface ISigned_numberDummyLiteral_expr extends withType<"Signed_numberDummyLiteral_expr"> {
    signed_number: signed_number;
    dummy: boolean;
}
interface IComplex_numberLiteral_expr extends withType<"Complex_numberLiteral_expr"> {
    complex_number: complex_number;
}
interface IStringsLiteral_expr extends withType<"StringsLiteral_expr"> {
    strings: strings;
}
interface INoneLiteral_expr extends withType<"NoneLiteral_expr"> {
    none: "None";
}
interface ITrueLiteral_expr extends withType<"TrueLiteral_expr"> {
    true: "True";
}
interface IFalseLiteral_expr extends withType<"FalseLiteral_expr"> {
    false: "False";
}
type complex_number = ISigned_real_numberPlusImaginary_numberComplex_number | ISigned_real_numberMinImaginary_numberComplex_number;
interface ISigned_real_numberPlusImaginary_numberComplex_number extends withType<"Signed_real_numberPlusImaginary_numberComplex_number"> {
    signed_real_number: signed_real_number;
    imaginary_number: number;
}
interface ISigned_real_numberMinImaginary_numberComplex_number extends withType<"Signed_real_numberMinImaginary_numberComplex_number"> {
    signed_real_number: signed_real_number;
    imaginary_number: number;
}
type signed_number = INumberSigned_number | IMinNumberSigned_number;
interface INumberSigned_number extends withType<"NumberSigned_number"> {
    number: number;
}
interface IMinNumberSigned_number extends withType<"MinNumberSigned_number"> {
    number: number;
}
type signed_real_number = IReal_numberSigned_real_number | IMinReal_numberSigned_real_number;
interface IReal_numberSigned_real_number extends withType<"Real_numberSigned_real_number"> {
    real_number: number;
}
interface IMinReal_numberSigned_real_number extends withType<"MinReal_numberSigned_real_number"> {
    real_number: number;
}
type capture_pattern = pattern_capture_target;
type pattern_capture_target = {
    name: name;
    dummy: boolean;
};
type value_pattern = {
    attr: attr;
    dummy: boolean;
};
type attr = {
    name: name;
    dotNames: DotName[];
};
type name_or_attr = IAttrName_or_attr | INameName_or_attr;
interface IAttrName_or_attr extends withType<"AttrName_or_attr"> {
    attr: attr;
}
interface INameName_or_attr extends withType<"NameName_or_attr"> {
    name: name;
}
type group_pattern = pattern;
type sequence_pattern = ILCBrMaybe_sequence_patternRCBrSequence_pattern | ILBrOpen_sequence_patternRBrSequence_pattern;
interface ILCBrMaybe_sequence_patternRCBrSequence_pattern extends withType<"LCBrMaybe_sequence_patternRCBrSequence_pattern"> {
    maybe_sequence_pattern?: maybe_sequence_pattern;
}
interface ILBrOpen_sequence_patternRBrSequence_pattern extends withType<"LBrOpen_sequence_patternRBrSequence_pattern"> {
    open_sequence_pattern?: open_sequence_pattern;
}
type open_sequence_pattern = {
    maybe_star_pattern: maybe_star_pattern;
    maybe_sequence_pattern?: maybe_sequence_pattern;
};
type maybe_sequence_pattern = {
    maybe_star_pattern: maybe_star_pattern;
    comMaybe_star_patterns: ComMaybe_star_pattern[];
};
type ComMaybe_star_pattern = maybe_star_pattern;
type maybe_star_pattern = IStar_patternMaybe_star_pattern | IPatternMaybe_star_pattern;
interface IStar_patternMaybe_star_pattern extends withType<"Star_patternMaybe_star_pattern"> {
    star_pattern: star_pattern;
}
interface IPatternMaybe_star_pattern extends withType<"PatternMaybe_star_pattern"> {
    pattern: pattern;
}
type star_pattern = IMultPattern_capture_targetStar_pattern | IMultWildcard_patternStar_pattern;
interface IMultPattern_capture_targetStar_pattern extends withType<"MultPattern_capture_targetStar_pattern"> {
    pattern_capture_target: pattern_capture_target;
}
interface IMultWildcard_patternStar_pattern extends withType<"MultWildcard_patternStar_pattern"> {
    wildcard_pattern: "_";
}
type mapping_pattern = ILCBrRCBrMapping_pattern | ILCBrDouble_star_patternComRCBrMapping_pattern | ILCBrItems_patternComDouble_star_patternComRCBrMapping_pattern | ILCBrItems_patternComRCBrMapping_pattern;
interface ILCBrRCBrMapping_pattern extends withType<"LCBrRCBrMapping_pattern"> {
}
interface ILCBrDouble_star_patternComRCBrMapping_pattern extends withType<"LCBrDouble_star_patternComRCBrMapping_pattern"> {
    double_star_pattern: double_star_pattern;
}
interface ILCBrItems_patternComDouble_star_patternComRCBrMapping_pattern extends withType<"LCBrItems_patternComDouble_star_patternComRCBrMapping_pattern"> {
    items_pattern: items_pattern;
    double_star_pattern: double_star_pattern;
}
interface ILCBrItems_patternComRCBrMapping_pattern extends withType<"LCBrItems_patternComRCBrMapping_pattern"> {
    items_pattern: items_pattern;
}
type items_pattern = {
    key_value_pattern: key_value_pattern;
    comKey_value_patterns: ComKey_value_pattern[];
};
type ComKey_value_pattern = key_value_pattern;
type key_value_pattern = {
    literal_exprAttr: Literal_exprAttr;
    pattern: pattern;
};
type Literal_exprAttr = ILiteral_expr | IAttr;
interface ILiteral_expr extends withType<"Literal_expr"> {
    literal_expr: literal_expr;
}
interface IAttr extends withType<"Attr"> {
    attr: attr;
}
type double_star_pattern = pattern_capture_target;
type class_pattern = IName_or_attrLBrRBrClass_pattern | IName_or_attrLBrPositional_patternsComRBrClass_pattern | IName_or_attrLBrKeyword_patternsComRBrClass_pattern | IName_or_attrLBrPositional_patternsComKeyword_patternsComRBrClass_pattern;
interface IName_or_attrLBrRBrClass_pattern extends withType<"Name_or_attrLBrRBrClass_pattern"> {
    name_or_attr: name_or_attr;
}
interface IName_or_attrLBrPositional_patternsComRBrClass_pattern extends withType<"Name_or_attrLBrPositional_patternsComRBrClass_pattern"> {
    name_or_attr: name_or_attr;
    positional_patterns: positional_patterns;
}
interface IName_or_attrLBrKeyword_patternsComRBrClass_pattern extends withType<"Name_or_attrLBrKeyword_patternsComRBrClass_pattern"> {
    name_or_attr: name_or_attr;
    keyword_patterns: keyword_patterns;
}
interface IName_or_attrLBrPositional_patternsComKeyword_patternsComRBrClass_pattern extends withType<"Name_or_attrLBrPositional_patternsComKeyword_patternsComRBrClass_pattern"> {
    name_or_attr: name_or_attr;
    positional_patterns: positional_patterns;
    keyword_patterns: keyword_patterns;
}
type positional_patterns = {
    pattern: pattern;
    comPatterns: ComPattern[];
};
type ComPattern = pattern;
type keyword_patterns = {
    keyword_pattern: keyword_pattern;
    comKeyword_patterns: ComKeyword_pattern[];
};
type ComKeyword_pattern = keyword_pattern;
type keyword_pattern = {
    name: name;
    pattern: pattern;
};
type test = IOr_testIfElseTest | ILambdefTest;
type IfElse = {
    or_test: or_test;
    test: test;
};
interface IOr_testIfElseTest extends withType<"Or_testIfElseTest"> {
    or_test: or_test;
    ifElse?: IfElse;
}
interface ILambdefTest extends withType<"LambdefTest"> {
    lambdef: lambdef;
}
type test_nocond = IOr_testTest_nocond | ILambdef_nocondTest_nocond;
interface IOr_testTest_nocond extends withType<"Or_testTest_nocond"> {
    or_test: or_test;
}
interface ILambdef_nocondTest_nocond extends withType<"Lambdef_nocondTest_nocond"> {
    lambdef_nocond: lambdef_nocond;
}
type lambdef = {
    varargslist?: varargslist;
    test: test;
};
type lambdef_nocond = {
    varargslist?: varargslist;
    test_nocond: test_nocond;
};
type or_test = {
    and_test: and_test;
    ors: Or[];
};
type Or = and_test;
type and_test = {
    not_test: not_test;
    ands: And[];
};
type And = not_test;
type not_test = INotNot_test | IComparisonNot_test;
interface INotNot_test extends withType<"NotNot_test"> {
    not_test: not_test;
}
interface IComparisonNot_test extends withType<"ComparisonNot_test"> {
    comparison: comparison;
}
type comparison = {
    expr: expr;
    comp_opExprs: Comp_opExpr[];
};
type Comp_opExpr = {
    comp_op: comp_op;
    expr: expr;
};
type comp_op = ILTComp_op | IGTComp_op | IIsEqComp_op | IGTEqComp_op | ILTEqComp_op | INEqComp_op | INEqComp_op | IInComp_op | INotInComp_op | IIsComp_op | IIsNotComp_op;
interface ILTComp_op extends withType<"LTComp_op"> {
    lT: "<";
}
interface IGTComp_op extends withType<"GTComp_op"> {
    gT: ">";
}
interface IIsEqComp_op extends withType<"IsEqComp_op"> {
    isEq: "==";
}
interface IGTEqComp_op extends withType<"GTEqComp_op"> {
    gTEq: ">=";
}
interface ILTEqComp_op extends withType<"LTEqComp_op"> {
    lTEq: "<=";
}
interface INEqComp_op extends withType<"NEqComp_op"> {
    nEq: "<>";
}
interface IInComp_op extends withType<"InComp_op"> {
    in: "in";
}
interface INotInComp_op extends withType<"NotInComp_op"> {
}
interface IIsComp_op extends withType<"IsComp_op"> {
    is: "is";
}
interface IIsNotComp_op extends withType<"IsNotComp_op"> {
}
type star_expr = expr;
type expr = IAtom_exprExpr | IExprPowExprExpr | IPlusMinTldExprExpr | IExprMultAtDivModDdivExprExpr | IExprPlusMinExprExpr | IExprShLShRExprExpr | IExprAndExprExpr | IExprXorExprExpr | IExprOrExprExpr;
interface IAtom_exprExpr extends withType<"Atom_exprExpr"> {
    atom_expr: atom_expr;
}
interface IExprPowExprExpr extends withType<"ExprPowExprExpr"> {
    expr1: expr;
    expr2: expr;
}
interface IPlusMinTldExprExpr extends withType<"PlusMinTldExprExpr"> {
    plusMinTlds: ("+" | "-" | "~")[];
    expr: expr;
}
interface IExprMultAtDivModDdivExprExpr extends withType<"ExprMultAtDivModDdivExprExpr"> {
    expr1: expr;
    multAtDivModDdiv: "*" | "@" | "/" | "%" | "//";
    expr2: expr;
}
interface IExprPlusMinExprExpr extends withType<"ExprPlusMinExprExpr"> {
    expr1: expr;
    plusMin: "+" | "-";
    expr2: expr;
}
interface IExprShLShRExprExpr extends withType<"ExprShLShRExprExpr"> {
    expr1: expr;
    shLShR: "<<" | ">>";
    expr2: expr;
}
interface IExprAndExprExpr extends withType<"ExprAndExprExpr"> {
    expr1: expr;
    expr2: expr;
}
interface IExprXorExprExpr extends withType<"ExprXorExprExpr"> {
    expr1: expr;
    expr2: expr;
}
interface IExprOrExprExpr extends withType<"ExprOrExprExpr"> {
    expr1: expr;
    expr2: expr;
}
type atom_expr = {
    atom: atom;
    trailers: trailer[];
};
type atom = ILBrYield_exprTestlist_compRBrAtom | ILCBrTestlist_compRCBrAtom | ILCBrDictorsetmakerRCBrAtom | INameAtom | INumberAtom | IStringAtom | IDddotAtom | INoneAtom | ITrueAtom | IFalseAtom;
type Yield_exprTestlist_comp = IYield_expr | ITestlist_comp;
interface ITestlist_comp extends withType<"Testlist_comp"> {
    testlist_comp: testlist_comp;
}
interface ILBrYield_exprTestlist_compRBrAtom extends withType<"LBrYield_exprTestlist_compRBrAtom"> {
    yield_exprTestlist_comp?: Yield_exprTestlist_comp;
}
interface ILCBrTestlist_compRCBrAtom extends withType<"LCBrTestlist_compRCBrAtom"> {
    testlist_comp?: testlist_comp;
}
interface ILCBrDictorsetmakerRCBrAtom extends withType<"LCBrDictorsetmakerRCBrAtom"> {
    dictorsetmaker?: dictorsetmaker;
}
interface INameAtom extends withType<"NameAtom"> {
    name: name;
}
interface INumberAtom extends withType<"NumberAtom"> {
    number: number;
}
interface IStringAtom extends withType<"StringAtom"> {
    strings: string[];
}
interface IDddotAtom extends withType<"DddotAtom"> {
    dddot: "...";
}
interface INoneAtom extends withType<"NoneAtom"> {
    none: "None";
}
interface ITrueAtom extends withType<"TrueAtom"> {
    true: "True";
}
interface IFalseAtom extends withType<"FalseAtom"> {
    false: "False";
}
type name = INameName | IUndscName | IMatchName;
interface INameName extends withType<"NameName"> {
    name: string;
}
interface IUndscName extends withType<"UndscName"> {
    undsc: "_";
}
interface IMatchName extends withType<"MatchName"> {
    match: "match";
}
type testlist_comp = {
    testStar_expr: TestStar_expr;
    comp_forComTestStar_exprCom: Comp_forComTestStar_exprCom;
};
type Comp_forComTestStar_exprCom = IComp_for | IComTestStar_exprCom;
interface IComp_for extends withType<"Comp_for"> {
    comp_for: comp_for;
}
interface IComTestStar_exprCom extends withType<"ComTestStar_exprCom"> {
    comTestStar_exprs: ComTestStar_expr[];
}
type trailer = ILBrArglistRBrTrailer | ILCBrSubscriptlistRCBrTrailer | IDotNameTrailer;
interface ILBrArglistRBrTrailer extends withType<"LBrArglistRBrTrailer"> {
    arglist?: arglist;
}
interface ILCBrSubscriptlistRCBrTrailer extends withType<"LCBrSubscriptlistRCBrTrailer"> {
    subscriptlist: subscriptlist;
}
interface IDotNameTrailer extends withType<"DotNameTrailer"> {
    name: name;
}
type subscriptlist = {
    subscript_: subscript_;
    comSubscript_s: ComSubscript_[];
};
type ComSubscript_ = subscript_;
type subscript_ = ITestSubscript_ | ITestColTestSliceopSubscript_;
interface ITestSubscript_ extends withType<"TestSubscript_"> {
    test: test;
}
interface ITestColTestSliceopSubscript_ extends withType<"TestColTestSliceopSubscript_"> {
    test1?: test;
    test2?: test;
    sliceop?: sliceop;
}
type sliceop = test;
type exprlist = {
    exprStar_expr: ExprStar_expr;
    comExprStar_exprs: ComExprStar_expr[];
};
type ExprStar_expr = IExpr | IStar_expr;
interface IExpr extends withType<"Expr"> {
    expr: expr;
}
type ComExprStar_expr = ExprStar_expr;
type testlist = {
    test: test;
    comTests: ComTest[];
};
type dictorsetmaker = TestColTestPowExprComp_forComTestColTestPowExprComTestStar_exprComp_forComTestStar_exprCom;
type TestColTestPowExprComp_forComTestColTestPowExprComTestStar_exprComp_forComTestStar_exprCom = ITestColTestPowExprComp_forComTestColTestPowExprCom | ITestStar_exprComp_forComTestStar_exprCom;
type TestColTestPowExprComp_forComTestColTestPowExprCom = ITestColTestPowExprComp_forComTestColTestPowExprCom;
type TestColTestPowExpr = ITestColTest | IPowExpr;
interface ITestColTest extends withType<"TestColTest"> {
    test1: test;
    test2: test;
}
interface IPowExpr extends withType<"PowExpr"> {
    expr: expr;
}
type Comp_forComTestColTestPowExprCom = IComp_for | IComTestColTestPowExprCom;
type ComTestColTestPowExpr = TestColTestPowExpr;
interface IComTestColTestPowExprCom extends withType<"ComTestColTestPowExprCom"> {
    comTestColTestPowExprs: ComTestColTestPowExpr[];
}
interface ITestColTestPowExprComp_forComTestColTestPowExprCom extends withType<"TestColTestPowExprComp_forComTestColTestPowExprCom"> {
    testColTestPowExpr: TestColTestPowExpr;
    comp_forComTestColTestPowExprCom: Comp_forComTestColTestPowExprCom;
}
type TestStar_exprComp_forComTestStar_exprCom = ITestStar_exprComp_forComTestStar_exprCom;
interface ITestStar_exprComp_forComTestStar_exprCom extends withType<"TestStar_exprComp_forComTestStar_exprCom"> {
    testStar_expr: TestStar_expr;
    comp_forComTestStar_exprCom: Comp_forComTestStar_exprCom;
}
type classdef = {
    name: name;
    lBrArglistRBr?: LBrArglistRBr;
    block: block;
};
type arglist = {
    argument: argument;
    comArguments: ComArgument[];
};
type ComArgument = argument;
type argument = TestComp_forTestEqTestPowTestMultTest;
type TestComp_forTestEqTestPowTestMultTest = ITestComp_for | ITestEqTest | IPowTest | IMultTest;
interface ITestComp_for extends withType<"TestComp_for"> {
    test: test;
    comp_for?: comp_for;
}
interface ITestEqTest extends withType<"TestEqTest"> {
    test1: test;
    test2: test;
}
interface IPowTest extends withType<"PowTest"> {
    test: test;
}
interface IMultTest extends withType<"MultTest"> {
    test: test;
}
type comp_iter = IComp_forComp_iter | IComp_ifComp_iter;
interface IComp_forComp_iter extends withType<"Comp_forComp_iter"> {
    comp_for: comp_for;
}
interface IComp_ifComp_iter extends withType<"Comp_ifComp_iter"> {
    comp_if: comp_if;
}
type comp_for = {
    exprlist: exprlist;
    or_test: or_test;
    comp_iter?: comp_iter;
};
type comp_if = {
    test_nocond: test_nocond;
    comp_iter?: comp_iter;
};
type encoding_decl = name;
type yield_expr = yield_arg;
type yield_arg = IFromYield_arg | ITestlistYield_arg;
interface IFromYield_arg extends withType<"FromYield_arg"> {
    test: test;
}
interface ITestlistYield_arg extends withType<"TestlistYield_arg"> {
    testlist: testlist;
}
type strings = string[];
