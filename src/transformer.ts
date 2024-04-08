/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-04-07
 */
import { array, decl, field, interfaceDecl, pojo, ref, stringliteral, tsType, union } from "./types"
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

const isSimpleType = (typ: tsType) : boolean => {
  switch (typ.type) {
    case 'literal':
    case 'atom': return true
    case 'union': {
      return typ.types.every(isSimpleType)
    }
  }
  return false
}

const mapRef = (typ: tsType, refToType: { (r: ref) : tsType }) : tsType => {
  switch (typ.type) {
    case 'ref': return refToType(typ)
    case 'array': return { ...typ,
      arg: mapRef(typ.arg, refToType)
    }
    case 'pojo': return { ...typ,
      fields: typ.fields.map(field => {
        return { ...field,
          ftype: mapRef(field.ftype, refToType)
        }
      })
    }
    case 'union': return { ...typ,
      types: typ.types.map(t => mapRef(t, refToType))
    }
  }
  return typ
}

const countRef = (typ: tsType, name: string) : number => {
  switch (typ.type) {
    case 'ref': {
      return (typ.name === name) ? 1 : 0
    }
    case 'array': return countRef(typ.arg, name)
    case 'pojo': return typ.fields.reduce((acc, field) => {
        return acc + countRef(field.ftype, name)
      }, 0)
    case 'union': return typ.types.reduce((acc, t) => {
      return acc + countRef(t, name)
    }, 0)
  }
  return 0
}

const removeDecls = (decls: decl[], toberemoved: string[]) : decl[] => {
  return decls.filter(decl => !toberemoved.includes(decl.name))
}

/******************************************************************************
 * Transformers
 ******************************************************************************/

/**
 * Inlines simples types: a simple type is either an union of literal, or an atomic type
 * For example from 'Expr.g4':
 * type TimesDiv = "*" | "/";
 * interface expressionTimesDivExpression extends withType<"expressionTimesDivExpression"> {
 *     expression1: expression;
 *     TimesDiv: TimesDiv;
 *     expression2: expression;
 * }
 * is simplified to:
  * interface expressionTimesDivExpression extends withType<"expressionTimesDivExpression"> {
 *     expression1: expression;
 *     TimesDiv: "*" | "/";
 *     expression2: expression;
 * }
 * @param decls
 * @returns
 */
const inlineSimpleTypes = (decls: decl[]) : decl[] => {
  // list simple types to inline
  const simpleTypes = decls.filter(decl => {
      switch (decl.type) {
        case 'type': {
          return isSimpleType(decl.value)
        }
      }
      return false
  })
  const tobeInlined = simpleTypes.reduce((acc, decl) => {
    acc[decl.name] = decl.value
    return acc
  }, {} as { [key: string] : tsType })
  const refto = (tobeInlined: { [key: string] : tsType }) => (ref: ref) : tsType => {
    if (tobeInlined[ref.name] === undefined) {
      return ref
    } else {
      return tobeInlined[ref.name]
    }
  }
  return removeDecls(decls, simpleTypes.map(decl => decl.name)).map(decl => {
    return { ...decl, value: mapRef(decl.value, refto(tobeInlined)) } as decl
  })
}

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
                  if (decl.value.fields.length === 1 && decl.value.fields[0].ftype.type === 'literal') {
                    return lit_acc.concat(decl.value.fields[0].ftype)
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
 * Warning! it is mandatory to check that the single interface is not used by anywhere else!
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
              const name = (decl.value.types[0] as ref).name
              const nbOccurences = decls.reduce((acc, decl) => {
                return acc + countRef(decl.value, name)
              }, 0)
              if (nbOccurences === 1) {
                // trigger simplification
                const interf = getDecl(name, decls) as interfaceDecl
                // transmute union to pojo
                const pojo : pojo = {
                  type: 'pojo',
                  fields: interf.value.fields
                }
                const new_decl : decl = { ...decl,
                  value: pojo
                }
                return [acc.concat(new_decl), removed.concat(name)]
              }
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
        const counts = decl.value.fields.reduce((acc, field, i) => {
          if (undefined === acc[field.name]) {
            acc[field.name] = [i]
          } else {
            acc[field.name].push(i)
          }
          return acc
        }, {} as { [key: string] : number[] })
        return { ...decl,
          value: { type: 'pojo',
            fields: decl.value.fields.reduce((acc, field, i) => {
              const name = field.name + (counts[field.name].length === 1 ? '' : '' + (counts[field.name].indexOf(i)+1))
              return acc.concat({ ...field, name: name })
            }, [] as field[])
          }
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

/**
 * withType type must escape all tranforms
 * @param decls
 * @returns
 */
const addWithType = (decls: decl[]) : decl[] => {
  const withTypeDecl : decl = {
    type: 'type',
    name: 'withType',
    generic: 'T',
    value: {
      type: 'pojo',
      fields: [{
        name: 'type',
        ftype: {
          type: 'ref',
          name: 'T'
        },
        optional: false
      }]
    }
  }
  return [withTypeDecl, ...decls]
}

export const transformDecls = (decls: decl[]) : decl[] => {
  return pipeline<decl[]>(
    fixUniqueDecls,       // mandatory
    fixUniqueFields,      // mandatory
    simplifySingleUnion,
    simplifyLiteralUnion,
    simplifySingleFieldPojo,
    inlineSimpleTypes,
    addWithType
  )(decls)
}