/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */

import { grammarSpec, lexerDefinition } from "./grammar"
import { tsType } from "./types"

export class tokenDataBase {

  private translation : { [token: string]: string; } = {
    '(' : 'lBr',
    ')' : 'rBr',
    '[' : 'lCBr',  // left square bracket
    ']' : 'rCBr',  // right square bracket
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
    '<>' : 'nEq',
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
    '@' : 'at',
    '->' : 'arr',
    'eof' : 'eof',
    '**' : 'pow',
    ',' : 'com',
    '+=' : 'pla',
    '-=' : 'mina',
    '*=' : 'mula',
    '/=' : 'diva',
    '@=' : 'ata',
    '%=' : 'pera',
    '&=' : 'epa',
    '|=' : 'pipa',
    '^=' : 'powa',
    '<<=' : 'shLa',
    '>>=' : 'shRa',
    '**=' : 'ppowa',
    '//=' : 'ddiva',
    '.' : 'dot',
    '...' : '3dot',
    '_' : 'undsc',
    '~' : 'tld',
    '//' : 'ddiv',
    'as' : 'as',
    'newline' : 'nl',
    'indent' : 'idt',
    'dedent' : 'ddt',
    'async' : 'async',
    'def' : 'def',
    'del' : 'del',
    'pass' : 'pass',
    'break' : 'br',
    'continue' : 'cont',
    'return' : 'ret',
    'raise' : 'rai',
    'from' : 'fr',
    'import' : 'imp',
    'global' : 'glob',
    'nonlocal' : 'noloc',
    'assert' : 'asrt',
    'if' : 'if',
    'elif' : 'elif',
    'else' : 'el',
    'while' : 'whi',
    'for' : 'for',
    'in' : 'in',
    'try' : 'try',
    'finally' : 'fin',
    'with' : 'wth',
    'except' : 'expt',
    'match' : 'mtch',
    'case' : 'case',
    'switch' : 'swch',
    'none' : 'nne',
    'true' : 'tru',
    'false' : 'fls',
    'lambda' : 'lbd',
    'or' : 'or',
    'and' : 'and',
    'not' : 'not',
    'is' : 'is',
    "await" : 'awt',
    'class' : 'cls',
    'yield' : 'yld'
  }

  // list of parser rule names
  private parsers: string[]

  // whether lexer rule is terminal or not
  private lexers: { [key: string] : boolean }

  // token transaltion when lexers[key] is true
  private tokens: { [key: string] : string }

  // token type when lexers[key] is false
  private lexerTypes: { [key: string] : tsType }

  constructor() {
    this.parsers = []
    this.lexers = {}
    this.tokens = {}
    this.lexerTypes = {}
  }

  public init(g: grammarSpec) {
    g.rules.forEach(r => {
      switch (r.type) {
        case 'parserRuleSpec': {
          this.parsers.push(r.name)
          break
        }
        case 'lexerRuleSpec': {
          this.lexers[r.name] = r.definition.type === 'singleToken'
          if (r.definition.type === 'singleToken') {
            this.tokens[r.name] = r.definition.value
          }
        }
      }
    })
    // TODO: for the moment, lexer types are hard coded here
    // they should be provided by the user
    this.lexerTypes = {
      'INT'               : { type: 'atom', name: 'number' },
      'NUMBER'            : { type: 'atom', name: 'number' },
      'SCIENTIFIC_NUMBER' : { type: 'atom', name: 'number' },
      'VARIABLE'          : { type: 'atom', name: 'string' },
      'STRING'            : { type: 'atom', name: 'string' },
      'NAME'              : { type: 'atom', name: 'string' },
    }
  }

  public isMultiple(token: string) : boolean {
    if (this.translation.hasOwnProperty(token.toLocaleLowerCase())) {
      return false
    } else if (this.tokens.hasOwnProperty(token)) {
      return false
    } else if (this.lexerTypes.hasOwnProperty(token)) {
      return true
    }
    throw new Error(`Undefined token mulitplicity '${token}'`)
  }

  /**
   * Names token
   * @param token to translate
   * @returns
   */
  public nameToken(token: string) : string {
    if (this.translation.hasOwnProperty(token.toLocaleLowerCase())) {
      return this.translation[token.toLocaleLowerCase()]
    } else return token.toLowerCase()
  }

  public typeToken(token: string) : tsType {
    if (this.translation.hasOwnProperty(token.toLowerCase())) {
      return {
        type: 'literal',
        value: token
      }
    } else if (this.tokens.hasOwnProperty(token)) {
      return {
        type: 'literal',
        value: this.tokens[token]
      }
    } else if (this.lexerTypes.hasOwnProperty(token)) {
      return this.lexerTypes[token]
    }
    throw new Error(`Type not found for token '${token}'`)
  }
}