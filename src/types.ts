/**
 * Project Name: antlrMinAST
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */
import { withType } from "./grammar"

export interface union extends withType<'union'> {
  types: tsType[]
}

export interface array extends withType<'array'> {
  arg: tsType
}

export interface stringliteral extends withType<'literal'> {
  value: string
}

export interface atom extends withType<'atom'> {
  name: 'string' | 'number' | 'boolean'
}

export interface ref extends withType<'ref'> {
  name: string
  genericarg?: string
}

export type field = {
  name: string
  ftype: tsType
  optional: boolean
}

export interface pojo extends withType<'pojo'> {
  fields: field[]
}

export type tsType = pojo | union | ref | atom | array | stringliteral

export interface interfaceDecl extends withType<'interface'> {
  name: string
  extends?: ref
  fields: field[]
}

export interface typeDecl extends withType<'type'> {
  name: string
  value: tsType
  generic?: string
}

export type decl = interfaceDecl | typeDecl

