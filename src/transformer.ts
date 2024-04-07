/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-04-07
 */
import { decl, field, interfaceDecl, pojo, ref } from "./types"
import { pipeline } from "./utils"


const getDecl = (name : string, decls: decl[]) : decl => {
  for(var i=0; i < decls.length; i++) {
    if (decls[i].name === name) {
      return decls[i]
    }
  }
  throw new Error(`Cannot find decl '${name}'`)
}

/**
 * Unions of single interface are simplified to pojo type.
 * For example, the file_ type from 'Expr.g4':
 * type file_ = equationEofFile_;
 * interface equationEofFile_ extends withType<"equationEofFile_"> {
 *     equations: equation[];
 * }
 * is simplified to:
 * type file_ = {
 *   equations: equation[];
 * }
 * @param decls
 * @returns
 */
const simplifySingleUnion = (decls: decl[]) : decl[] => {
  const res : [ decl[], string[] ] = decls.reduce(([acc, removed], decl) => {
    switch (decl.type) {
      case 'type': {
        switch (decl.value.type) {
          case 'union': {
            if (decl.value.types.length === 1) {
              // trigger simplification
              const name = (decl.value.types[0] as ref).name
              const interf = getDecl(name, decls) as interfaceDecl
              // transmute union to pojo
              const pojo : pojo = {
                type: 'pojo',
                fields: interf.fields
              }
              const new_decl : decl = { ...decl,
                value: pojo
              }
              return [acc.concat(new_decl), removed.concat(name)]
            }
          }
        }
        break
      }
      case 'interface': {
        // warning!! the hidden assumption here is that interface comes after union type
        if (removed.includes(decl.name)) {
          return [acc, removed]
        }
        break
      }
    }
    return [ acc.concat(decl), removed ]
  }, [[], []] as [ decl[], string[] ])
  return res[0]
}

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
    uniqueFields,
    simplifySingleUnion
  )(decls)
}