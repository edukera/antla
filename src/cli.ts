/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
 */
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { generate } from './generate';

interface CommandLineOptions {
    grammar: string;
    output?: string;
  }

// Configuration des options avec yargs
const argv = yargs(hideBin(process.argv))
  .option('grammar', {
    alias: 'g',
    describe: 'Path to ANTLR grammar file (parser rules)',
    type: 'string',
    demandOption: true,
  })
  .option('output', {
    alias: 'o',
    describe: 'Path to output generated typescript (AST types)',
    type: 'string',
    demandOption: false,
  })
  .help()
  .alias('help', 'h')
  .parse() as CommandLineOptions;

generate(argv.grammar, argv.output);
