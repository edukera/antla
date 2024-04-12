// Generated from Expr.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { File_Context } from "./ExprParser";
import { EquationContext } from "./ExprParser";
import { ExpressionContext } from "./ExprParser";
import { AtomContext } from "./ExprParser";
import { ScientificContext } from "./ExprParser";
import { VariableContext } from "./ExprParser";
import { RelopContext } from "./ExprParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ExprParser`.
 */
export default class ExprListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ExprParser.file_`.
	 * @param ctx the parse tree
	 */
	enterFile_?: (ctx: File_Context) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.file_`.
	 * @param ctx the parse tree
	 */
	exitFile_?: (ctx: File_Context) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.equation`.
	 * @param ctx the parse tree
	 */
	enterEquation?: (ctx: EquationContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.equation`.
	 * @param ctx the parse tree
	 */
	exitEquation?: (ctx: EquationContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.atom`.
	 * @param ctx the parse tree
	 */
	enterAtom?: (ctx: AtomContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.atom`.
	 * @param ctx the parse tree
	 */
	exitAtom?: (ctx: AtomContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.scientific`.
	 * @param ctx the parse tree
	 */
	enterScientific?: (ctx: ScientificContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.scientific`.
	 * @param ctx the parse tree
	 */
	exitScientific?: (ctx: ScientificContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.variable`.
	 * @param ctx the parse tree
	 */
	enterVariable?: (ctx: VariableContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.variable`.
	 * @param ctx the parse tree
	 */
	exitVariable?: (ctx: VariableContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.relop`.
	 * @param ctx the parse tree
	 */
	enterRelop?: (ctx: RelopContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.relop`.
	 * @param ctx the parse tree
	 */
	exitRelop?: (ctx: RelopContext) => void;
}

