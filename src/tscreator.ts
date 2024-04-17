/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */
import ts, { createPrinter, createSourceFile, factory, KeywordTypeNode, KeywordSyntaxKind, ListFormat, NewLineKind, NodeFlags, ScriptKind, ScriptTarget, SyntaxKind, TypeNode } from 'typescript';
import { tsType, atom, ref, array, union, pojo, field, decl, interfaceDecl, stringliteral, typeDecl, scope } from './types';

// See https://ts-ast-viewer.com/ for TS AST code

const createFromLiteral = (literal: stringliteral) : TypeNode => {
  return factory.createLiteralTypeNode(factory.createStringLiteral(literal.value))
}

const createFromAtom = (atom: atom) : TypeNode => {
  switch (atom.name) {
    case 'number': return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword)
    case 'string': return factory.createKeywordTypeNode(SyntaxKind.StringKeyword)
    case 'boolean': return factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword)
  }
}

const createFromRef = (ref: ref) : TypeNode => {
  return factory.createTypeReferenceNode(
    factory.createIdentifier(ref.name),
    ref.genericarg ? [factory.createLiteralTypeNode(factory.createStringLiteral(ref.genericarg))] : undefined
  )
}

const createFromArray = (array: array) : TypeNode => {
  return factory.createArrayTypeNode(createFromTSType(array.arg))
}

const createFromUnion = (union: union) : TypeNode => {
  return factory.createUnionTypeNode(union.types.map(createFromTSType))
}

const createFromField = (field: field) => {
  return factory.createPropertySignature(
    undefined,
    factory.createIdentifier(field.name),
    field.optional ? factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
    createFromTSType(field.ftype)
  )
}

const createFromPojo = (pojo: pojo) : TypeNode => {
  return factory.createTypeLiteralNode(pojo.fields.map(createFromField))
}

const createFromTSType = (tsType : tsType) : TypeNode => {
  switch (tsType.type) {
    case 'atom':    return createFromAtom(tsType)
    case 'ref':     return createFromRef(tsType)
    case 'array':   return createFromArray(tsType)
    case 'union':   return createFromUnion(tsType)
    case 'pojo':    return createFromPojo(tsType)
    case 'literal': return createFromLiteral(tsType)
  }
}

const createFromInterface = (decl: interfaceDecl) => {
  return factory.createInterfaceDeclaration(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(decl.name),
    undefined,
    decl.extends ? [factory.createHeritageClause(
      ts.SyntaxKind.ExtendsKeyword,
      [factory.createExpressionWithTypeArguments(
        factory.createIdentifier(decl.extends.name),
        decl.extends.genericarg ? [factory.createLiteralTypeNode(factory.createStringLiteral(decl.extends.genericarg))] : undefined
      )]
    )]: undefined,
    decl.value.fields.map(createFromField)
  )
}

const createFromType = (type: typeDecl) => {
  return factory.createTypeAliasDeclaration(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(type.name),
    type.generic? [factory.createTypeParameterDeclaration(
      undefined,
      factory.createIdentifier(type.generic),
      undefined,
      undefined
    )] : undefined,
    createFromTSType(type.value)
  )
}

const createFromDecls = (decls: decl[]) => {
  return decls.map(decl => {
    switch (decl.type) {
      case 'interface': return createFromInterface(decl)
      case 'type':      return createFromType(decl)
    }
  })
}

const createNameSpace = (scope: scope) => {
  return factory.createModuleDeclaration(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(scope.name),
    factory.createModuleBlock(factory.createNodeArray(createFromDecls(scope.decls))),
    ts.NodeFlags.Namespace
  )
}

export const createTs = (scope: scope) : string => {
  const file = createSourceFile("source.ts", "", ScriptTarget.ESNext, false, ScriptKind.TS);
  const printer = createPrinter({ newLine: NewLineKind.LineFeed });
  const node = createNameSpace(scope)
  return printer.printNode(ts.EmitHint.Unspecified, node, file)
}