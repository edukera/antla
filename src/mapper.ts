/**
 * Project Name: antlrMinAST
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */

import { alternatives, atom, ebnf, element, grammarSpec, parserRuleSpec, ruleRef, terminalDef, suffix } from "./grammar";
import { tsType, pojo, decl, field, interfaceDecl, typeDecl, union, ref } from "./types";
import { capitalize, minimize, tokenTranslation, zip } from "./utils";

/******************************************************************************
 * type withType<T> = { type: T }
 ******************************************************************************/
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

/******************************************************************************
 * EBNF generic reducer over grammar specification
 ******************************************************************************/

const genericEBNFReducer = <T>() => (
  g          : grammarSpec,
  reduceEBNF : (elt : ebnf) => T,        /* ebnf reducer */
  concatAcc  : (acc: T[], t: T) => T[]   /* accumulator  */
): T[] => {
  return g.rules.reduce((acc, r) => {
    switch (r.type) {
      case 'parserRuleSpec':
        return r.definition.reduce((acc1, alternives) => {
          return alternives.reduce((acc2, elt) => {
            switch (elt.value.type) {
              case 'ebnf': return concatAcc(acc2, reduceEBNF(elt.value))
              default: return acc2
            }
          }, acc1)
        }, acc)
      default: return acc
    }
  }, [] as T[])
};

/******************************************************************************
 * Generate token types from ebnfs token definitions
 ******************************************************************************/

const eltToType = (elt: element, rules: rules) : tsType => {
  switch (elt.value.type) {
    case 'terminal':
      return terminalToType(elt.value, rules)
    default: throw new Error(`eltToType: element not handled ${elt}`)
  }
}

const altsToType = (alts: alternatives, rules: rules) : tsType => {
  const types = alts.reduce((acc, elt) => {
    return acc.concat(eltToType(elt, rules))
  }, [] as tsType[])
  if (types.length === 1) {
    return types[0]
  } else {
    throw new Error('Alternatives with more than 1 element not handled')
  }
}

const ebnftoType = (ebnf: ebnf, rules: rules) : tsType => {
  switch (ebnf.block.type) {
    case 'ebnfList':
      const types = ebnf.block.list.reduce((acc, alts) => {
        return acc.concat(altsToType(alts, rules))
      }, [] as tsType[])
      return {
        type: 'union',
        types: types
      }
  }
}

const ebnfToName = (ebnf: ebnf, ruleName: string, rules: rules) : string => {
  switch (ebnf.block.type) {
    case 'ebnfList':
      const nameComponents = ebnf.block.list.reduce((acc, alts) => {
        return acc.concat(altToTypeName(alts, ruleName, rules))
      }, [] as string[])
      return nameComponents.join('')
  }
}

const makeEbnfTypeDecls = (g: grammarSpec, ruleName: string, rules: rules) : decl[] => {
  const types = genericEBNFReducer<tsType>()(g, ebnf => ebnftoType(ebnf, rules), (ts, t) => ts.concat(t))
  const names = genericEBNFReducer<string>()(g, ebnf => ebnfToName(ebnf, ruleName, rules), (ts, t) => ts.concat(t))
  return zip(names, types).reduce((acc, [baseName, type]) => {
    return acc.concat({
      type: 'type',
      name: makeEbnfTypeName(baseName),
      value: type
    })
  }, [] as decl[])
}

/******************************************************************************
 * Rules data
 ******************************************************************************/

type rules = {
  parsers: string[] // list of parser rule names
  lexers: { [key: string] : boolean } // whether lexer rule is terminal or not
  tokens: { [key: string] : string } // token transaltion when lexers[key] is true
  lexerTypes: { [key: string] : tsType } // token type when lexers[key] is false
}

const makeRulesData = (gSpec: grammarSpec) : rules => {
  return gSpec.rules.reduce((acc, r) => {
    switch (r.type) {
      case 'parserRuleSpec': return { ...acc, parsers: [ ...acc.parsers, r.name ] }
      case 'lexerRuleSpec': {
        acc.lexers[r.name] = r.definition.type === 'singleToken'
        if (r.definition.type === 'singleToken') {
          acc.tokens[r.name] = r.definition.value
        }
        return acc
      }
    }
  }, { parsers: [], lexers: {}, tokens: {}, lexerTypes: {
    'INT': { type: 'atom', name: 'number' },
    'SCIENTIFIC_NUMBER' : { type: 'atom', name: 'number' },
    'VARIABLE' : { type: 'atom', name: 'string' }
  } } as rules)
}

