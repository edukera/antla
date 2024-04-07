/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */

export type withType<T> = {
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

export interface action extends withType<'action'> {
  value: string
}

export type atom = ruleRef | terminalDef

export type suffix = '*' | '+' | '?'

export interface ebnf extends withType<'ebnf'> {
  block : alternatives[]
  suffix ?: suffix
}

export type element = {
  value: atom | ebnf | action
  suffix ?: suffix
}

export type alternatives = element[]

export interface parserRuleSpec extends withType<'parserRuleSpec'> {
  name: string
  definition : alternatives[] // or element[][]
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
 | action
 | element
 | alternatives
 | singleToken
 | toBeSpecified
 | lexerDefinition
 | suffix
