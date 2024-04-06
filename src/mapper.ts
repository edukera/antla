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

/******************************************************************************
 * Token DataBase
 ******************************************************************************/
const tokenDB = new tokenDataBase()

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
      }, "")
    }
  }
  return "dummy"
}

const isMultiple = (elt: element) : boolean => {
  switch (elt.value.type) {
    case 'terminal': {
      const token = elt.value.value
      return tokenDB.isMultiple(token)
    }
  }
  return true
}

const eltToDecls = (elt: element) : [field, decl[]] => {
  switch (elt.value.type) {
    case 'ruleRef': {
      return [{
        name: elt.value.value, // field name will dedup with a transformer
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
        name: name,
        ftype: {
          type: 'ref',
          name: name
        },
        optional: false
      }, elt.value.suffix), decls]
    }
  }
  return [ { name: 'dummy', ftype: { type: 'atom', name: 'boolean' }, optional: false }, []]
}

const altToName = (alt: alternatives) : string => {
  return alt.reduce((acc, elt) => {
    return acc + capitalize(eltToName(elt))
  }, "")
}

const altToDecls = (alt : alternatives, rule ?: string) : [decl, decl[]] => {
  const [fields, decls] = alt.reduce(([acc_fields, acc_decls], elt) => {
    if (isMultiple(elt) || alt.length === 1) {
      const [field, ebnf_decls] = eltToDecls(elt)
      return [acc_fields.concat(applySuffix(field, elt.suffix)), acc_decls.concat(ebnf_decls)]
    } else {
      return [acc_fields, acc_decls]
    }
  }, [[], []] as [field[], decl[]])
  const baseName = altToName(alt)
  const name = minimize(baseName) + capitalize(rule ?? '')
  const decl : decl = {
    type: 'interface',
    name: name,
    fields: fields,
    extends: { type: 'ref', name: 'withType', genericarg: name }
  }
  return [decl, decls]
}

const alternativesToDecls = (alternatives: alternatives[], rule ?: string) : [decl, ...decl[]] => {
  const [decls, otherdecls, name] = alternatives.reduce(([acc_decls, acc_others, acc_name], alt) => {
    const [decl, others] = altToDecls(alt, rule)
    const name = acc_name + capitalize(decl.name)
    return [acc_decls.concat(decl), acc_others.concat(others), name]
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
  return uniqueDecls(gSpec.rules.reduce((acc, r) => {
    switch (r.type) {
      case 'parserRuleSpec': {
        return acc.concat(alternativesToDecls(r.definition, r.name))
      }
      case 'lexerRuleSpec': return acc
    }
  }, [withTypeDecl]))
}
