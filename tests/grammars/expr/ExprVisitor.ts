// Generated from Expr.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


import { File_Context } from "./ExprParser";
import { EquationContext } from "./ExprParser";
import { ExpressionContext } from "./ExprParser";
import { AtomContext } from "./ExprParser";
import { ScientificContext } from "./ExprParser";
import { VariableContext } from "./ExprParser";
import { RelopContext } from "./ExprParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ExprParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class ExprVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ExprParser.file_`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFile_?: (ctx: File_Context) => Result;
	/**
	 * Visit a parse tree produced by `ExprParser.equation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEquation?: (ctx: EquationContext) => Result;
	/**
	 * Visit a parse tree produced by `ExprParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `ExprParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtom?: (ctx: AtomContext) => Result;
	/**
	 * Visit a parse tree produced by `ExprParser.scientific`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScientific?: (ctx: ScientificContext) => Result;
	/**
	 * Visit a parse tree produced by `ExprParser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable?: (ctx: VariableContext) => Result;
	/**
	 * Visit a parse tree produced by `ExprParser.relop`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelop?: (ctx: RelopContext) => Result;
}

