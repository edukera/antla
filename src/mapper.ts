/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */

import { alternatives, element, grammarSpec, suffix } from "./grammar";
import { tokenDataBase } from "./tokendb";
import { decl, field, tsType } from "./types";
import { capitalize, minimize } from "./utils";

const tokenDB = new tokenDataBase()

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

const eltToKeyword = (elt: element) : string => {
  switch (elt.value.type) {
    case 'terminal': {
      if (tokenDB.isKeywork(elt.value.value)) {
        return elt.value.value.toLowerCase()
      }
    }
  }
  return ''
}

const suffixToName = (suffix: suffix) : string => {
  switch (suffix) {
    case '*': return 'Star'
    case '+': return 'Plus'
    case '?': return 'Qmark'
  }
}

const eltToName = (elt: element) : string => {
  switch (elt.value.type) {
    case 'terminal': {
      return tokenDB.nameToken(elt.value.value)
    }
    case 'ruleRef': {
      return elt.value.value
    }
    case 'ebnf': {
      const alternatives = elt.value.block
      return alternatives.reduce((acc, alt) => {
        return acc + altToName(alt)
      }, "") + (elt.value.suffix ? suffixToName(elt.value.suffix) : '')
    }
    case 'action': return ''
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

const eltToDecls = (elt: element) : [field, decl[]] => {
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
      const decls = alternativesToDecls(elt.value.block)
      const name = decls[0].name
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
  const fields = alt.map(elt => eltToDecls(elt)[0])
  return fields.reduce((acc, field) => {
    return mergeField(acc, field)
  })
}

const altToName = (alt: alternatives) : string => {
  const keywords = alt.reduce((acc, elt) => {
    return acc + capitalize(eltToKeyword(elt))
  }, '')
  if ('' === keywords) {
    return alt.reduce((acc, elt) => {
      return acc + capitalize(eltToName(elt))
    }, '')
  } else return keywords
}

const altToDecls = (alt : alternatives, rule ?: string) : [decl, decl[]] => {
  // need to agglutinate non multiple tokens
  const allNonMultiple = alt.every(elt => !isMultiple(elt))
  var [fields, decls] : [field[], decl[]] = [[], []]
  if (allNonMultiple && alt.length > 1) {
    fields.push(terminalsToField(alt))
  } else {
    [fields, decls] = alt.reduce(([acc_fields, acc_decls], elt) => {
      if (isMultiple(elt) || alt.length === 1) {
        const [field, ebnf_decls] = eltToDecls(elt)
        return [acc_fields.concat(applySuffix(field, elt.suffix)), acc_decls.concat(ebnf_decls)]
      } else {
        return [acc_fields, acc_decls]
      }
    }, [[], []] as [field[], decl[]])
  }
  const baseName = altToName(alt)
  const name = baseName + capitalize(rule ?? '')
  const decl : decl = {
    type: 'interface',
    name: name,
    value: { type: 'pojo', fields : fields },
    extends: { type: 'ref', name: 'withType', genericarg: name }
  }
  return [decl, decls]
}

const alternativesToDecls = (alternatives: alternatives[], rule ?: string) : [decl, ...decl[]] => {
  const [decls, otherdecls, name] = alternatives.reduce(([acc_decls, acc_others, acc_name], alt) => {
    const [decl, others] = altToDecls(alt, rule)
    const name = acc_name + capitalize(decl.name)
    const idecl = { ...decl, name: 'I' + decl.name }
    return [acc_decls.concat(idecl), acc_others.concat(others), name]
  }, [[], [], ''] as [decl[], decl[], string])
  const decl = {
    type: 'type',
    name: rule ?? name,
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
        return acc.concat(alternativesToDecls(r.definition, r.name))
      }
      case 'lexerRuleSpec': return acc
    }
  }, [] as decl[])
}
