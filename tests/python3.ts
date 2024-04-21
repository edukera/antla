export namespace Python3Parser {
    export type withType<T> = {
        type: T;
    };
    export interface Error extends withType<"IError"> {
        slice: string;
    }
    export type single_input = INl | ISimple_stmts | ICompound_stmtNl | Error;
    export interface INl extends withType<"INl"> {
        nl: "NEWLINE";
    }
    export interface ISimple_stmts extends withType<"ISimple_stmts"> {
        simple_stmts: simple_stmts;
    }
    export interface ICompound_stmtNl extends withType<"ICompound_stmtNl"> {
        compound_stmt: compound_stmt;
    }
    export type file_input = INlStmtStarEof | Error;
    export type file_input1 = INl | IStmt;
    export interface IStmt extends withType<"IStmt"> {
        stmt: stmt;
    }
    export interface INlStmtStarEof extends withType<"INlStmtStarEof"> {
        stmts: file_input1[];
    }
    export type eval_input = ITestlistNlEof | Error;
    export interface ITestlistNlEof extends withType<"ITestlistNlEof"> {
        testlist: testlist;
    }
    export type decorator = Idecorator | Error;
    export interface ILBrArglistRBr extends withType<"ILBrArglistRBr"> {
        arglist?: arglist;
    }
    export interface Idecorator extends withType<"Idecorator"> {
        dotted_name: dotted_name;
        arglist?: ILBrArglistRBr;
    }
    export type decorators = IDecorator | Error;
    export interface IDecorator extends withType<"IDecorator"> {
        decorators: decorator[];
    }
    export type decorated = IDecoratorsClassdefFuncdefAsync_funcdef | Error;
    export type decorated2 = IClassdef | IFuncdef | IAsync_funcdef;
    export interface IClassdef extends withType<"IClassdef"> {
        classdef: classdef;
    }
    export interface IFuncdef extends withType<"IFuncdef"> {
        funcdef: funcdef;
    }
    export interface IAsync_funcdef extends withType<"IAsync_funcdef"> {
        async_funcdef: async_funcdef;
    }
    export interface IDecoratorsClassdefFuncdefAsync_funcdef extends withType<"IDecoratorsClassdefFuncdefAsync_funcdef"> {
        decorators: decorators;
        classdeffuncdefasync_funcdef: decorated2;
    }
    export type async_funcdef = IAsyncFuncdef | Error;
    export interface IAsyncFuncdef extends withType<"IAsyncFuncdef"> {
        funcdef: funcdef;
    }
    export type funcdef = Ifuncdef | Error;
    export interface Ifuncdef extends withType<"Ifuncdef"> {
        name: name;
        parameters: parameters;
        test?: test;
        block: block;
    }
    export type parameters = ILBrTypedargslistRBr | Error;
    export interface ILBrTypedargslistRBr extends withType<"ILBrTypedargslistRBr"> {
        typedargslist?: typedargslist;
    }
    export type typedargslist = Itypedargslist1 | Itypedargslist2 | IPowTfpdefCom | Error;
    export interface IEqTest extends withType<"IEqTest"> {
        test: test;
    }
    export interface IComTfpdefEqTestQmark extends withType<"IComTfpdefEqTestQmark"> {
        tfpdef: tfpdef;
        test?: test;
    }
    export type typedargslist14 = {
        tfpdefebnfebnftfpdef?: typedargslist142;
    };
    export type typedargslist142 = Itypedargslist1421 | IPowTfpdefCom;
    export interface IPowTfpdefCom extends withType<"IPowTfpdefCom"> {
        tfpdef: tfpdef;
    }
    export interface IComPowTfpdefComQmark extends withType<"IComPowTfpdefComQmark"> {
        tfpdef?: tfpdef;
    }
    export interface Itypedargslist1421 extends withType<"Itypedargslist1421"> {
        tfpdef?: tfpdef;
        tfpdefebnfs: IComTfpdefEqTestQmark[];
        ebnf?: IComPowTfpdefComQmark;
    }
    export interface Itypedargslist1 extends withType<"Itypedargslist1"> {
        tfpdef: tfpdef;
        test?: test;
        tfpdefebnfs: IComTfpdefEqTestQmark[];
        ebnf?: typedargslist14;
    }
    export interface Itypedargslist2 extends withType<"Itypedargslist2"> {
        tfpdef?: tfpdef;
        tfpdefebnfs: IComTfpdefEqTestQmark[];
        ebnf?: IComPowTfpdefComQmark;
    }
    export type tfpdef = INameColTestQmark | Error;
    export interface IColTest extends withType<"IColTest"> {
        test: test;
    }
    export interface INameColTestQmark extends withType<"INameColTestQmark"> {
        name: name;
        test?: test;
    }
    export type varargslist = Ivarargslist1 | Ivarargslist2 | IPowVfpdefCom | Error;
    export interface IComVfpdefEqTestQmark extends withType<"IComVfpdefEqTestQmark"> {
        vfpdef: name;
        test?: test;
    }
    export type varargslist14 = {
        vfpdefebnfebnfvfpdefebnf?: varargslist142;
    };
    export type varargslist142 = Ivarargslist1421 | IPowVfpdefComQmark;
    export interface IPowVfpdefCom extends withType<"IPowVfpdefCom"> {
        vfpdef: name;
    }
    export interface IComPowVfpdefComQmark extends withType<"IComPowVfpdefComQmark"> {
        vfpdef?: name;
    }
    export interface Ivarargslist1421 extends withType<"Ivarargslist1421"> {
        vfpdef?: name;
        vfpdefebnfs: IComVfpdefEqTestQmark[];
        ebnf?: IComPowVfpdefComQmark;
    }
    export interface IPowVfpdefComQmark extends withType<"IPowVfpdefComQmark"> {
        vfpdef: name;
        tcom?: ",";
    }
    export interface Ivarargslist1 extends withType<"Ivarargslist1"> {
        vfpdef: name;
        test?: test;
        vfpdefebnfs: IComVfpdefEqTestQmark[];
        ebnf?: varargslist14;
    }
    export interface Ivarargslist2 extends withType<"Ivarargslist2"> {
        vfpdef?: name;
        vfpdefebnfs: IComVfpdefEqTestQmark[];
        ebnf?: IComPowVfpdefComQmark;
    }
    export type stmt = ISimple_stmts | ICompound_stmt | Error;
    export interface ICompound_stmt extends withType<"ICompound_stmt"> {
        compound_stmt: compound_stmt;
    }
    export type simple_stmts = Isimple_stmts | Error;
    export interface Isimple_stmts extends withType<"Isimple_stmts"> {
        simple_stmt: simple_stmt;
        simple_stmts: simple_stmt[];
    }
    export type simple_stmt = IExpr_stmt | IDel_stmt | IPass_stmt | IFlow_stmt | IImport_stmt | IGlobal_stmt | INonlocal_stmt | IAssert_stmt | Error;
    export interface IExpr_stmt extends withType<"IExpr_stmt"> {
        expr_stmt: expr_stmt;
    }
    export interface IDel_stmt extends withType<"IDel_stmt"> {
        del_stmt: del_stmt;
    }
    export interface IPass_stmt extends withType<"IPass_stmt"> {
        pass_stmt: "pass";
    }
    export interface IFlow_stmt extends withType<"IFlow_stmt"> {
        flow_stmt: flow_stmt;
    }
    export interface IImport_stmt extends withType<"IImport_stmt"> {
        import_stmt: import_stmt;
    }
    export interface IGlobal_stmt extends withType<"IGlobal_stmt"> {
        global_stmt: global_stmt;
    }
    export interface INonlocal_stmt extends withType<"INonlocal_stmt"> {
        nonlocal_stmt: nonlocal_stmt;
    }
    export interface IAssert_stmt extends withType<"IAssert_stmt"> {
        assert_stmt: assert_stmt;
    }
    export type expr_stmt = Iexpr_stmt | Error;
    export type expr_stmt2 = IAnnassign | IAugassignYield_exprTestlist | IEqYield_exprTestlist_star_exprStar;
    export type expr_stmt222 = IYield_expr | ITestlist;
    export interface IYield_expr extends withType<"IYield_expr"> {
        yield_expr: yield_expr;
    }
    export interface ITestlist extends withType<"ITestlist"> {
        testlist: testlist;
    }
    export type expr_stmt231 = IYield_expr | ITestlist_star_expr;
    export interface ITestlist_star_expr extends withType<"ITestlist_star_expr"> {
        testlist_star_expr: testlist_star_expr;
    }
    export interface IAnnassign extends withType<"IAnnassign"> {
        annassign: annassign;
    }
    export interface IAugassignYield_exprTestlist extends withType<"IAugassignYield_exprTestlist"> {
        augassign: "+=" | "-=" | "*=" | "@=" | "/=" | "%=" | "&=" | "|=" | "^=" | "<<=" | ">>=" | "**=" | "//=";
        yield_exprtestlist: expr_stmt222;
    }
    export interface IEqYield_exprTestlist_star_exprStar extends withType<"IEqYield_exprTestlist_star_exprStar"> {
        ebnfs: expr_stmt231[];
    }
    export interface Iexpr_stmt extends withType<"Iexpr_stmt"> {
        testlist_star_expr: testlist_star_expr;
        annassignaugassignebnfebnf: expr_stmt2;
    }
    export type annassign = IColTestEqTestQmark | Error;
    export interface IColTestEqTestQmark extends withType<"IColTestEqTestQmark"> {
        test1: test;
        test2?: test;
    }
    export type testlist_star_expr = Itestlist_star_expr | Error;
    export type testlist_star_expr1 = ITest | IStar_expr;
    export interface ITest extends withType<"ITest"> {
        test: test;
    }
    export interface IStar_expr extends withType<"IStar_expr"> {
        star_expr: star_expr;
    }
    export type testlist_star_expr22 = ITest | IStar_expr;
    export interface IComTestStar_expr extends withType<"IComTestStar_expr"> {
        teststar_expr: testlist_star_expr22;
    }
    export interface Itestlist_star_expr extends withType<"Itestlist_star_expr"> {
        teststar_expr: testlist_star_expr1;
        ebnfs: testlist_star_expr22[];
    }
    export type del_stmt = IDelExprlist | Error;
    export interface IDelExprlist extends withType<"IDelExprlist"> {
        exprlist: exprlist;
    }
    export type flow_stmt = IBreak_stmt | IContinue_stmt | IReturn_stmt | IRaise_stmt | IYield_stmt | Error;
    export interface IBreak_stmt extends withType<"IBreak_stmt"> {
        break_stmt: "break";
    }
    export interface IContinue_stmt extends withType<"IContinue_stmt"> {
        continue_stmt: "continue";
    }
    export interface IReturn_stmt extends withType<"IReturn_stmt"> {
        return_stmt: return_stmt;
    }
    export interface IRaise_stmt extends withType<"IRaise_stmt"> {
        raise_stmt: raise_stmt;
    }
    export interface IYield_stmt extends withType<"IYield_stmt"> {
        yield_stmt: yield_expr;
    }
    export type return_stmt = IReturnTestlist | Error;
    export interface IReturnTestlist extends withType<"IReturnTestlist"> {
        testlist?: testlist;
    }
    export type raise_stmt = Iraise_stmt | Error;
    export type raise_stmt2 = {
        test: test;
        from?: test;
    };
    export interface IFromTest extends withType<"IFromTest"> {
        test: test;
    }
    export interface Iraise_stmt extends withType<"Iraise_stmt"> {
        testebnf?: raise_stmt2;
    }
    export type import_stmt = IImport_name | IImport_from | Error;
    export interface IImport_name extends withType<"IImport_name"> {
        import_name: import_name;
    }
    export interface IImport_from extends withType<"IImport_from"> {
        import_from: import_from;
    }
    export type import_name = IImportDotted_as_names | Error;
    export interface IImportDotted_as_names extends withType<"IImportDotted_as_names"> {
        dotted_as_names: dotted_as_names;
    }
    export type import_from = Iimport_from | Error;
    export type import_from2 = IDotDddotStarDotted_name | IDotDddotPlus;
    export interface IDddot extends withType<"IDddot"> {
        dddot: "...";
    }
    export interface IDotDddotStarDotted_name extends withType<"IDotDddotStarDotted_name"> {
        tDotIDddots: ("." | "...")[];
        dotted_name: dotted_name;
    }
    export interface IDotDddotPlus extends withType<"IDotDddotPlus"> {
        tDotIDddots: ("." | "...")[];
    }
    export type import_from4 = IMult | ILBrImport_as_namesRBr | IImport_as_names;
    export interface IMult extends withType<"IMult"> {
        mult: "*";
    }
    export interface ILBrImport_as_namesRBr extends withType<"ILBrImport_as_namesRBr"> {
        import_as_names: import_as_names;
    }
    export interface IImport_as_names extends withType<"IImport_as_names"> {
        import_as_names: import_as_names;
    }
    export interface Iimport_from extends withType<"Iimport_from"> {
        ebnfdotted_nameebnf: import_from2;
        import_as_namesimport_as_names: import_from4;
    }
    export type import_as_name = INameAsNameQmark | Error;
    export interface IAsName extends withType<"IAsName"> {
        name: name;
    }
    export interface INameAsNameQmark extends withType<"INameAsNameQmark"> {
        name: name;
        as?: name;
    }
    export type dotted_as_name = IDotted_nameAsNameQmark | Error;
    export interface IDotted_nameAsNameQmark extends withType<"IDotted_nameAsNameQmark"> {
        dotted_name: dotted_name;
        as?: name;
    }
    export type import_as_names = IImport_as_nameComImport_as_nameStarCom | Error;
    export interface IImport_as_nameComImport_as_nameStarCom extends withType<"IImport_as_nameComImport_as_nameStarCom"> {
        import_as_name: import_as_name;
        import_as_names: import_as_name[];
    }
    export type dotted_as_names = IDotted_as_nameComDotted_as_nameStar | Error;
    export interface IDotted_as_nameComDotted_as_nameStar extends withType<"IDotted_as_nameComDotted_as_nameStar"> {
        dotted_as_name: dotted_as_name;
        dotted_as_names: dotted_as_name[];
    }
    export type dotted_name = INameDotNameStar | Error;
    export interface IDotName extends withType<"IDotName"> {
        name: name;
    }
    export interface INameDotNameStar extends withType<"INameDotNameStar"> {
        name: name;
        names: name[];
    }
    export type global_stmt = IGlobalNameComNameStar | Error;
    export interface IComName extends withType<"IComName"> {
        name: name;
    }
    export interface IGlobalNameComNameStar extends withType<"IGlobalNameComNameStar"> {
        name: name;
        names: name[];
    }
    export type nonlocal_stmt = INonlocalNameComNameStar | Error;
    export interface INonlocalNameComNameStar extends withType<"INonlocalNameComNameStar"> {
        name: name;
        names: name[];
    }
    export type assert_stmt = IAssertTestComTestQmark | Error;
    export interface IComTest extends withType<"IComTest"> {
        test: test;
    }
    export interface IAssertTestComTestQmark extends withType<"IAssertTestComTestQmark"> {
        test1: test;
        test2?: test;
    }
    export type compound_stmt = IIf_stmt | IWhile_stmt | IFor_stmt | ITry_stmt | IWith_stmt | IFuncdef | IClassdef | IDecorated | IAsync_stmt | IMatch_stmt | Error;
    export interface IIf_stmt extends withType<"IIf_stmt"> {
        if_stmt: if_stmt;
    }
    export interface IWhile_stmt extends withType<"IWhile_stmt"> {
        while_stmt: while_stmt;
    }
    export interface IFor_stmt extends withType<"IFor_stmt"> {
        for_stmt: for_stmt;
    }
    export interface ITry_stmt extends withType<"ITry_stmt"> {
        try_stmt: try_stmt;
    }
    export interface IWith_stmt extends withType<"IWith_stmt"> {
        with_stmt: with_stmt;
    }
    export interface IDecorated extends withType<"IDecorated"> {
        decorated: decorated;
    }
    export interface IAsync_stmt extends withType<"IAsync_stmt"> {
        async_stmt: async_stmt;
    }
    export interface IMatch_stmt extends withType<"IMatch_stmt"> {
        match_stmt: match_stmt;
    }
    export type async_stmt = IAsyncFuncdefWith_stmtFor_stmt | Error;
    export type async_stmt2 = IFuncdef | IWith_stmt | IFor_stmt;
    export interface IAsyncFuncdefWith_stmtFor_stmt extends withType<"IAsyncFuncdefWith_stmtFor_stmt"> {
        funcdefwith_stmtfor_stmt: async_stmt2;
    }
    export type if_stmt = Iif_stmt | Error;
    export type if_stmt5 = {
        test: test;
        block: block;
    };
    export interface IElseColBlock extends withType<"IElseColBlock"> {
        block: block;
    }
    export interface Iif_stmt extends withType<"Iif_stmt"> {
        test: test;
        block: block;
        elifs: if_stmt5[];
        else?: block;
    }
    export type while_stmt = Iwhile_stmt | Error;
    export interface Iwhile_stmt extends withType<"Iwhile_stmt"> {
        test: test;
        block: block;
        else?: block;
    }
    export type for_stmt = Ifor_stmt | Error;
    export interface Ifor_stmt extends withType<"Ifor_stmt"> {
        exprlist: exprlist;
        testlist: testlist;
        block: block;
        else?: block;
    }
    export type try_stmt = Itry_stmt | Error;
    export type try_stmt4 = Itry_stmt41 | IFinallyColBlock;
    export type try_stmt411 = {
        except_clause: except_clause;
        block: block;
    };
    export interface IFinallyColBlock extends withType<"IFinallyColBlock"> {
        block: block;
    }
    export interface Itry_stmt41 extends withType<"Itry_stmt41"> {
        except_clauseblocks: try_stmt411[];
        else?: block;
        finally?: block;
    }
    export interface Itry_stmt extends withType<"Itry_stmt"> {
        block: block;
        finally: try_stmt4;
    }
    export type with_stmt = Iwith_stmt | Error;
    export interface Iwith_stmt extends withType<"Iwith_stmt"> {
        with_item: with_item;
        with_items: with_item[];
        block: block;
    }
    export type with_item = ITestAsExprQmark | Error;
    export interface ITestAsExprQmark extends withType<"ITestAsExprQmark"> {
        test: test;
        as?: expr;
    }
    export type except_clause = Iexcept_clause | Error;
    export type except_clause2 = {
        test: test;
        as?: name;
    };
    export interface Iexcept_clause extends withType<"Iexcept_clause"> {
        testebnf?: except_clause2;
    }
    export type block = ISimple_stmts | INlIdtStmtDdt | Error;
    export interface INlIdtStmtDdt extends withType<"INlIdtStmtDdt"> {
        stmts: stmt[];
    }
    export type match_stmt = Imatch_stmt | Error;
    export interface Imatch_stmt extends withType<"Imatch_stmt"> {
        subject_expr: subject_expr;
        case_blocks: case_block[];
    }
    export type subject_expr = IStar_named_expressionComStar_named_expressions | ITest | Error;
    export interface IStar_named_expressionComStar_named_expressions extends withType<"IStar_named_expressionComStar_named_expressions"> {
        star_named_expression: star_named_expression;
        star_named_expressions?: star_named_expressions;
    }
    export type star_named_expressions = IComStar_named_expressionCom | Error;
    export interface IComStar_named_expressionCom extends withType<"IComStar_named_expressionCom"> {
        star_named_expressions: star_named_expression[];
    }
    export type star_named_expression = IMultExpr | ITest | Error;
    export interface IMultExpr extends withType<"IMultExpr"> {
        expr: expr;
    }
    export type case_block = ICasePatternsGuardColBlock | Error;
    export interface ICasePatternsGuardColBlock extends withType<"ICasePatternsGuardColBlock"> {
        patterns: patterns;
        guard?: guard;
        block: block;
    }
    export type guard = IIfTest | Error;
    export interface IIfTest extends withType<"IIfTest"> {
        test: test;
    }
    export type patterns = IOpen_sequence_pattern | IPattern | Error;
    export interface IOpen_sequence_pattern extends withType<"IOpen_sequence_pattern"> {
        open_sequence_pattern: open_sequence_pattern;
    }
    export interface IPattern extends withType<"IPattern"> {
        pattern: pattern;
    }
    export type pattern = IAs_pattern | IOr_pattern | Error;
    export interface IAs_pattern extends withType<"IAs_pattern"> {
        as_pattern: as_pattern;
    }
    export interface IOr_pattern extends withType<"IOr_pattern"> {
        or_pattern: or_pattern;
    }
    export type as_pattern = IOr_patternAsPattern_capture_target | Error;
    export interface IOr_patternAsPattern_capture_target extends withType<"IOr_patternAsPattern_capture_target"> {
        or_pattern: or_pattern;
        pattern_capture_target: pattern_capture_target;
    }
    export type or_pattern = IClosed_patternOrClosed_patternStar | Error;
    export interface IClosed_patternOrClosed_patternStar extends withType<"IClosed_patternOrClosed_patternStar"> {
        closed_pattern: closed_pattern;
        closed_patterns: closed_pattern[];
    }
    export type closed_pattern = ILiteral_pattern | ICapture_pattern | IWildcard_pattern | IValue_pattern | IGroup_pattern | ISequence_pattern | IMapping_pattern | IClass_pattern | Error;
    export interface ILiteral_pattern extends withType<"ILiteral_pattern"> {
        literal_pattern: literal_pattern;
    }
    export interface ICapture_pattern extends withType<"ICapture_pattern"> {
        capture_pattern: pattern_capture_target;
    }
    export interface IWildcard_pattern extends withType<"IWildcard_pattern"> {
        wildcard_pattern: "_";
    }
    export interface IValue_pattern extends withType<"IValue_pattern"> {
        value_pattern: value_pattern;
    }
    export interface IGroup_pattern extends withType<"IGroup_pattern"> {
        group_pattern: group_pattern;
    }
    export interface ISequence_pattern extends withType<"ISequence_pattern"> {
        sequence_pattern: sequence_pattern;
    }
    export interface IMapping_pattern extends withType<"IMapping_pattern"> {
        mapping_pattern: mapping_pattern;
    }
    export interface IClass_pattern extends withType<"IClass_pattern"> {
        class_pattern: class_pattern;
    }
    export type literal_pattern = ISigned_number | IComplex_number | IStrings | INone | ITrue | IFalse | Error;
    export interface ISigned_number extends withType<"ISigned_number"> {
        signed_number: signed_number;
    }
    export interface IComplex_number extends withType<"IComplex_number"> {
        complex_number: complex_number;
    }
    export interface IStrings extends withType<"IStrings"> {
        strings: strings;
    }
    export interface INone extends withType<"INone"> {
        none: "None";
    }
    export interface ITrue extends withType<"ITrue"> {
        true: "True";
    }
    export interface IFalse extends withType<"IFalse"> {
        false: "False";
    }
    export type literal_expr = ISigned_number | IComplex_number | IStrings | INone | ITrue | IFalse | Error;
    export type complex_number = ISigned_real_numberPlusImaginary_number | ISigned_real_numberMinImaginary_number | Error;
    export interface ISigned_real_numberPlusImaginary_number extends withType<"ISigned_real_numberPlusImaginary_number"> {
        signed_real_number: signed_real_number;
        imaginary_number: number;
    }
    export interface ISigned_real_numberMinImaginary_number extends withType<"ISigned_real_numberMinImaginary_number"> {
        signed_real_number: signed_real_number;
        imaginary_number: number;
    }
    export type signed_number = INumber | IMinNumber | Error;
    export interface INumber extends withType<"INumber"> {
        number: number;
    }
    export interface IMinNumber extends withType<"IMinNumber"> {
        number: number;
    }
    export type signed_real_number = IReal_number | IMinReal_number | Error;
    export interface IReal_number extends withType<"IReal_number"> {
        real_number: number;
    }
    export interface IMinReal_number extends withType<"IMinReal_number"> {
        real_number: number;
    }
    export type pattern_capture_target = IName | Error;
    export interface IName extends withType<"IName"> {
        name: name;
    }
    export type value_pattern = IAttr | Error;
    export interface IAttr extends withType<"IAttr"> {
        attr: attr;
    }
    export type attr = INameDotNamePlus | Error;
    export interface INameDotNamePlus extends withType<"INameDotNamePlus"> {
        name: name;
        names: name[];
    }
    export type name_or_attr = IAttr | IName | Error;
    export type group_pattern = ILBrPatternRBr | Error;
    export interface ILBrPatternRBr extends withType<"ILBrPatternRBr"> {
        pattern: pattern;
    }
    export type sequence_pattern = ILCBrMaybe_sequence_patternRCBr | ILBrOpen_sequence_patternRBr | Error;
    export interface ILCBrMaybe_sequence_patternRCBr extends withType<"ILCBrMaybe_sequence_patternRCBr"> {
        maybe_sequence_pattern?: maybe_sequence_pattern;
    }
    export interface ILBrOpen_sequence_patternRBr extends withType<"ILBrOpen_sequence_patternRBr"> {
        open_sequence_pattern?: open_sequence_pattern;
    }
    export type open_sequence_pattern = IMaybe_star_patternComMaybe_sequence_pattern | Error;
    export interface IMaybe_star_patternComMaybe_sequence_pattern extends withType<"IMaybe_star_patternComMaybe_sequence_pattern"> {
        maybe_star_pattern: maybe_star_pattern;
        maybe_sequence_pattern?: maybe_sequence_pattern;
    }
    export type maybe_sequence_pattern = IMaybe_star_patternComMaybe_star_patternStarCom | Error;
    export interface IMaybe_star_patternComMaybe_star_patternStarCom extends withType<"IMaybe_star_patternComMaybe_star_patternStarCom"> {
        maybe_star_pattern: maybe_star_pattern;
        maybe_star_patterns: maybe_star_pattern[];
    }
    export type maybe_star_pattern = IStar_pattern | IPattern | Error;
    export interface IStar_pattern extends withType<"IStar_pattern"> {
        star_pattern: star_pattern;
    }
    export type star_pattern = IMultPattern_capture_target | IMultWildcard_pattern | Error;
    export interface IMultPattern_capture_target extends withType<"IMultPattern_capture_target"> {
        pattern_capture_target: pattern_capture_target;
    }
    export interface IMultWildcard_pattern extends withType<"IMultWildcard_pattern"> {
        wildcard_pattern: "_";
    }
    export type mapping_pattern = ILCBrRCBr | ILCBrDouble_star_patternComRCBr | Imapping_pattern3 | ILCBrItems_patternComRCBr | Error;
    export interface ILCBrRCBr extends withType<"ILCBrRCBr"> {
        lCBrrCBr: "{ }";
    }
    export interface ILCBrDouble_star_patternComRCBr extends withType<"ILCBrDouble_star_patternComRCBr"> {
        double_star_pattern: double_star_pattern;
    }
    export interface Imapping_pattern3 extends withType<"Imapping_pattern3"> {
        items_pattern: items_pattern;
        double_star_pattern: double_star_pattern;
    }
    export interface ILCBrItems_patternComRCBr extends withType<"ILCBrItems_patternComRCBr"> {
        items_pattern: items_pattern;
    }
    export type items_pattern = IKey_value_patternComKey_value_patternStar | Error;
    export interface IKey_value_patternComKey_value_patternStar extends withType<"IKey_value_patternComKey_value_patternStar"> {
        key_value_pattern: key_value_pattern;
        key_value_patterns: key_value_pattern[];
    }
    export type key_value_pattern = ILiteral_exprAttrColPattern | Error;
    export type key_value_pattern1 = ILiteral_expr | IAttr;
    export interface ILiteral_expr extends withType<"ILiteral_expr"> {
        literal_expr: literal_expr;
    }
    export interface ILiteral_exprAttrColPattern extends withType<"ILiteral_exprAttrColPattern"> {
        literal_exprattr: key_value_pattern1;
        pattern: pattern;
    }
    export type double_star_pattern = IPowPattern_capture_target | Error;
    export interface IPowPattern_capture_target extends withType<"IPowPattern_capture_target"> {
        pattern_capture_target: pattern_capture_target;
    }
    export type class_pattern = IName_or_attrLBrRBr | IName_or_attrLBrPositional_patternsComRBr | IName_or_attrLBrKeyword_patternsComRBr | Iclass_pattern4 | Error;
    export interface IName_or_attrLBrRBr extends withType<"IName_or_attrLBrRBr"> {
        name_or_attr: name_or_attr;
    }
    export interface IName_or_attrLBrPositional_patternsComRBr extends withType<"IName_or_attrLBrPositional_patternsComRBr"> {
        name_or_attr: name_or_attr;
        positional_patterns: positional_patterns;
    }
    export interface IName_or_attrLBrKeyword_patternsComRBr extends withType<"IName_or_attrLBrKeyword_patternsComRBr"> {
        name_or_attr: name_or_attr;
        keyword_patterns: keyword_patterns;
    }
    export interface Iclass_pattern4 extends withType<"Iclass_pattern4"> {
        name_or_attr: name_or_attr;
        positional_patterns: positional_patterns;
        keyword_patterns: keyword_patterns;
    }
    export type positional_patterns = IPatternComPatternStar | Error;
    export interface IPatternComPatternStar extends withType<"IPatternComPatternStar"> {
        pattern: pattern;
        patterns: pattern[];
    }
    export type keyword_patterns = IKeyword_patternComKeyword_patternStar | Error;
    export interface IKeyword_patternComKeyword_patternStar extends withType<"IKeyword_patternComKeyword_patternStar"> {
        keyword_pattern: keyword_pattern;
        keyword_patterns: keyword_pattern[];
    }
    export type keyword_pattern = INameEqPattern | Error;
    export interface INameEqPattern extends withType<"INameEqPattern"> {
        name: name;
        pattern: pattern;
    }
    export type test = Itest1 | ILambdef | Error;
    export type test12 = {
        or_test: or_test;
        test: test;
    };
    export interface Itest1 extends withType<"Itest1"> {
        or_test: or_test;
        ifElse?: test12;
    }
    export interface ILambdef extends withType<"ILambdef"> {
        lambdef: lambdef;
    }
    export type test_nocond = IOr_test | ILambdef_nocond | Error;
    export interface IOr_test extends withType<"IOr_test"> {
        or_test: or_test;
    }
    export interface ILambdef_nocond extends withType<"ILambdef_nocond"> {
        lambdef_nocond: lambdef_nocond;
    }
    export type lambdef = ILambdaVarargslistColTest | Error;
    export interface ILambdaVarargslistColTest extends withType<"ILambdaVarargslistColTest"> {
        varargslist?: varargslist;
        test: test;
    }
    export type lambdef_nocond = ILambdaVarargslistColTest_nocond | Error;
    export interface ILambdaVarargslistColTest_nocond extends withType<"ILambdaVarargslistColTest_nocond"> {
        varargslist?: varargslist;
        test_nocond: test_nocond;
    }
    export type or_test = IAnd_testOrAnd_testStar | Error;
    export interface IAnd_testOrAnd_testStar extends withType<"IAnd_testOrAnd_testStar"> {
        and_test: and_test;
        ors: and_test[];
    }
    export type and_test = INot_testAndNot_testStar | Error;
    export interface INot_testAndNot_testStar extends withType<"INot_testAndNot_testStar"> {
        not_test: not_test;
        ands: not_test[];
    }
    export type not_test = INotNot_test | IComparison | Error;
    export interface INotNot_test extends withType<"INotNot_test"> {
        not_test: not_test;
    }
    export interface IComparison extends withType<"IComparison"> {
        comparison: comparison;
    }
    export type comparison = IExprComp_opExprStar | Error;
    export type comparison2 = {
        comp_op: "<" | ">" | "==" | ">=" | "<=" | "<>" | "<>" | "in" | "not in" | "is" | "is not";
        expr: expr;
    };
    export interface IExprComp_opExprStar extends withType<"IExprComp_opExprStar"> {
        expr: expr;
        comp_opexprs: comparison2[];
    }
    export type star_expr = IMultExpr | Error;
    export type expr = IAtom_expr | IExprPowExpr | IPlusMinTldPlusExpr | Iexpr4 | IExprPlusMinExpr | IExprShLShRExpr | IExprAndExpr | IExprXorExpr | IExprOrExpr | Error;
    export interface IAtom_expr extends withType<"IAtom_expr"> {
        atom_expr: atom_expr;
    }
    export interface IExprPowExpr extends withType<"IExprPowExpr"> {
        expr1: expr;
        expr2: expr;
    }
    export interface IPlusMinTldPlusExpr extends withType<"IPlusMinTldPlusExpr"> {
        tPlusIMinITlds: ("+" | "-" | "~")[];
        expr: expr;
    }
    export interface Iexpr4 extends withType<"Iexpr4"> {
        expr1: expr;
        tMultIAtIDivIModIDdiv: "*" | "@" | "/" | "%" | "//";
        expr2: expr;
    }
    export interface IExprPlusMinExpr extends withType<"IExprPlusMinExpr"> {
        expr1: expr;
        tPlusIMin: "+" | "-";
        expr2: expr;
    }
    export interface IExprShLShRExpr extends withType<"IExprShLShRExpr"> {
        expr1: expr;
        tShLIShR: "<<" | ">>";
        expr2: expr;
    }
    export interface IExprAndExpr extends withType<"IExprAndExpr"> {
        expr1: expr;
        expr2: expr;
    }
    export interface IExprXorExpr extends withType<"IExprXorExpr"> {
        expr1: expr;
        expr2: expr;
    }
    export interface IExprOrExpr extends withType<"IExprOrExpr"> {
        expr1: expr;
        expr2: expr;
    }
    export type atom_expr = IAwaitAtomTrailer | Error;
    export interface IAwaitAtomTrailer extends withType<"IAwaitAtomTrailer"> {
        atom: atom;
        trailers: trailer[];
    }
    export type atom = ILBrYield_exprTestlist_compQmarkRBr | ILCBrTestlist_compRCBr | ILCBrDictorsetmakerRCBr | IName | INumber | IString | IDddot | INone | ITrue | IFalse | Error;
    export type atom12 = IYield_expr | ITestlist_comp;
    export interface ITestlist_comp extends withType<"ITestlist_comp"> {
        testlist_comp: testlist_comp;
    }
    export interface ILBrYield_exprTestlist_compQmarkRBr extends withType<"ILBrYield_exprTestlist_compQmarkRBr"> {
        yield_exprtestlist_comp?: atom12;
    }
    export interface ILCBrTestlist_compRCBr extends withType<"ILCBrTestlist_compRCBr"> {
        testlist_comp?: testlist_comp;
    }
    export interface ILCBrDictorsetmakerRCBr extends withType<"ILCBrDictorsetmakerRCBr"> {
        dictorsetmaker?: dictorsetmaker;
    }
    export interface IString extends withType<"IString"> {
        strings: string[];
    }
    export type name = IName | IUndsc | IMatch | Error;
    export interface IUndsc extends withType<"IUndsc"> {
        undsc: "_";
    }
    export interface IMatch extends withType<"IMatch"> {
        match: "match";
    }
    export type testlist_comp = Itestlist_comp | Error;
    export type testlist_comp1 = ITest | IStar_expr;
    export type testlist_comp2 = IComp_for | IComTestStar_exprStarCom;
    export type testlist_comp2212 = ITest | IStar_expr;
    export interface IComp_for extends withType<"IComp_for"> {
        comp_for: comp_for;
    }
    export interface IComTestStar_exprStarCom extends withType<"IComTestStar_exprStarCom"> {
        ebnfs: testlist_star_expr22[];
    }
    export interface Itestlist_comp extends withType<"Itestlist_comp"> {
        teststar_expr: testlist_comp1;
        comp_forebnf: testlist_comp2;
    }
    export type trailer = ILBrArglistRBr | ILCBrSubscriptlistRCBr | IDotName | Error;
    export interface ILCBrSubscriptlistRCBr extends withType<"ILCBrSubscriptlistRCBr"> {
        subscriptlist: subscriptlist;
    }
    export type subscriptlist = ISubscript_ComSubscript_StarCom | Error;
    export interface ISubscript_ComSubscript_StarCom extends withType<"ISubscript_ComSubscript_StarCom"> {
        subscript_: subscript_;
        subscript_s: subscript_[];
    }
    export type subscript_ = ITest | ITestColTestSliceop | Error;
    export interface ITestColTestSliceop extends withType<"ITestColTestSliceop"> {
        test1?: test;
        test2?: test;
        sliceop?: sliceop;
    }
    export type sliceop = IColTest | Error;
    export type exprlist = Iexprlist | Error;
    export type exprlist1 = IExpr | IStar_expr;
    export interface IExpr extends withType<"IExpr"> {
        expr: expr;
    }
    export type exprlist2 = IExpr | IStar_expr;
    export interface Iexprlist extends withType<"Iexprlist"> {
        exprstar_expr: exprlist1;
        ebnfs: exprlist2[];
    }
    export type testlist = ITestComTestStarCom | Error;
    export interface ITestComTestStarCom extends withType<"ITestComTestStarCom"> {
        test: test;
        tests: test[];
    }
    export type dictorsetmaker = Idictorsetmaker1 | Idictorsetmaker2 | Error;
    export type dictorsetmaker111 = ITestColTest | IPowExpr;
    export interface ITestColTest extends withType<"ITestColTest"> {
        test1: test;
        test2: test;
    }
    export interface IPowExpr extends withType<"IPowExpr"> {
        expr: expr;
    }
    export type dictorsetmaker112 = IComp_for | Idictorsetmaker1122;
    export type dictorsetmaker11221 = ITestColTest | IPowExpr;
    export interface Idictorsetmaker1122 extends withType<"Idictorsetmaker1122"> {
        ebnfs: dictorsetmaker11221[];
    }
    export type dictorsetmaker211 = ITest | IStar_expr;
    export type dictorsetmaker212 = IComp_for | IComTestStar_exprStarCom;
    export type dictorsetmaker212212 = ITest | IStar_expr;
    export interface Idictorsetmaker1 extends withType<"Idictorsetmaker1"> {
        testtestexpr: dictorsetmaker111;
        comp_forebnf: dictorsetmaker112;
    }
    export interface Idictorsetmaker2 extends withType<"Idictorsetmaker2"> {
        teststar_expr: dictorsetmaker211;
        comp_forebnf: dictorsetmaker212;
    }
    export type classdef = Iclassdef | Error;
    export interface Iclassdef extends withType<"Iclassdef"> {
        name: name;
        arglist?: ILBrArglistRBr;
        block: block;
    }
    export type arglist = IArgumentComArgumentStarCom | Error;
    export interface IArgumentComArgumentStarCom extends withType<"IArgumentComArgumentStarCom"> {
        argument: argument;
        arguments: argument[];
    }
    export type argument = ITestComp_for | ITestEqTest | IPowTest | IMultTest | Error;
    export interface ITestComp_for extends withType<"ITestComp_for"> {
        test: test;
        comp_for?: comp_for;
    }
    export interface ITestEqTest extends withType<"ITestEqTest"> {
        test1: test;
        test2: test;
    }
    export interface IPowTest extends withType<"IPowTest"> {
        test: test;
    }
    export interface IMultTest extends withType<"IMultTest"> {
        test: test;
    }
    export type comp_iter = IComp_for | IComp_if | Error;
    export interface IComp_if extends withType<"IComp_if"> {
        comp_if: comp_if;
    }
    export type comp_for = Icomp_for | Error;
    export interface Icomp_for extends withType<"Icomp_for"> {
        exprlist: exprlist;
        or_test: or_test;
        comp_iter?: comp_iter;
    }
    export type comp_if = IIfTest_nocondComp_iter | Error;
    export interface IIfTest_nocondComp_iter extends withType<"IIfTest_nocondComp_iter"> {
        test_nocond: test_nocond;
        comp_iter?: comp_iter;
    }
    export type yield_expr = IYieldYield_arg | Error;
    export interface IYieldYield_arg extends withType<"IYieldYield_arg"> {
        yield_arg?: yield_arg;
    }
    export type yield_arg = IFromTest | ITestlist | Error;
    export type strings = IString | Error;
}