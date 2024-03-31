/**
 * Project Name: antlrMinAST
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */

import { alternatives, atom, ebnf, element, grammarSpec, parserRuleSpec, ruleRef, terminalDef } from "./grammar";
import { tsType, pojo, decl, field, interfaceDecl, typeDecl } from "./types";
import { capitalize, minimize, tokenTranslation } from "./utils";

const dummyTypeDecl : decl = { type: 'type', name: 'dummy', value: { type: 'literal', value: 'dummy' } }

type rules = {
  parsers: string[]
  lexers: string[]
}

const makeRulesData = (gSpec: grammarSpec) : rules => {
  return gSpec.rules.reduce((acc, r) => {
    switch (r.type) {
      case 'parserRuleSpec': return { ...acc, parsers: [ ...acc.parsers, r.name ] }
      case 'lexerRuleSpec': return { ...acc, lexers: [ ...acc.lexers, r.name ] }
    }
  }, { parsers: [], lexers: [] } as rules)
}

const makeEbnfield = (ebnf: ebnf, i: number, count: number) : field => {
  return {
    name: 'toto',
    ftype : dummyTypeDecl.value,
    optional: false
  }
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

const makeTerminalField = (tal: terminalDef, i: number, count: number) : field[] => {
  return [{
    name: 'field' + (count === 1) ? '' : ('' + i),
    ftype: {
      type: 'ref',
      name: tal.value
    },
    optional: false
  }]
}

type elementCount = {
  rules: { [key: string] : number }
  tokens: number
}

const hasNodeRef = (ebnf : ebnf) : boolean => {
  return ebnf.block.list.reduce((acc, alt) => {
    return alt.reduce((acc, elt) => {
      switch (elt.type) {
        case 'ruleRef': return acc || true
        default: return acc || false
      }
    }, acc)
  }, false)
}

const isUnique = (alt: terminalDef, rules: rules) : boolean => {
  // The assumption here is that a lexer rule defines a non unique token ...
  // TODO: fix this !
  if (rules.lexers.includes(alt.value)) {
    return false
  }
  return true
}

const countElement = (alts: alternatives, rules: rules) : elementCount => {
  const init : elementCount = { rules: {}, tokens: 0 }
  return alts.reduce((acc, alt) => {
    switch (alt.type) {
      case 'ruleRef':
        if (acc.rules[alt.value] === undefined) {
          acc.rules[alt.value] = 1
        } else {
          acc.rules[alt.value] ++
        }
        break
      case 'terminal':
        if (false === isUnique(alt, rules)) {
          // only non unique terminal token count as field
          acc.tokens ++
        }
        break
      case 'ebnf':
        if (hasNodeRef(alt)) {
          throw new Error(`ebnf with rule ref not handled: ${alt}`)
        } else {
          acc.tokens ++
        }
        break
      case 'action': throw new Error(`Action not handled: ${JSON.stringify(alt, null, 2)}`)
    }
    return acc
  }, init)
}

const terminalToName = (tle: terminalDef, rules: rules) : string => {
  if (rules.lexers.includes(tle.value)) {
    return capitalize(tle.value.toLowerCase())
  }
  const translation = tokenTranslation[tle.value.toLowerCase()]
  if (translation === undefined) {
    throw new Error(`Cannot translate '${tle.value}'`)
  }
  return translation
}

const ebnfToName = (ebnf: ebnf, rules: rules, ruleName : string ) : string => {
  return ebnf.block.list.reduce((acc, elts) => {
    return elts.reduce((acc, elt) => {
      var name = ''
      switch (elt.type) {
        case 'terminal':
          name = terminalToName(elt, rules)
          break
        default: throw new Error(`ebnfToName, type not handled: ${elt.type}`)
      }
      return acc + capitalize(name)
    }, acc)
  }, '')
}

/**
 * Builds the name of the type that corresponds to the alternatives.
 * Only tokens participate in the name creation.
 * @param alts alternatives
 * @param rules rules' data
 * @param counts element counts (rules, tokens)
 * @returns type name for alternatives
 */
const altToTypeName = (alts: alternatives, rules: rules, counts: elementCount, ruleName: string) : string => {
  return alts.reduce((acc, alt) => {
    var name = ""
    switch (alt.type) {
      case 'ruleRef':
        if (ruleName !== alt.value) {
          name = alt.value
        }
        break
      case 'terminal':
        name = terminalToName(alt, rules)
        break
      case 'ebnf':
        name = ebnfToName(alt, rules, ruleName)
        break
      case 'action':
        throw new Error(`Action not handled ${alt}`)
    }
    return acc + capitalize(name)
  }, "")
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
  const baseName = altToTypeName(alts, rules, counts, ruleName)
  const name = minimize(baseName) + capitalize(ruleName)
  console.log(name)
  const acc : [number, number, field[]] = [0, 0, []]
  const res : [number, number, field[]] = alts.reduce(([ruleIdx, tokenIdx, fields], elt) => {
    switch (elt.type) {
      case 'ruleRef':
        const newRuleIdx = ruleIdx + 1
        return [ newRuleIdx, tokenIdx, fields.concat(makeRefField(elt, newRuleIdx, counts.rules[elt.value]))]
      case 'terminal':
        if (false === isUnique(elt, rules)) {
          const newTokenIdx = tokenIdx + 1
          return [ ruleIdx, newTokenIdx, fields.concat(makeTerminalField(elt, newTokenIdx, counts.tokens)) ]
        } else {
          return [ ruleIdx, tokenIdx, fields ]
        }
      case 'ebnf':
        // TODO: what to do when ebnf has token AND rule ...
        // fix this!
        const newTokenIdx = tokenIdx + 1
        return [ ruleIdx, newTokenIdx, fields.concat(makeEbnfield(elt, newTokenIdx, counts.tokens)) ]
      case 'action':
        throw new Error(`altToDecl, action not handled: ${elt}`)
    }
  }, acc)
  return {
    type: 'interface',
    name: name,
    fields: res[2],
    extends: {
      type: 'ref',
      name: 'withType',
      genericarg: name
    }
  }
  return dummyTypeDecl
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

const parserRuleToDecls = (r: parserRuleSpec, rules : rules) : decl[] => {
  console.log(r.name)
  const decls = r.definition.map((alts, i) => altToDecl(alts, rules, r.name))
  if (decls.length === 1) {
    if (decls[0].type !== 'interface') throw new Error(`unique decl not interface not handled`)
    // replace interface declaration with type decl
    return [ interfaceToType(r.name, decls[0]) ]
  }
  return decls
}

export function grammarToTypes(gSpec : grammarSpec) : decl[] {
  const ruleIds = makeRulesData(gSpec)
  //console.log(JSON.stringify(ruleIds, null, 2))
  return gSpec.rules.reduce((acc, r) => {
    switch (r.type) {
      case 'parserRuleSpec': {
        return acc.concat(parserRuleToDecls(r, ruleIds))
      }
      case 'lexerRuleSpec': return acc
    }
  }, [] as decl[])
}
