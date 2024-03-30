/**
 * Project Name: antlrMinAST
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */

import { alternatives, atom, grammarSpec, parserRuleSpec, ruleRef } from "./grammar";
import { tsType, pojo, decl, field } from "./types";

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

const makeField = (ref: ruleRef, i: number) : field => {
  return {
    name: ref.value + i,
    ftype: {
      type: 'ref',
      name: ref.value
    },
    optional: false
  }
}

const makePojo = (refs: ruleRef[]) : pojo => {
  return {
    type: 'pojo',
    fields: refs.map(makeField)
  }
}

const makeTypeDecl = (name: string, idx: number, alt: alternatives) : decl => {
  const refs = alt.filter(elt => elt.type === 'ruleRef') as ruleRef[]
  if (refs.length > 0) {
    return {
      type: 'type',
      name: name + idx,
      value: makePojo(refs)
    }
  } else return dummyTypeDecl
}

const parserRuleToTypes = (r: parserRuleSpec, rulesData : rules) : decl[] => {
  const decls = r.definition.map((elts, i) => makeTypeDecl(r.name, i+1, elts))
  if (decls.length === 1) {
    decls[0].name = r.name
  }
  return decls
}

export function grammarToTypes(gSpec : grammarSpec) : decl[] {
  const ruleIds = makeRulesData(gSpec)
  //console.log(JSON.stringify(ruleIds, null, 2))
  return gSpec.rules.reduce((acc, r) => {
    switch (r.type) {
      case 'parserRuleSpec': {
        return acc.concat(parserRuleToTypes(r, ruleIds))
      }
      case 'lexerRuleSpec': return acc
    }
  }, [] as decl[])
}
