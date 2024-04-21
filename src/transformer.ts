/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-04-07
 */
import { count } from "console"

import { array, decl, field, interfaceDecl, pojo, ref, stringliteral, tsType, union } from "./types"
import { pipeline } from "./utils"

/******************************************************************************
 * MARK:Utils
 ******************************************************************************/

const getDecl = (name : string, decls: decl[]) : decl => {
  for(var i=0; i < decls.length; i++) {
    if (decls[i].name === name) {
      return decls[i]
    }
  }
  throw new Error(`Cannot find decl '${name}'`)
}

const isSimpleType = (typ: tsType, isRefSimple: boolean = true) : boolean => {
  switch (typ.type) {
    case 'ref': return isRefSimple
    case 'literal':
    case 'atom': return true
    case 'union': {
      return typ.types.every(t => isSimpleType(t, false))
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

const countRefInDecls = (decls: decl[], name: string) : number => {
  return decls.reduce((acc, decl) => {
    return acc + countRef(decl.value, name)
  }, 0)
}

const removeDecls = (decls: decl[], toberemoved: string[]) : decl[] => {
  return decls.filter(decl => !toberemoved.includes(decl.name))
}

/******************************************************************************
 * MARK: Transformers
 ******************************************************************************/

const removeSingleDecls = (decls: decl[]) : decl[] => {
  const toBeRemoved = decls.reduce((acc, decl) => {
    switch (decl.type) {
      case 'type': {
        switch (decl.value.type) {
          case 'union': {
            if (decl.value.types.length > 1) {
              break
            }
          }
          case 'ref': {
            const nbOccurences = countRefInDecls(decls, decl.name)
            if (nbOccurences === 0) {
              return acc.concat(decl.name)
            }
            break
          }
        }
      }
    }
    return acc
  }, [] as string[])
  return removeDecls(decls, toBeRemoved)
}

const reduceFieldType = (typ: tsType, equalities: { [key: string]: string }) : tsType => {
  const reduce = (s: string) : string => {
    if (equalities.hasOwnProperty(s)) {
      return reduce(equalities[s])
    } else {
      return s
    }
  }
  switch (typ.type) {
    case 'ref': {
      return { ...typ,
        name: reduce(typ.name)
      }
    }
    case 'array': {
      switch (typ.arg.type) {
        case 'ref': {
          return { ...typ,
            arg: { ...typ.arg,
              name: reduce(typ.arg.name)
            }
          }
        }
      }
    }
  }
  return typ
}

/**
 * See 'Simplifications' section in README.md
 * @param decls
 * @returns
 */
const reduceInterfaceFieldType = (decls: decl[]) : decl[] => {
  // 1) collect equalities
  const equalities = decls.reduce((acc, decl) => {
    switch (decl.type) {
      case 'interface': {
        if (decl.value.fields.length === 1 && decl.value.fields[0].optional === false) {
          switch(decl.value.fields[0].ftype.type) {
            case 'ref': {
              const ref = decl.value.fields[0].ftype.name
              if (!acc.hasOwnProperty(ref)) {
                acc[decl.name] = ref
              }
              break
            }
            case 'array': {
              const arg = decl.value.fields[0].ftype.arg
              switch (arg.type) {
                case 'ref': {
                  const ref = arg.name
                  if (!acc.hasOwnProperty(ref)) {
                    acc[decl.name] = ref
                  }
                  break
                }
              }
            }
          }
        }
        break
      }
      case 'type': {
        switch (decl.value.type) {
          case 'ref': {
            acc[decl.name] = decl.value.name
            break
          }
          case 'union': {
            if (decl.value.types.length === 1) {
              switch (decl.value.types[0].type) {
                case 'ref': {
                  const ref = decl.value.types[0].name
                  if (!acc.hasOwnProperty(decl.name)) {
                    acc[decl.name] = ref
                  }
                  break
                }
              }
            }
          }
        }
        break
      }
    }
    return acc
  }, {} as { [key: string]: string })
  // 2) Reduce interface field type
  const replaceFields = (fields: field[], eqs: { [key: string]: string }) : field[] => {
    return fields.map(field => {
      const reduced_type = reduceFieldType(field.ftype, eqs)
      return { ...field,
        ftype: reduced_type
      }
    })
  }
  return decls.map(decl => {
    switch (decl.type) {
      case 'interface' : {
        return { ...decl,
          value: { ...decl.value,
            fields: replaceFields(decl.value.fields, equalities)
          }
        }
      }
      case 'type' : {
        switch (decl.value.type) {
          case 'pojo': {
            return { ...decl,
              value: { ...decl.value,
                fields: replaceFields(decl.value.fields, equalities)
              }
            }
          }
        }
      }
    }
    return decl
  })
}

/**
 * Replaces a ref by its definition if the referenced type is used only once:
 * type T = t      // ref to t
 * type t = <...>
 * simplifies to:
 * type T = <...>
 * @param decls
 * @returns
 */
const reduceSingleRef = (decls: decl[]) : decl[] => {
  const res : [decl[], string[], string[]] = decls.reduce(([acc, reduced, toBeRemoved], decl) => {
    switch (decl.type) {
      case 'type': {
        switch (decl.value.type) {
          case 'ref': {
            var referenced = getDecl(decl.value.name, decls)
            //while (reduced.includes(referenced.name)) {
            //  // lookup in toBeremoved
            //  referenced
            //}
            const nbOccurences = countRefInDecls(decls, decl.value.name)
            if (nbOccurences === 1) {
              // reduce it
              return [ acc.concat({ ...decl,
                value: referenced.value
              }), reduced.concat(decl.name), toBeRemoved.concat(referenced.name) ]
            }
          }
        }
      }
    }
    return [ acc.concat(decl), reduced, toBeRemoved ]
  }, [[], [], []] as [decl[], string[], string[]])
  return removeDecls(res[0], res[2])
}

/**
 * Inlines type in interface in the following situation:
 * interface I extends<> {
 *   f: t
 * }
 * type t = {
 *   f1: T1
 *   f2: T2
 * }
 * is simplified to:
 * interface I extends<> {
 *   f1: T1
 *   f2: T2
 * }
 * It is necessary that t is not used somewhere else (i.e. countRefs === 1)
 * @param decls
 * @returns
 */
const inlineFieldSingleType = (decls: decl[]) : decl[] => {
  // for interface with a single field
  const res : [decl[], string[]] = decls.reduce(([acc, toBeRemoved], decl) => {
    switch (decl.type) {
      case 'interface': {
        const res : [field[], string[]] = decl.value.fields.reduce(([acc_fields, fieldToBeRemoved], field) => {
          // check field type
          switch (field.ftype.type) {
            case 'ref': {
              // check if ref type is used only here
              const count = countRefInDecls(decls, field.ftype.name)
              if (count === 1 && field.optional === false) {
                // inline
                const refDecl = getDecl(field.ftype.name, decls)
                switch (refDecl.type) {
                  case 'type': {
                    switch (refDecl.value.type) {
                      case 'pojo': {
                        return [acc_fields.concat(refDecl.value.fields), fieldToBeRemoved.concat(field.ftype.name)]
                      }
                    }
                  }
                }
              }
            }
          }
          return [acc_fields.concat(field), fieldToBeRemoved]
        }, [[], toBeRemoved] as [field[], string[]])
        return [acc.concat({ ...decl,
          value: { ...decl.value,
            fields: res[0]
          }
        }), res[1]]
      }
    }
    return [acc.concat(decl), toBeRemoved]
  }, [[], []] as [decl[], string[]])
  return removeDecls(res[0], res[1])
}

/******************************************************************************
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
 ******************************************************************************/
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

/******************************************************************************
 * Simplies pojo types with single field. For example from 'Expr.g4':
 * type file_ = {
 *     equations: equation[];
 * };
 * is simplified to
 * type file_ = equation[];
 * @param decls
 * @returns simplified declarations
 ******************************************************************************/
const simplifySingleFieldPojo = (decls: decl[]) : decl[] => {
  return decls.reduce((acc, decl) => {
    switch (decl.type) {
      case 'type': {
        switch (decl.value.type) {
          case 'pojo': {
            if (decl.value.fields.length === 1 && decl.value.fields[0].optional === false) {
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

/******************************************************************************
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
 ******************************************************************************/
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
    }
    return [acc.concat(decl), removed]
  }, [[], []] as [decl[], string[]])
  return removeDecls(res[0], res[1].filter(name => countRefInDecls(res[0], name) === 0))
}

/******************************************************************************
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
 ******************************************************************************/
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
                // transmute union to pojo or ref if only one field
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
    }
    return [ acc.concat(decl), removed ]
  }, [[], []] as [ decl[], string[] ])
  return removeDecls(res[0], res[1])
}

/******************************************************************************
 * Fixes duplicated interface fields names: the type generation generates
 * interface with duplicate field names.
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
 ******************************************************************************/
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

/******************************************************************************
 * Removes duplicated declarations
 * @param decls
 * @returns
 ******************************************************************************/
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

/******************************************************************************
 * withType and Error types must escape all tranforms
 * @param decls
 * @returns
 *****************************************************************************/

const addErrorType = (decls: decl[]) : decl[] => {
  const errorType : decl = {
    type: 'interface',
    name: 'Error',
    value: {
      type: 'pojo',
      fields: [{
        name: 'slice',
        ftype: {
          type: 'atom',
          name: 'string'
        },
        optional: false
      }]
    },
    extends: {
      type: 'ref',
      name: 'withType',
      genericarg: 'IError'
    }
  }
  return [errorType, ...decls]
}

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

/******************************************************************************
 * MARK:Pipeline
 ******************************************************************************/
export const transformDecls = (decls: decl[]) : decl[] => {
  return pipeline<decl[]>(
    addErrorType,
    fixUniqueFields,      // mandatory
    fixUniqueDecls,       // mandatory
    simplifySingleUnion,
    simplifyLiteralUnion,
    simplifySingleFieldPojo,
    inlineFieldSingleType,
    reduceSingleRef,
    inlineSimpleTypes,
    reduceInterfaceFieldType,
    removeSingleDecls,    // mandatory
    addWithType           // mandatory, final
  )(decls)
}

// tfpdef2