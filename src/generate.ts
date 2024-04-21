import { CharStream, CommonTokenStream }  from 'antlr4';
/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-04-12
 */
import * as fs from 'fs';
import path from 'path';

import ANTLRv4Lexer from './ANTLRParser/ANTLRv4Lexer';
import ANTLRv4Parser from './ANTLRParser/ANTLRv4Parser';
import { ebnf, grammarSpec, rule } from './grammar';
import { grammarToDecls } from './mapper';
import { transformDecls } from './transformer';
import { createTs } from './tscreator';
import { writeContentToFile } from './utils';
import { BuildVisitor } from './visitors';

const simplifyGrammar = (grammar: grammarSpec) : grammarSpec => {
  return { ...grammar,
    rules: grammar.rules.reduce((acc, rule) => {
      switch (rule.type) {
        case 'parserRuleSpec': {
          if (rule.definition.length === 1 && rule.definition[0].length === 1) {
            const elt = rule.definition[0][0]
            switch (elt.value.type) {
              case 'ebnf': {
                if (elt.value.suffix === undefined) {
                  return acc.concat({ ...rule,
                    definition: elt.value.block
                  })
                }
              }
            }
          }
        }
      }
      return acc.concat(rule)
    }, [] as rule[])
  }
}

// Define the Options class to manage configuration options.
export interface Options {
  // Private fields for the class
  withError: boolean; // Indicates if errors should be generated
  outputDir: string | undefined; // The directory for output generation
}

export function generate(grammar: string, options: Options): void {
  const grammarPath = path.resolve(grammar);
  const outputPath = options.outputDir ? path.resolve(options.outputDir) : undefined;
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
      const types = grammarToDecls(simplifyGrammar(grammarNode), options)
      //console.log(JSON.stringify(types, null, 2))
      const transformedTypes = transformDecls(types)
      //console.log(JSON.stringify(transformedTypes, null, 2))
      const content = createTs({ name: grammarNode.grammarDecl.identifier, decls: transformedTypes })
      if (outputPath !== undefined) {
          writeContentToFile(content, outputPath)
      } else {
          console.log(content)
      }
  } catch (error) {
      console.error('Error while reading grammar file:', error);
  }
}