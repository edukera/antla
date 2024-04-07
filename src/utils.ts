import { decl } from "./types";

export function capitalize(string: string): string {
  if (string.length === 0) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function minimize(string: string): string {
  if (string.length === 0) return "";
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export const withTypeDecl : decl = {
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