/******************************************************************************
 * Pojo's fields type and name
 ******************************************************************************/

const makeEbnfTypeName = (name: string) : string => {
  return minimize(name) + 'Type'
}

const makeEbnfield = (ebnf: ebnf, i: number, ruleName: string, count: number, rules: rules) : field => {
  const ebnfName = ebnfToName(ebnf, ruleName, rules)
  return applySuffix({
    name: hasNodeRef(ebnf) ? ebnfName : 'token' + (count === 1 ? '': '' + i),
    ftype : {
      type: 'ref',
      name: makeEbnfTypeName(ebnfName)
    },
    optional: false
  }, ebnf.suffix)
}

const makeRefField = (ref: ruleRef, i: number, count: number) : field => {
  return {
    name: ref.value + ((count === 1) ? '' : ('' + i)),
    ftype: {
      type: 'ref',
      name: ref.value
    },
    optional: false
  }
}

const terminalToType = (tal: terminalDef, rules: rules) : tsType => {
  if (false === isUnique(tal, rules) && tal.value in rules.lexerTypes) {
    return rules.lexerTypes[tal.value]
  } else {
    return {
      type: 'literal',
      value: rules.tokens[tal.value]
    }
  }
}

const makeTerminalField = (tal: terminalDef, i: number, count: number, rules: rules) : field => {
  const fieldName = 'field' + ((count === 1) ? '' : ('' + i))
  return {
    name: fieldName,
    ftype: terminalToType(tal, rules),
    optional: false
  }
}

type elementCount = {
  rules: { [key: string] : number }
  tokens: number
}

const hasNodeRef = (ebnf : ebnf) : boolean => {
  return ebnf.block.list.reduce((acc, alt) => {
    return alt.reduce((acc, elt) => {
      switch (elt.value.type) {
        case 'ruleRef': return acc || true
        default: return acc || false
      }
    }, acc)
  }, false)
}

const isUnique = (alt: terminalDef, rules: rules) : boolean => {
  if ((alt.value) in rules.lexers) {
    return rules.lexers[alt.value]
  }
  return true
}

/******************************************************************************
 * Count elements for naming
 ******************************************************************************/

const countElement = (alts: alternatives, rules: rules) : elementCount => {
  const init : elementCount = { rules: {}, tokens: 0 }
  return alts.reduce((acc, elt) => {
    switch (elt.value.type) {
      case 'ruleRef':
        if (acc.rules[elt.value.value] === undefined) {
          acc.rules[elt.value.value] = 1
        } else {
          acc.rules[elt.value.value] ++
        }
        break
      case 'terminal':
        if (false === isUnique(elt.value, rules)) {
          // only non unique terminal token count as field
          acc.tokens ++
        }
        break
      case 'ebnf':
        if (hasNodeRef(elt.value)) {
          throw new Error(`ebnf with rule ref not handled: ${elt}`)
        } else {
          acc.tokens ++
        }
        break
      case 'action': throw new Error(`Action not handled: ${JSON.stringify(elt, null, 2)}`)
    }
    return acc
  }, init)
}

const terminalToName = (tle: terminalDef, rules: rules) : string => {
  if (tle.value in rules.lexers) {
    return capitalize(tle.value.toLowerCase())
  }
  const translation = tokenTranslation[tle.value.toLowerCase()]
  if (translation === undefined) {
    throw new Error(`Cannot translate '${tle.value}'`)
  }
  return capitalize(translation)
}

/**
 * Builds the name of the type that corresponds to the alternatives.
 * Only tokens participate in the name creation.
 * @param alts alternatives
 * @param rules rules' data
 * @returns type name for alternatives
 */
const altToTypeName = (alts: alternatives, ruleName: string, rules: rules) : string => {
  return alts.reduce((acc, elt) => {
    var name = ""
    switch (elt.value.type) {
      case 'ruleRef':
        if (ruleName !== elt.value.value) {
          name = elt.value.value
        }
        break
      case 'terminal':
        name = terminalToName(elt.value, rules)
        break
      case 'ebnf':
        name = ebnfToName(elt.value, ruleName, rules)
        break
      case 'action':
        throw new Error(`Action not handled ${elt}`)
    }
    return acc + capitalize(name)
  }, "")
}

const applySuffix = (field : field, suffix: suffix | undefined) : field => {
  if (suffix !== undefined) {
    switch (suffix) {
      case '*':
      case '+': // TODO: use type NonEmptyArray<T> = [T, ...T[]] for '+' ?
        return { ...field,
          name: field.name + 's',
          ftype: {
            type: 'array',
            arg : field.ftype
          }
        }
      case '?':
        return { ...field, optional: true }
    }
  } else {
    return field
  }
}

