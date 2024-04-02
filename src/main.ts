/**
 * Project Name: antlrMinAST
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */

import * as fs from 'fs';
import { CharStream, CommonTokenStream }  from 'antlr4';
import ANTLRv4Lexer from './ANTLRParser/ANTLRv4Lexer';
import ANTLRv4Parser from './ANTLRParser/ANTLRv4Parser';
import { BuildVisitor } from './visitors';
import { grammarSpec } from './grammar';
import { grammarToTypes } from './mapper';
import { createTs } from './tscreator';

function generate(filePath: string): void {
    try {
        const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
        //console.log(data);
        const chars = new CharStream(data); // replace this with a FileStream as required
        const lexer = new ANTLRv4Lexer(chars);
        const tokens = new CommonTokenStream(lexer);
        const parser = new ANTLRv4Parser(tokens);
        const tree = parser.grammarSpec();
        console.log(tree.toStringTree(parser.ruleNames,parser))
        const builder = new BuildVisitor()
        const grammarNode : grammarSpec = builder.visit(tree) as grammarSpec
        console.log(JSON.stringify(grammarNode, null, 2))
        const types = grammarToTypes(grammarNode)
        //console.log(JSON.stringify(types, null, 2))
        console.log(createTs(types))
    } catch (error) {
        console.error('Error while reading grammar file:', error);
    }
}

// Utilisation de la fonction 'generate'
// Remplacez './chemin/vers/votre/fichier.txt' par le chemin réel du fichier que vous souhaitez lire
//generate('/Users/benoitrognier/Projects/franceioi/antlrMinAST/tests/grammars/ExprSimple.g4');
generate('/Users/benoitrognier/Projects/franceioi/antlrMinAST/tests/grammars/Expr.g4');
//generate('/Users/benoitrognier/Projects/franceioi/antlrMinAST/tests/grammars/Python3Parser.g4');
