/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-04-12
 */
import * as fs from 'fs';
import { CharStream, CommonTokenStream }  from 'antlr4';
import ANTLRv4Lexer from './ANTLRParser/ANTLRv4Lexer';
import ANTLRv4Parser from './ANTLRParser/ANTLRv4Parser';
import { BuildVisitor } from './visitors';
import { grammarSpec } from './grammar';
import { grammarToDecls } from './mapper';
import { createTs } from './tscreator';
import { transformDecls } from './transformer';
import { writeContentToFile } from './utils';
import path from 'path';

export function generate(grammar: string, output: string | undefined): void {
  const grammarPath = path.resolve(grammar);
  const outputPath = output ? path.resolve(output) : undefined;
  try {
      const data = fs.readFileSync(grammarPath, { encoding: 'utf-8' });
      //console.log(data);
      const chars = new CharStream(data); // replace this with a FileStream as required
      const lexer = new ANTLRv4Lexer(chars);
      const tokens = new CommonTokenStream(lexer);
      const parser = new ANTLRv4Parser(tokens);
      const tree = parser.grammarSpec();
      //console.log(tree.toStringTree(parser.ruleNames,parser))
      const builder = new BuildVisitor()
      const grammarNode : grammarSpec = builder.visit(tree) as grammarSpec
      //console.log(JSON.stringify(grammarNode, null, 2))
      const types = grammarToDecls(grammarNode)
      //console.log(JSON.stringify(types, null, 2))
      const transformedTypes = transformDecls(types)
      const content = createTs(transformedTypes)
      if (outputPath !== undefined) {
          writeContentToFile(content, outputPath)
      } else {
          console.log(content)
      }
  } catch (error) {
      console.error('Error while reading grammar file:', error);
  }
}