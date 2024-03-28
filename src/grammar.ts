
type withType<T> = {
  type: T
}

export type grammarDecl = {
  grammarType: "grammar"
  identifier: string
}

export interface ruleRef extends withType<'ruleRef'> {
  value: string
}

export interface terminalDef extends withType<'terminal'> {
  value: string
}

export interface ebnfList extends withType<'ebnfList'> {
  list: alternatives[]
}

export type atom = ruleRef | terminalDef

export type ebnf = ebnfList

export type element =  atom | ebnf

export type alternatives = element[]

export type ruleAlt =  alternatives

export interface parserRuleSpec extends withType<'parserRuleSpec'> {
  name: string
  definition : ruleAlt[]
}

export interface singleToken extends withType<'singleToken'> {
  value : string
}

export interface toBeSpecified extends withType<'toBeSpecified'> {}

export type lexerDefinition = singleToken | toBeSpecified

export interface lexerRuleSpec extends withType<'lexerRuleSpec'> {
  name: string
  definition : lexerDefinition
}

export type rule = parserRuleSpec | lexerRuleSpec

export type grammarSpec = {
  grammarDecl : grammarDecl
  rules : rule[]
}

export type GrammarNode =
 | grammarSpec
 | grammarDecl
 | parserRuleSpec
 | lexerRuleSpec
 | ruleRef
 | terminalDef
 | element
 | alternatives
 | singleToken
 | toBeSpecified
 | lexerDefinition
