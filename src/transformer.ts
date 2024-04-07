/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-04-07
 */
import { decl, field } from "./types"
import { pipeline } from "./utils"

/**
 * Deduplicates interface fields names: the type generation generates interface with duplicate field names.
 * For example, the expressionRelopExpressionEquation interface from 'Expr.g4' is
 * interface expressionRelopExpressionEquation extends withType<"expressionRelopExpressionEquation"> {
 *   expression: expression;
 *   relop: relop;
 *   expression: expression;
 * }
 * It is transformed to the following:
 * interface expressionRelopExpressionEquation extends withType<"expressionRelopExpressionEquation"> {
 *   expression1: expression;
 *   relop: relop;
 *   expression2: expression;
 * }
 * @param decls
 * @returns declarations with unique fields
 */
const uniqueFields = (decls: decl[]) : decl[] => {
  return decls.map(decl => {
    switch (decl.type) {
      case 'interface': {
        const counts = decl.fields.reduce((acc, field, i) => {
          if (undefined === acc[field.name]) {
            acc[field.name] = [i]
          } else {
            acc[field.name].push(i)
          }
          return acc
        }, {} as { [key: string] : number[] })
        return { ...decl,
          fields: decl.fields.reduce((acc, field, i) => {
            const name = field.name + (counts[field.name].length === 1 ? '' : '' + (counts[field.name].indexOf(i)+1))
            return acc.concat({ ...field, name: name })
          }, [] as field[])
        }
      }
      default: return decl
    }
  })
}

export const transformDecls = (decls: decl[]) : decl[] => {
  return pipeline<decl[]>(
    uniqueFields
  )(decls)
}