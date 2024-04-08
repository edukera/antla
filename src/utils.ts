/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */
import { decl } from "./types";

export const pipeline = <T>(...functions: Function[]) => (value: T) =>
functions.reduce((currentValue, currentFunction) => currentFunction(currentValue), value);

export function capitalize(string: string): string {
  if (string.length === 0) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function minimize(string: string): string {
  if (string.length === 0) return "";
  return string.charAt(0).toLowerCase() + string.slice(1);
}

type withType<T> = {
  type: T;
};
type single_input = nlSingle_input | simple_stmtsSingle_input | compound_stmtNlSingle_input;
interface nlSingle_input extends withType<"nlSingle_input"> {
  nl: "NEWLINE";
}
interface simple_stmtsSingle_input extends withType<"simple_stmtsSingle_input"> {
  simple_stmts: simple_stmts;
}
interface compound_stmtNlSingle_input extends withType<"compound_stmtNlSingle_input"> {
  compound_stmt: compound_stmt;
}
type file_input = {
  NlStmts: NlStmt[];
};
type NlStmt = nl | stmt;
interface nl extends withType<"nl"> {
  nl: "NEWLINE";
}
interface stmt extends withType<"stmt"> {
  stmt: stmt;
}
type eval_input = {
  testlist: testlist;
};
type decorator = {
  dotted_name: dotted_name;
  LBrArglistRBr: LBrArglistRBr;
};
type LBrArglistRBr = {
  arglist: arglist;
};
type decorators = {
  decorators: decorator[];
};
type decorated = {
  decorators: decorators;
  ClassdefFuncdefAsync_funcdef: ClassdefFuncdefAsync_funcdef;
};
type ClassdefFuncdefAsync_funcdef = classdef | funcdef | async_funcdef;
interface classdef extends withType<"classdef"> {
  classdef: classdef;
}
interface funcdef extends withType<"funcdef"> {
  funcdef: funcdef;
}
interface async_funcdef extends withType<"async_funcdef"> {
  async_funcdef: async_funcdef;
}
interface asyncAsync_funcdef extends withType<"asyncAsync_funcdef"> {
  funcdef: funcdef;
}
type ArrTest = {
  test: test;
};
interface defFuncdef extends withType<"defFuncdef"> {
  name: name;
  parameters: parameters;
  ArrTest: ArrTest;
  block: block;
}
type parameters = {
  typedargslist: typedargslist;
};
type typedargslist = {
  TfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom: TfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom;
};
type TfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom = tfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom | multTfpdefComTfpdefEqTestComPowTfpdefCom | PowTfpdefCom;
type EqTest = {
  test: test;
};
type ComTfpdefEqTest = {
  tfpdef: tfpdef;
  EqTest: EqTest;
};
type ComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom = {
  MultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom: MultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom;
};
type MultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom = multTfpdefComTfpdefEqTestComPowTfpdefCom | PowTfpdefCom;
type ComPowTfpdefCom = {
  PowTfpdefCom: PowTfpdefCom;
};
type PowTfpdefCom = {
  tfpdef: tfpdef;
};
interface multTfpdefComTfpdefEqTestComPowTfpdefCom extends withType<"multTfpdefComTfpdefEqTestComPowTfpdefCom"> {
  tfpdef: tfpdef;
  ComTfpdefEqTests: ComTfpdefEqTest[];
  ComPowTfpdefCom: ComPowTfpdefCom;
}
interface tfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom extends withType<"tfpdefEqTestComTfpdefEqTestComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom"> {
  tfpdef: tfpdef;
  EqTest: EqTest;
  ComTfpdefEqTests: ComTfpdefEqTest[];
  ComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom: ComMultTfpdefComTfpdefEqTestComPowTfpdefComPowTfpdefCom;
}
type tfpdef = {
  name: name;
  ColTest: ColTest;
};
type ColTest = {
  test: test;
};
type varargslist = {
  VfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom: VfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom;
};
type VfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom = vfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom | multVfpdefComVfpdefEqTestComPowVfpdefCom | PowVfpdefCom;
type ComVfpdefEqTest = {
  vfpdef: vfpdef;
  EqTest: EqTest;
};
type ComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom = {
  MultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom: MultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom;
};
type MultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom = multVfpdefComVfpdefEqTestComPowVfpdefCom | PowVfpdefCom;
type ComPowVfpdefCom = {
  PowVfpdefCom: PowVfpdefCom;
};
type PowVfpdefCom = {
  vfpdef: vfpdef;
};
type Com = {
  com: ",";
};
interface multVfpdefComVfpdefEqTestComPowVfpdefCom extends withType<"multVfpdefComVfpdefEqTestComPowVfpdefCom"> {
  vfpdef: vfpdef;
  ComVfpdefEqTests: ComVfpdefEqTest[];
  ComPowVfpdefCom: ComPowVfpdefCom;
}
interface vfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom extends withType<"vfpdefEqTestComVfpdefEqTestComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom"> {
  vfpdef: vfpdef;
  EqTest: EqTest;
  ComVfpdefEqTests: ComVfpdefEqTest[];
  ComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom: ComMultVfpdefComVfpdefEqTestComPowVfpdefComPowVfpdefCom;
}
type vfpdef = {
  name: name;
};
interface simple_stmtsStmt extends withType<"simple_stmtsStmt"> {
  simple_stmts: simple_stmts;
}
interface compound_stmtStmt extends withType<"compound_stmtStmt"> {
  compound_stmt: compound_stmt;
}
type simple_stmts = {
  simple_stmt: simple_stmt;
  ScolSimple_stmts: ScolSimple_stmt[];
};
type ScolSimple_stmt = {
  simple_stmt: simple_stmt;
};
type simple_stmt = {
  Expr_stmtDel_stmtPass_stmtFlow_stmtImport_stmtGlobal_stmtNonlocal_stmtAssert_stmt: Expr_stmtDel_stmtPass_stmtFlow_stmtImport_stmtGlobal_stmtNonlocal_stmtAssert_stmt;
};
type Expr_stmtDel_stmtPass_stmtFlow_stmtImport_stmtGlobal_stmtNonlocal_stmtAssert_stmt = expr_stmt | del_stmt | pass_stmt | flow_stmt | import_stmt | global_stmt | nonlocal_stmt | assert_stmt;
interface expr_stmt extends withType<"expr_stmt"> {
  expr_stmt: expr_stmt;
}
interface del_stmt extends withType<"del_stmt"> {
  del_stmt: del_stmt;
}
interface pass_stmt extends withType<"pass_stmt"> {
  pass_stmt: pass_stmt;
}
interface flow_stmt extends withType<"flow_stmt"> {
  flow_stmt: flow_stmt;
}
interface import_stmt extends withType<"import_stmt"> {
  import_stmt: import_stmt;
}
interface global_stmt extends withType<"global_stmt"> {
  global_stmt: global_stmt;
}
interface nonlocal_stmt extends withType<"nonlocal_stmt"> {
  nonlocal_stmt: nonlocal_stmt;
}
interface assert_stmt extends withType<"assert_stmt"> {
  assert_stmt: assert_stmt;
}
type AnnassignAugassignYield_exprTestlistEqYield_exprTestlist_star_expr = annassign | augassignYield_exprTestlist | EqYield_exprTestlist_star_expr;
type Yield_exprTestlist = yield_expr | testlist;
interface yield_expr extends withType<"yield_expr"> {
  yield_expr: yield_expr;
}
interface testlist extends withType<"testlist"> {
  testlist: testlist;
}
type EqYield_exprTestlist_star_expr = {
  Yield_exprTestlist_star_expr: Yield_exprTestlist_star_expr;
};
type Yield_exprTestlist_star_expr = yield_expr | testlist_star_expr;
interface testlist_star_expr extends withType<"testlist_star_expr"> {
  testlist_star_expr: testlist_star_expr;
}
interface annassign extends withType<"annassign"> {
  annassign: annassign;
}
interface augassignYield_exprTestlist extends withType<"augassignYield_exprTestlist"> {
  augassign: augassign;
  Yield_exprTestlist: Yield_exprTestlist;
}
interface testlist_star_exprAnnassignAugassignYield_exprTestlistEqYield_exprTestlist_star_exprExpr_stmt extends withType<"testlist_star_exprAnnassignAugassignYield_exprTestlistEqYield_exprTestlist_star_exprExpr_stmt"> {
  testlist_star_expr: testlist_star_expr;
  AnnassignAugassignYield_exprTestlistEqYield_exprTestlist_star_expr: AnnassignAugassignYield_exprTestlistEqYield_exprTestlist_star_expr;
}
interface colTestEqTestAnnassign extends withType<"colTestEqTestAnnassign"> {
  test: test;
  EqTest: EqTest;
}
type TestStar_expr = test | star_expr;
interface test extends withType<"test"> {
  test: test;
}
interface star_expr extends withType<"star_expr"> {
  star_expr: star_expr;
}
type ComTestStar_expr = {
  TestStar_expr: TestStar_expr;
};
interface testStar_exprComTestStar_exprComTestlist_star_expr extends withType<"testStar_exprComTestStar_exprComTestlist_star_expr"> {
  TestStar_expr: TestStar_expr;
  ComTestStar_exprs: ComTestStar_expr[];
}
type augassign = {
  AplAminAmulAatAdivAperAepApipApowAshLAshRAppowAddiv: AplAminAmulAatAdivAperAepApipApowAshLAshRAppowAddiv;
};
type AplAminAmulAatAdivAperAepApipApowAshLAshRAppowAddiv = apl | amin | amul | aat | adiv | aper | aep | apip | apow | ashL | ashR | appow | addiv;
interface apl extends withType<"apl"> {
  apl: "+=";
}
interface amin extends withType<"amin"> {
  amin: "-=";
}
interface amul extends withType<"amul"> {
  amul: "*=";
}
interface aat extends withType<"aat"> {
  aat: "@=";
}
interface adiv extends withType<"adiv"> {
  adiv: "/=";
}
interface aper extends withType<"aper"> {
  aper: "%=";
}
interface aep extends withType<"aep"> {
  aep: "&=";
}
interface apip extends withType<"apip"> {
  apip: "|=";
}
interface apow extends withType<"apow"> {
  apow: "^=";
}
interface ashL extends withType<"ashL"> {
  ashL: "<<=";
}
interface ashR extends withType<"ashR"> {
  ashR: ">>=";
}
interface appow extends withType<"appow"> {
  appow: "**=";
}
interface addiv extends withType<"addiv"> {
  addiv: "//=";
}
interface delDel_stmt extends withType<"delDel_stmt"> {
  exprlist: exprlist;
}
interface passPass_stmt extends withType<"passPass_stmt"> {
  pass: "pass";
}
interface break_stmtFlow_stmt extends withType<"break_stmtFlow_stmt"> {
  break_stmt: break_stmt;
}
interface continue_stmtFlow_stmt extends withType<"continue_stmtFlow_stmt"> {
  continue_stmt: continue_stmt;
}
interface return_stmtFlow_stmt extends withType<"return_stmtFlow_stmt"> {
  return_stmt: return_stmt;
}
interface raise_stmtFlow_stmt extends withType<"raise_stmtFlow_stmt"> {
  raise_stmt: raise_stmt;
}
interface yield_stmtFlow_stmt extends withType<"yield_stmtFlow_stmt"> {
  yield_stmt: yield_stmt;
}
type break_stmt = {
  break: "break";
};
type continue_stmt = {
  continue: "continue";
};
type return_stmt = {
  testlist: testlist;
};
type yield_stmt = {
  yield_expr: yield_expr;
};
type raise_stmt = {
  TestFrom: TestFrom;
};
type TestFrom = {
  test: test;
  From: From;
};
type From = {
  test: test;
};
interface import_nameImport_stmt extends withType<"import_nameImport_stmt"> {
  import_name: import_name;
}
interface import_fromImport_stmt extends withType<"import_fromImport_stmt"> {
  import_from: import_from;
}
type import_name = {
  dotted_as_names: dotted_as_names;
};
type import_from = {
  FromImport: FromImport;
};
type FromImport = {
  DotDddotDotted_nameDotDddot: DotDddotDotted_nameDotDddot;
  MultLBrImport_as_namesRBrImport_as_names: MultLBrImport_as_namesRBrImport_as_names;
};
type DotDddotDotted_nameDotDddot = dotDddotDotted_name | dotDddot;
type DotDddot = dot | dddot;
interface dot extends withType<"dot"> {
  dot: ".";
}
interface dddot extends withType<"dddot"> {
  dddot: "...";
}
interface dotDddotDotted_name extends withType<"dotDddotDotted_name"> {
  DotDddots: DotDddot[];
  dotted_name: dotted_name;
}
interface dotDddot extends withType<"dotDddot"> {
  DotDddots: DotDddot[];
}
type MultLBrImport_as_namesRBrImport_as_names = mult | lBrImport_as_namesRBr | import_as_names;
interface mult extends withType<"mult"> {
  mult: "*";
}
interface lBrImport_as_namesRBr extends withType<"lBrImport_as_namesRBr"> {
  import_as_names: import_as_names;
}
interface import_as_names extends withType<"import_as_names"> {
  import_as_names: import_as_names;
}
type import_as_name = {
  name: name;
  As: As;
};
type As = {
  name: name;
};
type dotted_as_name = {
  dotted_name: dotted_name;
  As: As;
};
type ComImport_as_name = {
  import_as_name: import_as_name;
};
interface import_as_nameComImport_as_nameComImport_as_names extends withType<"import_as_nameComImport_as_nameComImport_as_names"> {
  import_as_name: import_as_name;
  ComImport_as_names: ComImport_as_name[];
}
type dotted_as_names = {
  dotted_as_name: dotted_as_name;
  ComDotted_as_names: ComDotted_as_name[];
};
type ComDotted_as_name = {
  dotted_as_name: dotted_as_name;
};
type dotted_name = {
  name: name;
  DotNames: DotName[];
};
type DotName = {
  name: name;
};
type ComName = {
  name: name;
};
interface globalGlobal_stmt extends withType<"globalGlobal_stmt"> {
  name: name;
  ComNames: ComName[];
}
interface nonlocalNonlocal_stmt extends withType<"nonlocalNonlocal_stmt"> {
  name: name;
  ComNames: ComName[];
}
type ComTest = {
  test: test;
};
interface assertAssert_stmt extends withType<"assertAssert_stmt"> {
  test: test;
  ComTest: ComTest;
}
type compound_stmt = if_stmtCompound_stmt | while_stmtCompound_stmt | for_stmtCompound_stmt | try_stmtCompound_stmt | with_stmtCompound_stmt | funcdefCompound_stmt | classdefCompound_stmt | decoratedCompound_stmt | async_stmtCompound_stmt | match_stmtCompound_stmt;
interface if_stmtCompound_stmt extends withType<"if_stmtCompound_stmt"> {
  if_stmt: if_stmt;
}
interface while_stmtCompound_stmt extends withType<"while_stmtCompound_stmt"> {
  while_stmt: while_stmt;
}
interface for_stmtCompound_stmt extends withType<"for_stmtCompound_stmt"> {
  for_stmt: for_stmt;
}
interface try_stmtCompound_stmt extends withType<"try_stmtCompound_stmt"> {
  try_stmt: try_stmt;
}
interface with_stmtCompound_stmt extends withType<"with_stmtCompound_stmt"> {
  with_stmt: with_stmt;
}
interface funcdefCompound_stmt extends withType<"funcdefCompound_stmt"> {
  funcdef: funcdef;
}
interface classdefCompound_stmt extends withType<"classdefCompound_stmt"> {
  classdef: classdef;
}
interface decoratedCompound_stmt extends withType<"decoratedCompound_stmt"> {
  decorated: decorated;
}
interface async_stmtCompound_stmt extends withType<"async_stmtCompound_stmt"> {
  async_stmt: async_stmt;
}
interface match_stmtCompound_stmt extends withType<"match_stmtCompound_stmt"> {
  match_stmt: match_stmt;
}
type async_stmt = {
  FuncdefWith_stmtFor_stmt: FuncdefWith_stmtFor_stmt;
};
type FuncdefWith_stmtFor_stmt = funcdef | with_stmt | for_stmt;
interface with_stmt extends withType<"with_stmt"> {
  with_stmt: with_stmt;
}
interface for_stmt extends withType<"for_stmt"> {
  for_stmt: for_stmt;
}
type if_stmt = {
  test: test;
  block: block;
  Elifs: Elif[];
  Else: Else;
};
type Elif = {
  test: test;
  block: block;
};
type Else = {
  block: block;
};
type while_stmt = {
  test: test;
  block: block;
  Else: Else;
};
interface forInFor_stmt extends withType<"forInFor_stmt"> {
  exprlist: exprlist;
  testlist: testlist;
  block: block;
  Else: Else;
}
type try_stmt = {
  Try: Try;
};
type Try = {
  block: block;
  Except_clauseColBlockElseFinallyFinally: Except_clauseColBlockElseFinallyFinally;
};
type Except_clauseColBlockElseFinallyFinally = except_clauseColBlockElseFinally | Finally;
type Except_clauseColBlock = {
  except_clause: except_clause;
  block: block;
};
type Finally = {
  block: block;
};
interface except_clauseColBlockElseFinally extends withType<"except_clauseColBlockElseFinally"> {
  Except_clauseColBlocks: Except_clauseColBlock[];
  Else: Else;
  Finally: Finally;
}
type ComWith_item = {
  with_item: with_item;
};
interface withWith_stmt extends withType<"withWith_stmt"> {
  with_item: with_item;
  ComWith_items: ComWith_item[];
  block: block;
}
type with_item = {
  test: test;
  As: As;
};
type except_clause = {
  TestAs: TestAs;
};
type TestAs = {
  test: test;
  As: As;
};
type block = simple_stmtsBlock | nlIdtStmtDdtBlock;
interface simple_stmtsBlock extends withType<"simple_stmtsBlock"> {
  simple_stmts: simple_stmts;
}
interface nlIdtStmtDdtBlock extends withType<"nlIdtStmtDdtBlock"> {
  stmts: stmt[];
}
type match_stmt = {
  subject_expr: subject_expr;
  case_blocks: case_block[];
};
type subject_expr = star_named_expressionComStar_named_expressionsSubject_expr | testSubject_expr;
interface star_named_expressionComStar_named_expressionsSubject_expr extends withType<"star_named_expressionComStar_named_expressionsSubject_expr"> {
  star_named_expression: star_named_expression;
  star_named_expressions: star_named_expressions;
}
interface testSubject_expr extends withType<"testSubject_expr"> {
  test: test;
}
type star_named_expressions = {
  star_named_expressions: star_named_expression[];
};
type star_named_expression = multExprStar_named_expression | testStar_named_expression;
interface multExprStar_named_expression extends withType<"multExprStar_named_expression"> {
  expr: expr;
}
interface testStar_named_expression extends withType<"testStar_named_expression"> {
  test: test;
}
type case_block = {
  patterns: patterns;
  guard: guard;
  block: block;
};
type guard = {
  test: test;
};
type patterns = open_sequence_patternPatterns | patternPatterns;
interface open_sequence_patternPatterns extends withType<"open_sequence_patternPatterns"> {
  open_sequence_pattern: open_sequence_pattern;
}
interface patternPatterns extends withType<"patternPatterns"> {
  pattern: pattern;
}
type pattern = as_patternPattern | or_patternPattern;
interface as_patternPattern extends withType<"as_patternPattern"> {
  as_pattern: as_pattern;
}
interface or_patternPattern extends withType<"or_patternPattern"> {
  or_pattern: or_pattern;
}
type as_pattern = {
  or_pattern: or_pattern;
  pattern_capture_target: pattern_capture_target;
};
type or_pattern = {
  closed_pattern: closed_pattern;
  OrClosed_patterns: OrClosed_pattern[];
};
type OrClosed_pattern = {
  closed_pattern: closed_pattern;
};
type closed_pattern = literal_patternClosed_pattern | capture_patternClosed_pattern | wildcard_patternClosed_pattern | value_patternClosed_pattern | group_patternClosed_pattern | sequence_patternClosed_pattern | mapping_patternClosed_pattern | class_patternClosed_pattern;
interface literal_patternClosed_pattern extends withType<"literal_patternClosed_pattern"> {
  literal_pattern: literal_pattern;
}
interface capture_patternClosed_pattern extends withType<"capture_patternClosed_pattern"> {
  capture_pattern: capture_pattern;
}
interface wildcard_patternClosed_pattern extends withType<"wildcard_patternClosed_pattern"> {
  wildcard_pattern: wildcard_pattern;
}
interface value_patternClosed_pattern extends withType<"value_patternClosed_pattern"> {
  value_pattern: value_pattern;
}
interface group_patternClosed_pattern extends withType<"group_patternClosed_pattern"> {
  group_pattern: group_pattern;
}
interface sequence_patternClosed_pattern extends withType<"sequence_patternClosed_pattern"> {
  sequence_pattern: sequence_pattern;
}
interface mapping_patternClosed_pattern extends withType<"mapping_patternClosed_pattern"> {
  mapping_pattern: mapping_pattern;
}
interface class_patternClosed_pattern extends withType<"class_patternClosed_pattern"> {
  class_pattern: class_pattern;
}
type literal_pattern = signed_numberDummyLiteral_pattern | complex_numberLiteral_pattern | stringsLiteral_pattern | noneLiteral_pattern | trueLiteral_pattern | falseLiteral_pattern;
interface signed_numberDummyLiteral_pattern extends withType<"signed_numberDummyLiteral_pattern"> {
  signed_number: signed_number;
  dummy: boolean;
}
interface complex_numberLiteral_pattern extends withType<"complex_numberLiteral_pattern"> {
  complex_number: complex_number;
}
interface stringsLiteral_pattern extends withType<"stringsLiteral_pattern"> {
  strings: strings;
}
interface noneLiteral_pattern extends withType<"noneLiteral_pattern"> {
  none: "None";
}
interface trueLiteral_pattern extends withType<"trueLiteral_pattern"> {
  true: "True";
}
interface falseLiteral_pattern extends withType<"falseLiteral_pattern"> {
  false: "False";
}
type literal_expr = signed_numberDummyLiteral_expr | complex_numberLiteral_expr | stringsLiteral_expr | noneLiteral_expr | trueLiteral_expr | falseLiteral_expr;
interface signed_numberDummyLiteral_expr extends withType<"signed_numberDummyLiteral_expr"> {
  signed_number: signed_number;
  dummy: boolean;
}
interface complex_numberLiteral_expr extends withType<"complex_numberLiteral_expr"> {
  complex_number: complex_number;
}
interface stringsLiteral_expr extends withType<"stringsLiteral_expr"> {
  strings: strings;
}
interface noneLiteral_expr extends withType<"noneLiteral_expr"> {
  none: "None";
}
interface trueLiteral_expr extends withType<"trueLiteral_expr"> {
  true: "True";
}
interface falseLiteral_expr extends withType<"falseLiteral_expr"> {
  false: "False";
}
type complex_number = signed_real_numberPlusImaginary_numberComplex_number | signed_real_numberMinImaginary_numberComplex_number;
interface signed_real_numberPlusImaginary_numberComplex_number extends withType<"signed_real_numberPlusImaginary_numberComplex_number"> {
  signed_real_number: signed_real_number;
  imaginary_number: imaginary_number;
}
interface signed_real_numberMinImaginary_numberComplex_number extends withType<"signed_real_numberMinImaginary_numberComplex_number"> {
  signed_real_number: signed_real_number;
  imaginary_number: imaginary_number;
}
type signed_number = numberSigned_number | minNumberSigned_number;
interface numberSigned_number extends withType<"numberSigned_number"> {
  number: number;
}
interface minNumberSigned_number extends withType<"minNumberSigned_number"> {
  number: number;
}
type signed_real_number = real_numberSigned_real_number | minReal_numberSigned_real_number;
interface real_numberSigned_real_number extends withType<"real_numberSigned_real_number"> {
  real_number: real_number;
}
interface minReal_numberSigned_real_number extends withType<"minReal_numberSigned_real_number"> {
  real_number: real_number;
}
type real_number = {
  number: number;
};
type imaginary_number = {
  number: number;
};
type capture_pattern = {
  pattern_capture_target: pattern_capture_target;
};
type pattern_capture_target = {
  name: name;
  dummy: boolean;
};
type wildcard_pattern = {
  undsc: "_";
};
type value_pattern = {
  attr: attr;
  dummy: boolean;
};
type attr = {
  name: name;
  DotNames: DotName[];
};
type name_or_attr = attrName_or_attr | nameName_or_attr;
interface attrName_or_attr extends withType<"attrName_or_attr"> {
  attr: attr;
}
interface nameName_or_attr extends withType<"nameName_or_attr"> {
  name: name;
}
type group_pattern = {
  pattern: pattern;
};
type sequence_pattern = lCBrMaybe_sequence_patternRCBrSequence_pattern | lBrOpen_sequence_patternRBrSequence_pattern;
interface lCBrMaybe_sequence_patternRCBrSequence_pattern extends withType<"lCBrMaybe_sequence_patternRCBrSequence_pattern"> {
  maybe_sequence_pattern: maybe_sequence_pattern;
}
interface lBrOpen_sequence_patternRBrSequence_pattern extends withType<"lBrOpen_sequence_patternRBrSequence_pattern"> {
  open_sequence_pattern: open_sequence_pattern;
}
type open_sequence_pattern = {
  maybe_star_pattern: maybe_star_pattern;
  maybe_sequence_pattern: maybe_sequence_pattern;
};
type maybe_sequence_pattern = {
  maybe_star_pattern: maybe_star_pattern;
  ComMaybe_star_patterns: ComMaybe_star_pattern[];
};
type ComMaybe_star_pattern = {
  maybe_star_pattern: maybe_star_pattern;
};
type maybe_star_pattern = star_patternMaybe_star_pattern | patternMaybe_star_pattern;
interface star_patternMaybe_star_pattern extends withType<"star_patternMaybe_star_pattern"> {
  star_pattern: star_pattern;
}
interface patternMaybe_star_pattern extends withType<"patternMaybe_star_pattern"> {
  pattern: pattern;
}
type star_pattern = multPattern_capture_targetStar_pattern | multWildcard_patternStar_pattern;
interface multPattern_capture_targetStar_pattern extends withType<"multPattern_capture_targetStar_pattern"> {
  pattern_capture_target: pattern_capture_target;
}
interface multWildcard_patternStar_pattern extends withType<"multWildcard_patternStar_pattern"> {
  wildcard_pattern: wildcard_pattern;
}
type mapping_pattern = lCBrRCBrMapping_pattern | lCBrDouble_star_patternComRCBrMapping_pattern | lCBrItems_patternComDouble_star_patternComRCBrMapping_pattern | lCBrItems_patternComRCBrMapping_pattern;
interface lCBrRCBrMapping_pattern extends withType<"lCBrRCBrMapping_pattern"> {
}
interface lCBrDouble_star_patternComRCBrMapping_pattern extends withType<"lCBrDouble_star_patternComRCBrMapping_pattern"> {
  double_star_pattern: double_star_pattern;
}
interface lCBrItems_patternComDouble_star_patternComRCBrMapping_pattern extends withType<"lCBrItems_patternComDouble_star_patternComRCBrMapping_pattern"> {
  items_pattern: items_pattern;
  double_star_pattern: double_star_pattern;
}
interface lCBrItems_patternComRCBrMapping_pattern extends withType<"lCBrItems_patternComRCBrMapping_pattern"> {
  items_pattern: items_pattern;
}
type items_pattern = {
  key_value_pattern: key_value_pattern;
  ComKey_value_patterns: ComKey_value_pattern[];
};
type ComKey_value_pattern = {
  key_value_pattern: key_value_pattern;
};
type key_value_pattern = {
  Literal_exprAttr: Literal_exprAttr;
  pattern: pattern;
};
type Literal_exprAttr = literal_expr | attr;
type double_star_pattern = {
  pattern_capture_target: pattern_capture_target;
};
type class_pattern = name_or_attrLBrRBrClass_pattern | name_or_attrLBrPositional_patternsComRBrClass_pattern | name_or_attrLBrKeyword_patternsComRBrClass_pattern | name_or_attrLBrPositional_patternsComKeyword_patternsComRBrClass_pattern;
interface name_or_attrLBrRBrClass_pattern extends withType<"name_or_attrLBrRBrClass_pattern"> {
  name_or_attr: name_or_attr;
}
interface name_or_attrLBrPositional_patternsComRBrClass_pattern extends withType<"name_or_attrLBrPositional_patternsComRBrClass_pattern"> {
  name_or_attr: name_or_attr;
  positional_patterns: positional_patterns;
}
interface name_or_attrLBrKeyword_patternsComRBrClass_pattern extends withType<"name_or_attrLBrKeyword_patternsComRBrClass_pattern"> {
  name_or_attr: name_or_attr;
  keyword_patterns: keyword_patterns;
}
interface name_or_attrLBrPositional_patternsComKeyword_patternsComRBrClass_pattern extends withType<"name_or_attrLBrPositional_patternsComKeyword_patternsComRBrClass_pattern"> {
  name_or_attr: name_or_attr;
  positional_patterns: positional_patterns;
  keyword_patterns: keyword_patterns;
}
type positional_patterns = {
  pattern: pattern;
  ComPatterns: ComPattern[];
};
type ComPattern = {
  pattern: pattern;
};
type keyword_patterns = {
  keyword_pattern: keyword_pattern;
  ComKeyword_patterns: ComKeyword_pattern[];
};
type ComKeyword_pattern = {
  keyword_pattern: keyword_pattern;
};
type keyword_pattern = {
  name: name;
  pattern: pattern;
};
type IfElse = {
  or_test: or_test;
  test: test;
};
interface or_testIfElseTest extends withType<"or_testIfElseTest"> {
  or_test: or_test;
  IfElse: IfElse;
}
interface lambdefTest extends withType<"lambdefTest"> {
  lambdef: lambdef;
}
type test_nocond = or_testTest_nocond | lambdef_nocondTest_nocond;
interface or_testTest_nocond extends withType<"or_testTest_nocond"> {
  or_test: or_test;
}
interface lambdef_nocondTest_nocond extends withType<"lambdef_nocondTest_nocond"> {
  lambdef_nocond: lambdef_nocond;
}
type lambdef = {
  varargslist: varargslist;
  test: test;
};
type lambdef_nocond = {
  varargslist: varargslist;
  test_nocond: test_nocond;
};
type or_test = {
  and_test: and_test;
  Ors: Or[];
};
type Or = {
  and_test: and_test;
};
type and_test = {
  not_test: not_test;
  Ands: And[];
};
type And = {
  not_test: not_test;
};
type not_test = notNot_test | comparisonNot_test;
interface notNot_test extends withType<"notNot_test"> {
  not_test: not_test;
}
interface comparisonNot_test extends withType<"comparisonNot_test"> {
  comparison: comparison;
}
type comparison = {
  expr: expr;
  Comp_opExprs: Comp_opExpr[];
};
type Comp_opExpr = {
  comp_op: comp_op;
  expr: expr;
};
type comp_op = lTComp_op | gTComp_op | isEqComp_op | gTEqComp_op | lTEqComp_op | nEqComp_op | nEqComp_op | inComp_op | notInComp_op | isComp_op | isNotComp_op;
interface lTComp_op extends withType<"lTComp_op"> {
  lT: "<";
}
interface gTComp_op extends withType<"gTComp_op"> {
  gT: ">";
}
interface isEqComp_op extends withType<"isEqComp_op"> {
  isEq: "==";
}
interface gTEqComp_op extends withType<"gTEqComp_op"> {
  gTEq: ">=";
}
interface lTEqComp_op extends withType<"lTEqComp_op"> {
  lTEq: "<=";
}
interface nEqComp_op extends withType<"nEqComp_op"> {
  nEq: "<>";
}
interface inComp_op extends withType<"inComp_op"> {
  in: "in";
}
interface notInComp_op extends withType<"notInComp_op"> {
}
interface isComp_op extends withType<"isComp_op"> {
  is: "is";
}
interface isNotComp_op extends withType<"isNotComp_op"> {
}
interface multExprStar_expr extends withType<"multExprStar_expr"> {
  expr: expr;
}
type expr = atom_exprExpr | exprPowExprExpr | plusMinTldExprExpr | exprMultAtDivModDdivExprExpr | exprPlusMinExprExpr | exprShLShRExprExpr | exprAndExprExpr | exprXorExprExpr | exprOrExprExpr;
type PlusMinTld = plus | min | tld;
interface plus extends withType<"plus"> {
  plus: "+";
}
interface min extends withType<"min"> {
  min: "-";
}
interface tld extends withType<"tld"> {
  tld: "~";
}
type MultAtDivModDdiv = mult | at | div | mod | ddiv;
interface at extends withType<"at"> {
  at: "@";
}
interface div extends withType<"div"> {
  div: "/";
}
interface mod extends withType<"mod"> {
  mod: "%";
}
interface ddiv extends withType<"ddiv"> {
  ddiv: "//";
}
type PlusMin = plus | min;
type ShLShR = shL | shR;
interface shL extends withType<"shL"> {
  shL: "<<";
}
interface shR extends withType<"shR"> {
  shR: ">>";
}
interface atom_exprExpr extends withType<"atom_exprExpr"> {
  atom_expr: atom_expr;
}
interface exprPowExprExpr extends withType<"exprPowExprExpr"> {
  expr1: expr;
  expr2: expr;
}
interface plusMinTldExprExpr extends withType<"plusMinTldExprExpr"> {
  PlusMinTlds: PlusMinTld[];
  expr: expr;
}
interface exprMultAtDivModDdivExprExpr extends withType<"exprMultAtDivModDdivExprExpr"> {
  expr1: expr;
  MultAtDivModDdiv: MultAtDivModDdiv;
  expr2: expr;
}
interface exprPlusMinExprExpr extends withType<"exprPlusMinExprExpr"> {
  expr1: expr;
  PlusMin: PlusMin;
  expr2: expr;
}
interface exprShLShRExprExpr extends withType<"exprShLShRExprExpr"> {
  expr1: expr;
  ShLShR: ShLShR;
  expr2: expr;
}
interface exprAndExprExpr extends withType<"exprAndExprExpr"> {
  expr1: expr;
  expr2: expr;
}
interface exprXorExprExpr extends withType<"exprXorExprExpr"> {
  expr1: expr;
  expr2: expr;
}
interface exprOrExprExpr extends withType<"exprOrExprExpr"> {
  expr1: expr;
  expr2: expr;
}
type atom_expr = {
  atom: atom;
  trailers: trailer[];
};
type atom = lBrYield_exprTestlist_compRBrAtom | lCBrTestlist_compRCBrAtom | lCBrDictorsetmakerRCBrAtom | nameAtom | numberAtom | stringAtom | dddotAtom | noneAtom | trueAtom | falseAtom;
type Yield_exprTestlist_comp = yield_expr | testlist_comp;
interface testlist_comp extends withType<"testlist_comp"> {
  testlist_comp: testlist_comp;
}
interface lBrYield_exprTestlist_compRBrAtom extends withType<"lBrYield_exprTestlist_compRBrAtom"> {
  Yield_exprTestlist_comp: Yield_exprTestlist_comp;
}
interface lCBrTestlist_compRCBrAtom extends withType<"lCBrTestlist_compRCBrAtom"> {
  testlist_comp: testlist_comp;
}
interface lCBrDictorsetmakerRCBrAtom extends withType<"lCBrDictorsetmakerRCBrAtom"> {
  dictorsetmaker: dictorsetmaker;
}
interface nameAtom extends withType<"nameAtom"> {
  name: name;
}
interface numberAtom extends withType<"numberAtom"> {
  number: number;
}
interface stringAtom extends withType<"stringAtom"> {
  strings: string[];
}
interface dddotAtom extends withType<"dddotAtom"> {
  dddot: "...";
}
interface noneAtom extends withType<"noneAtom"> {
  none: "None";
}
interface trueAtom extends withType<"trueAtom"> {
  true: "True";
}
interface falseAtom extends withType<"falseAtom"> {
  false: "False";
}
type name = nameName | undscName | matchName;
interface nameName extends withType<"nameName"> {
  name: string;
}
interface undscName extends withType<"undscName"> {
  undsc: "_";
}
interface matchName extends withType<"matchName"> {
  match: "match";
}
type Comp_forComTestStar_exprCom = comp_for | comTestStar_exprCom;
interface comp_for extends withType<"comp_for"> {
  comp_for: comp_for;
}
interface comTestStar_exprCom extends withType<"comTestStar_exprCom"> {
  ComTestStar_exprs: ComTestStar_expr[];
}
interface testStar_exprComp_forComTestStar_exprComTestlist_comp extends withType<"testStar_exprComp_forComTestStar_exprComTestlist_comp"> {
  TestStar_expr: TestStar_expr;
  Comp_forComTestStar_exprCom: Comp_forComTestStar_exprCom;
}
type trailer = lBrArglistRBrTrailer | lCBrSubscriptlistRCBrTrailer | dotNameTrailer;
interface lBrArglistRBrTrailer extends withType<"lBrArglistRBrTrailer"> {
  arglist: arglist;
}
interface lCBrSubscriptlistRCBrTrailer extends withType<"lCBrSubscriptlistRCBrTrailer"> {
  subscriptlist: subscriptlist;
}
interface dotNameTrailer extends withType<"dotNameTrailer"> {
  name: name;
}
type subscriptlist = {
  subscript_: subscript_;
  ComSubscript_s: ComSubscript_[];
};
type ComSubscript_ = {
  subscript_: subscript_;
};
type subscript_ = testSubscript_ | testColTestSliceopSubscript_;
interface testSubscript_ extends withType<"testSubscript_"> {
  test: test;
}
interface testColTestSliceopSubscript_ extends withType<"testColTestSliceopSubscript_"> {
  test1: test;
  test2: test;
  sliceop: sliceop;
}
type sliceop = {
  test: test;
};
type exprlist = {
  ExprStar_expr: ExprStar_expr;
  ComExprStar_exprs: ComExprStar_expr[];
};
type ExprStar_expr = expr | star_expr;
type ComExprStar_expr = {
  ExprStar_expr: ExprStar_expr;
};
interface testComTestComTestlist extends withType<"testComTestComTestlist"> {
  test: test;
  ComTests: ComTest[];
}
type dictorsetmaker = {
  TestColTestPowExprComp_forComTestColTestPowExprComTestStar_exprComp_forComTestStar_exprCom: TestColTestPowExprComp_forComTestColTestPowExprComTestStar_exprComp_forComTestStar_exprCom;
};
type TestColTestPowExprComp_forComTestColTestPowExprComTestStar_exprComp_forComTestStar_exprCom = TestColTestPowExprComp_forComTestColTestPowExprCom | TestStar_exprComp_forComTestStar_exprCom;
type TestColTestPowExprComp_forComTestColTestPowExprCom = {
  TestColTestPowExpr: TestColTestPowExpr;
  Comp_forComTestColTestPowExprCom: Comp_forComTestColTestPowExprCom;
};
type TestColTestPowExpr = testColTest | powExpr;
interface testColTest extends withType<"testColTest"> {
  test1: test;
  test2: test;
}
interface powExpr extends withType<"powExpr"> {
  expr: expr;
}
type Comp_forComTestColTestPowExprCom = comp_for | comTestColTestPowExprCom;
type ComTestColTestPowExpr = {
  TestColTestPowExpr: TestColTestPowExpr;
};
interface comTestColTestPowExprCom extends withType<"comTestColTestPowExprCom"> {
  ComTestColTestPowExprs: ComTestColTestPowExpr[];
}
type TestStar_exprComp_forComTestStar_exprCom = {
  TestStar_expr: TestStar_expr;
  Comp_forComTestStar_exprCom: Comp_forComTestStar_exprCom;
};
interface classClassdef extends withType<"classClassdef"> {
  name: name;
  LBrArglistRBr: LBrArglistRBr;
  block: block;
}
type arglist = {
  argument: argument;
  ComArguments: ComArgument[];
};
type ComArgument = {
  argument: argument;
};
type argument = {
  TestComp_forTestEqTestPowTestMultTest: TestComp_forTestEqTestPowTestMultTest;
};
type TestComp_forTestEqTestPowTestMultTest = testComp_for | testEqTest | powTest | multTest;
interface testComp_for extends withType<"testComp_for"> {
  test: test;
  comp_for: comp_for;
}
interface testEqTest extends withType<"testEqTest"> {
  test1: test;
  test2: test;
}
interface powTest extends withType<"powTest"> {
  test: test;
}
interface multTest extends withType<"multTest"> {
  test: test;
}
type comp_iter = comp_forComp_iter | comp_ifComp_iter;
interface comp_forComp_iter extends withType<"comp_forComp_iter"> {
  comp_for: comp_for;
}
interface comp_ifComp_iter extends withType<"comp_ifComp_iter"> {
  comp_if: comp_if;
}
interface asyncForInComp_for extends withType<"asyncForInComp_for"> {
  exprlist: exprlist;
  or_test: or_test;
  comp_iter: comp_iter;
}
type comp_if = {
  test_nocond: test_nocond;
  comp_iter: comp_iter;
};
type encoding_decl = {
  name: name;
};
interface yieldYield_expr extends withType<"yieldYield_expr"> {
  yield_arg: yield_arg;
}
type yield_arg = fromYield_arg | testlistYield_arg;
interface fromYield_arg extends withType<"fromYield_arg"> {
  test: test;
}
interface testlistYield_arg extends withType<"testlistYield_arg"> {
  testlist: testlist;
}
type strings = {
  strings: string[];
};