/**
 * Makes an interface declaration from an alternative.
 * Each element is folded:
 * - a parser rule is named as the rule plus the element index
 * - tokens are named 'token' plus the element index
 * The thing is that each element has to be counted first to know whether to suffix with index
 * @param alts alternatives, that the list of elements
 * @param rules rules data
 * @returns interface declaration
 */
const altToDecl = (alts: alternatives, rules: rules, ruleName: string) : decl => {
  const counts = countElement(alts, rules)
  console.log(counts)
  const baseName = altToTypeName(alts, ruleName, rules)
  const name = minimize(baseName) + capitalize(ruleName)
  console.log(name)
  type Acc = [number, number, field[]]
  const acc : Acc = [0, 0, []]
  const res : Acc = alts.reduce(([ruleIdx, tokenIdx, fields], elt) => {
    switch (elt.value.type) {
      case 'ruleRef': {
        const newRuleIdx = ruleIdx + 1
        const field = applySuffix(makeRefField(elt.value, newRuleIdx, counts.rules[elt.value.value]), elt.suffix)
        return [ newRuleIdx, tokenIdx, fields.concat(field)]
      }
      case 'terminal':
        if (false === isUnique(elt.value, rules)) {
          const newTokenIdx = tokenIdx + 1
          const field = applySuffix(makeTerminalField(elt.value, newTokenIdx, counts.tokens, rules), elt.suffix)
          return [ ruleIdx, newTokenIdx, fields.concat(field) ]
        } else if (alts.length === 1) {
          const field = applySuffix(makeTerminalField(elt.value, tokenIdx, counts.tokens, rules), elt.suffix)
          return [ ruleIdx, tokenIdx, fields.concat(field)]
        } else {
          return [ ruleIdx, tokenIdx, fields ]
        }
      case 'ebnf': {
        // TODO: what to do when ebnf has token AND rule ...
        // fix this!
        const newTokenIdx = tokenIdx + 1
        const field = applySuffix(makeEbnfield(elt.value, newTokenIdx, ruleName, counts.tokens, rules), elt.suffix)
        return [ ruleIdx, newTokenIdx, fields.concat(field) ]
      }
      case 'action':
        throw new Error(`altToDecl, action not handled: ${elt}`)
    }
  }, acc)
  const fields = res[2]
  return {
    type: 'interface',
    name: name,
    fields: fields,
    extends: {
      type: 'ref',
      name: 'withType',
      genericarg: name
    }
  }
}

const interfaceToType = (name: string, decl: interfaceDecl) : typeDecl => {
  return {
    type: 'type',
    name: name,
    value: {
      type: 'pojo',
      fields: decl.fields
    }
  }
}

const declToRef = (decl: decl) : ref => {
  return {
    type: 'ref',
    name: decl.name
  }
}

const parserRuleToDecls = (r: parserRuleSpec, rules : rules) : decl[] => {
  console.log(r.name)
  const decls = r.definition.map((alts, i) => altToDecl(alts, rules, r.name))
  if (decls.length === 1) {
    if (decls[0].type !== 'interface') throw new Error(`unique decl not interface not handled`)
    // replace interface declaration with type decl
    return [ interfaceToType(r.name, decls[0]) ]
  } else {
    const union : decl = {
      type: 'type',
      name: r.name,
      value: {
        type: 'union',
        types: decls.map(declToRef)
      }
    }
    decls.push(union)
  }
  return decls
}

const uniqueDecls = (decls: decl[]) : decl[] => {
  const acc: [string[], decl[]] = decls.reduce(([acc_ids, acc_decls], decl) => {
    if (acc_ids.includes(decl.name)) {
      return [acc_ids, acc_decls]
    } else {
      return [acc_ids.concat(decl.name), acc_decls.concat(decl)]
    }
  }, [[], []] as [string[], decl[]])
  return acc[1]
}

export function grammarToTypes(gSpec : grammarSpec) : decl[] {
  const ruleIds = makeRulesData(gSpec)
  //console.log(JSON.stringify(ruleIds, null, 2))
  const ebnfTypeDecls = makeEbnfTypeDecls(gSpec, "", ruleIds)
  return gSpec.rules.reduce((acc, r) => {
    switch (r.type) {
      case 'parserRuleSpec': {
        return acc.concat(parserRuleToDecls(r, ruleIds))
      }
      case 'lexerRuleSpec': return acc
    }
  }, [withTypeDecl].concat(uniqueDecls(ebnfTypeDecls)))
}
