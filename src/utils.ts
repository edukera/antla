export const tokenTranslation : { [token: string]: string; } = {
  '(' : 'lBr',
  ')' : 'rBr',
  '{' : 'lCBr',  // left curly bracket
  '}' : 'rCBr',  // right curly bracket
  '+' : 'plus',
  '-' : 'min',
  '*' : 'mult',
  '/' : 'div',
  ':' : 'col',   // colon
  ';' : 'scol',  // semi-colon
  '=' : 'eq',
  '!=' : 'nEq',
  '==' : 'isEq',
  '<' : 'lT',
  '>' : 'gT',
  '<=' : 'lTEq',
  '>=' : 'gTEq',
  '&' : 'and',
  '|' : 'or',
  '^' : 'xor',
  '%' : 'mod',
  '!' : 'not',
  '&&' : 'lAnd',
  '||' : 'lOr',
  '<<' : 'shL',  // shift left
  '>>' : 'shR',  // shift right
  '>>>': 'uShR', // unsigned shift right
  '<<<': 'uShL', // unsigned shiff left
  'eof': 'eof'
}

export function capitalize(string: string): string {
  if (string.length === 0) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function minimize(string: string): string {
  if (string.length === 0) return "";
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export function zip<T, U>(array1: T[], array2: U[]): [T, U][] {
  const length = Math.min(array1.length, array2.length);
  const result: [T, U][] = [];

  for (let i = 0; i < length; i++) {
    result.push([array1[i], array2[i]]);
  }

  return result;
}