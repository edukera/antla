/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-04-07
 */
import { decl, field, interfaceDecl, pojo, ref, stringliteral } from "./types"
import { pipeline } from "./utils"

/******************************************************************************
 * Utils
 ******************************************************************************/

const getDecl = (name : string, decls: decl[]) : decl => {
  for(var i=0; i < decls.length; i++) {
    if (decls[i].name === name) {
      return decls[i]
    }
  }
  throw new Error(`Cannot find decl '${name}'`)
}

/******************************************************************************
 * Transformers
 ******************************************************************************/

/**
 * Simplies pojo types with single field. For example from 'Expr.g4':
 * type file_ = {
 *     equations: equation[];
 * };
 * is simplified to
 * type file_ = equation[];
 * @param decls
 * @returns simplified declarations
 */
const simplifySingleFieldPojo = (decls: decl[]) : decl[] => {
  return decls.reduce((acc, decl) => {
    switch (decl.type) {
      case 'type': {
        switch (decl.value.type) {
          case 'pojo': {
            if (decl.value.fields.length === 1) {
              // transmute pojo to ref
              return acc.concat({ ...decl,
                value: decl.value.fields[0].ftype
              })
            }
          }
        }
      }
    }
    return acc.concat(decl)
  }, [] as decl[])
}

/**
 * Simplifies a union of literal (string) types. For example from Expr.g4:
 * type TimesDiv = times | div;
 * interface times extends withType<"times"> {
 *     times: "*";
 * }
 * interface div extends withType<"div"> {
 *     div: "/";
 * }
 * is simplified to:
 * type TimesDiv = "*" | "/"
 * @param decls
 * @returns simplified list of declarations
 */
const simplifyLiteralUnion = (decls: decl[]) : decl[] => {
  // look for union literal string types
  const res : [decl[], string[]]  = decls.reduce(([acc, removed], decl) => {
    switch (decl.type) {
      case 'type': {
        switch (decl.value.type) {
          case 'union': {
            // retrieve referenced types
            const interfaces = decl.value.types.reduce((inter_acc, typ) => {
              switch (typ.type) {
                case 'ref': {
                  const reftyp = getDecl(typ.name, decls)
                  return inter_acc.concat(reftyp)
                }
              }
              return inter_acc
            }, [] as decl[])
            // decide whether it is union of single literal interfaces
            const literals = interfaces.reduce((lit_acc, decl) => {
              switch (decl.type) {
                case 'interface': {
                  if (decl.fields.length === 1 && decl.fields[0].ftype.type === 'literal') {
                    return lit_acc.concat(decl.fields[0].ftype)
                  }
                }
              }
              return lit_acc
            }, [] as stringliteral[])
            if (literals.length === decl.value.types.length) {
              // transmute decl type to union of literal
              return [ acc.concat({ ...decl,
                value: { ...decl.value,
                  types: literals
                }
              }), removed.concat(interfaces.map(i => i.name))]
            }
            break
          }
        }
        break
      }
      case 'interface': {
        // warning!! the hidden assumption here is that interface comes after union type
        if (removed.includes(decl.name)) {
          return [acc, removed]
        }
      }
    }
    return [acc.concat(decl), removed]
  }, [[], []] as [decl[], string[]])
  return res[0]
}

/**
 * Simplifies unions of single interface to pojo type.
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
 * @returns simplified list of declarations
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
 * Fixes duplicated interface fields names: the type generation generates interface with duplicate field names.
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
const fixUniqueFields = (decls: decl[]) : decl[] => {
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

/**
 * Removes duplicated declarations
 * @param decls
 * @returns
 */
const fixUniqueDecls = (decls: decl[]) : decl[] => {
  const acc: [string[], decl[]] = decls.reduce(([acc_ids, acc_decls], decl) => {
    if (acc_ids.includes(decl.name)) {
      return [acc_ids, acc_decls]
    } else {
      return [acc_ids.concat(decl.name), acc_decls.concat(decl)]
    }
  }, [[], []] as [string[], decl[]])
  return acc[1]
}

export const transformDecls = (decls: decl[]) : decl[] => {
  return pipeline<decl[]>(
    fixUniqueDecls,       // mandatory
    fixUniqueFields,      // mandatory
    simplifySingleUnion,
    simplifyLiteralUnion,
    simplifySingleFieldPojo
  )(decls)
}