/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */

import { alternatives, element, grammarSpec, rule, suffix, withType } from "./grammar";
import { tokenDataBase } from "./tokendb";
import { decl, field, tsType } from "./types";
import { capitalize, minimize } from "./utils";

const tokenDB = new tokenDataBase()

/**
 * Rule path
 */

interface rule_path extends withType<'rule'> {
  name: string
}
interface alt_path extends withType<"alt"> {
  index: number
}
interface ebnf_path extends withType<'ebnf'> {}

type path_elt = rule_path | alt_path | ebnf_path

type path = path_elt[]

const mkRulePath = (name: string) : path => [{ type: 'rule', name: name }]
const addAltPath = (path: path, idx: number) : path => path.concat({ type: 'alt', index: idx })
const addEbnfPath = (path: path) : path => path.concat({ type: 'ebnf' })

const applySuffix = (field : field, suffix: suffix | undefined) : field => {
  if (suffix !== undefined) {
    switch (suffix) {
      case '*':
      case '+': // TODO: use type ArrayOfAtLeastOne<T> = [T, ...T[]] for '+' ?
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

const eltToKeyword = (elt: element) : string[] => {
  switch (elt.value.type) {
    case 'terminal': {
      if (tokenDB.isKeywork(elt.value.value)) {
        return [elt.value.value.toLowerCase()]
      }
    }
  }
  return []
}

const suffixToName = (suffix: suffix) : string => {
  switch (suffix) {
    case '*': return 'star'
    case '+': return 'plus'
    case '?': return 'qmark'
  }
}

const eltToNameComponents = (elt: element) : string[] => {
  switch (elt.value.type) {
    case 'terminal': {
      return [tokenDB.nameToken(elt.value.value)]
    }
    case 'ruleRef': {
      return [elt.value.value]
    }
    case 'ebnf': {
      // need to cut naming down to "ebnf"
      //return 'ebnf' + (elt.value.suffix ? suffixToName(elt.value.suffix) : '')
      const alternatives = elt.value.block
      return alternatives.reduce((acc, alt) => {
        return acc.concat(altToNameComponents(alt))
      }, [] as string[]).concat(elt.value.suffix ? [suffixToName(elt.value.suffix)] : [])
    }
    case 'action': return []
  }
}

const isMultiple = (elt: element) : boolean => {
  switch (elt.value.type) {
    case 'terminal': {
      const token = elt.value.value
      return tokenDB.isMultiple(token)
    }
    case 'action': return false
  }
  return true
}

const eltToDecls = (elt: element, path: path) : [field, decl[]] => {
  switch (elt.value.type) {
    case 'ruleRef': {
      return [{
        name: elt.value.value, // name will be dedup with a transformer
        ftype: {
          type: 'ref',
          name: elt.value.value,
        },
        optional: false
      }, []]
    }
    case 'terminal': {
      const name = tokenDB.nameToken(elt.value.value)
      const ftype = tokenDB.typeToken(elt.value.value)
      return [{
        name: name,
        ftype: ftype,
        optional: false
      }, []]
    }
    case 'ebnf': {
      const decls = altListToDecls(elt.value.block, addEbnfPath(path))
      const name =  /*mkPathName(path)*/ decls[0].name
      //decls[0].name = name
      return [applySuffix({
        name: minimize(name),
        ftype: {
          type: 'ref',
          name: name
        },
        optional: false
      }, elt.value.suffix), decls]
    }
    case 'action': throw new Error(`Action to decl not handled: '${JSON.stringify(elt)}'`)
  }
}

const mergeField = (f1: field, f2: field) : field => {
  if (f1.ftype.type === 'literal' && f2.ftype.type === 'literal') {
    return {
      name: f1.name + f2.name,
      ftype: {
        type: 'literal',
        value: f1.ftype.value + ' ' + f2.ftype.value
      },
      optional: f1.optional && f2.optional
    }
  }
  throw new Error(`Cannot merge non terminal fields`)
}

const terminalsToField = (alt: alternatives) : field => {
  const fields = alt.map(elt => eltToDecls(elt, [])[0])
  return fields.reduce((acc, field) => {
    return mergeField(acc, field)
  })
}

const altToNameComponents = (alt: alternatives) : string[] => {
  const keywords = alt.reduce((acc, elt) => {
    return acc.concat(eltToKeyword(elt))
  }, [] as string[])
  if (keywords.length === 0) {
    return alt.reduce((acc, elt) => {
      return acc.concat(eltToNameComponents(elt))
    }, [] as string[])
  } else return keywords
}

const mkPathName = (path: path) : string => {
  return path.reduce((acc, pelt) => {
    switch (pelt.type) {
      case 'alt': return acc + pelt.index
      case 'rule': return acc + pelt.name
      case 'ebnf': return acc
    }
  }, "")
}

const mkAlternativesName = (alt: alternatives, path: path) : string => {
  const components = altToNameComponents(alt)
  if (components.length > 5) {
    // alternatives component make it too complex to name from them
    // path is then used to name the alternatives
    return mkPathName(path)
  } else {
    return components.map(capitalize).join('')
  }
}

const makeAltListName = (name: string, path: path) : string => {
  if (path.length === 1) {
    return (path[0] as rule_path).name
  } else return name + 'Type'
}

const altToDecls = (alt : alternatives, path: path) : [decl, decl[]] => {
  // need to agglutinate non multiple tokens
  const allNonMultiple = alt.every(elt => !isMultiple(elt))
  var [fields, decls] : [field[], decl[]] = [[], []]
  if (allNonMultiple && alt.length > 1) {
    fields.push(terminalsToField(alt))
  } else {
    [fields, decls] = alt.reduce(([acc_fields, acc_decls], elt, i) => {
      if (isMultiple(elt) || alt.length === 1) {
        const [field, ebnf_decls] = eltToDecls(elt, addAltPath(path, i))
        return [acc_fields.concat(applySuffix(field, elt.suffix)), acc_decls.concat(ebnf_decls)]
      } else {
        return [acc_fields, acc_decls]
      }
    }, [[], []] as [field[], decl[]])
  }
  const name = 'I' + mkAlternativesName(alt, path)
  const decl : decl = {
    type: 'interface',
    name: name,
    value: { type: 'pojo', fields : fields },
    extends: { type: 'ref', name: 'withType', genericarg: name }
  }
  return [decl, decls]
}

const altListToDecls = (altlist: alternatives[], path: path) : [decl, ...decl[]] => {
  const [decls, otherdecls, name] = altlist.reduce(([acc_decls, acc_others, acc_name], alt, i) => {
    const [decl, others] = altToDecls(alt, addAltPath(path, i))
    const name = acc_name + capitalize(decl.name)
    return [acc_decls.concat(decl), acc_others.concat(others), name]
  }, [[], [], ''] as [decl[], decl[], string])
  const decl = {
    type: 'type',
    name: makeAltListName(name, path),
    value: {
      type: 'union',
      types: decls.map(decl => { return {
        type: 'ref',
        name: decl.name
      } as tsType})
    }
  } as decl
  return [decl, ...otherdecls.concat(decls)]
}

export function grammarToDecls(gSpec : grammarSpec) : decl[] {
  // initialize rule database
  tokenDB.init(gSpec)
  // generate declarations for parser rules
  return gSpec.rules.reduce((acc, r) => {
    switch (r.type) {
      case 'parserRuleSpec': {
        return acc.concat(altListToDecls(r.definition, mkRulePath(r.name)))
      }
      case 'lexerRuleSpec': return acc
    }
  }, [] as decl[])
}
