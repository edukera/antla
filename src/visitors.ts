import {ParseTreeVisitor} from 'antlr4';
import ANTLRv4ParserVisitor from './ANTLRParser/ANTLRv4ParserVisitor'
import { GrammarSpecContext, GrammarDeclContext, RuleSpecContext, ParserRuleSpecContext, RulesContext, LexerRuleSpecContext, RuleAltListContext, LabeledAltContext, ElementContext, LabeledElementContext, AtomContext, TerminalDefContext, RulerefContext, AlternativeContext, EbnfContext, LexerAltContext, LexerElementContext, LexerAtomContext, ActionBlockContext, BlockContext, BlockSuffixContext, EbnfSuffixContext } from "./ANTLRParser/ANTLRv4Parser";
import { GrammarNode, grammarDecl, grammarSpec, lexerRuleSpec, parserRuleSpec, rule, atom, element, ebnf, lexerDefinition, action, suffix, alternatives } from './grammar'

export class BuildVisitor extends ParseTreeVisitor<GrammarNode> implements ANTLRv4ParserVisitor<GrammarNode> {

  constructor() {
    super()
  }

  visitGrammarSpec(ctx: GrammarSpecContext) : grammarSpec {
    return {
      grammarDecl: this.visitGrammarDecl(ctx.grammarDecl()),
      rules: ctx.rules().ruleSpec_list().map(spec => this.visitRuleSpec(spec))
    }
  };

  visitGrammarDecl(ctx: GrammarDeclContext) : grammarDecl {
    return {
      identifier: ctx.identifier().getText(),
      grammarType: 'grammar'
    }
  };

  visitRuleSpec(ctx: RuleSpecContext) : rule {
    const parserRuleCtx = ctx.parserRuleSpec()
    const lexerRuleCtx = ctx.lexerRuleSpec()
    if (parserRuleCtx !== null) {
      return this.visitParserRuleSpec(parserRuleCtx)
    } else {
      return this.visitLexerRuleSpec(lexerRuleCtx)
    }
  }

  private mapAtom(ctx : AtomContext) : atom {
    const terminal : TerminalDefContext = ctx.terminalDef()
    const ruleref : RulerefContext = ctx.ruleref()
    if (terminal !== null) {
      return {
        type: 'terminal',
        value: terminal.getText().replace(/'/g, "")
      }
    } else if (ruleref !== null) {
      return {
        type: 'ruleRef',
        value: ruleref.getText()
      }
    } else {
      throw new Error(`Unknown atom: ${ctx.getText()}`)
    }
  }

  private mapAction(ctx : ActionBlockContext) : action {
    return {
      type: 'action',
      value: ctx.getText()
    }
  }

  private mapAlternative(ctx : AlternativeContext) : element[] {
    return ctx.element_list().map(elt => this.mapElement(elt))
  }

  private mapSuffix(ctx: BlockSuffixContext) : suffix | undefined {
    if (ctx === null) return undefined
    const ebnfSuffix : EbnfSuffixContext = ctx.ebnfSuffix()
    const question_list = ebnfSuffix.QUESTION_list()
    const star = ebnfSuffix.STAR()
    const plus = ebnfSuffix.PLUS()
    if (star !== null) {
      return '*'
    } else if (plus !== null) {
      return '+'
    } else if (question_list !== null) {
      return '?'
    } else return undefined
  }

  private mapEbnf(ctx : EbnfContext) : ebnf {
    const elements : AlternativeContext[] = ctx.block().altList().alternative_list()
    const suffix : BlockSuffixContext = ctx.blockSuffix()
    return {
      type: 'ebnf',
      block : {
        type: 'ebnfList',
        list: elements.map(altCtx => this.mapAlternative(altCtx))
      },
      suffix: this.mapSuffix(suffix)
    }
  }

  private mapElement(ctx: ElementContext) : element {
    const atom : AtomContext = ctx.atom()
    const ebnf : EbnfContext = ctx.ebnf()
    const action : ActionBlockContext = ctx.actionBlock()
    if (atom !== null) {
      return this.mapAtom(atom)
    } else if (ebnf !== null) {
      return this.mapEbnf(ebnf)
    } else if (action !== null) {
      return this.mapAction(action)
    } else {
      throw new Error(`Unknown element: ${ctx.getText()}`)
    }
  }

  private mapAltContext(ctx: LabeledAltContext) : alternatives {
    return ctx.alternative().element_list().map((eltCtx : ElementContext) => {
      return this.mapElement(eltCtx)
    })
  }

  visitParserRuleSpec(ctx: ParserRuleSpecContext) : parserRuleSpec {
    return {
      type: 'parserRuleSpec',
      name: ctx.RULE_REF().getText(),
      definition: ctx.ruleBlock().ruleAltList().labeledAlt_list().map(altCtx => this.mapAltContext(altCtx))
    }
  }

  private getLexerDefinition(ctx: LexerRuleSpecContext) : lexerDefinition {
    if (ctx.lexerRuleBlock().lexerAltList().lexerAlt_list().length === 1) {
      const altCtx = ctx.lexerRuleBlock().lexerAltList().lexerAlt_list().at(0)
      if (altCtx !== undefined) {
        if (altCtx.lexerElements().lexerElement_list().length === 1) {
          const elt = altCtx.lexerElements().lexerElement_list().at(0)
          if (elt !== undefined) {
            const atom : LexerAtomContext = elt.lexerAtom()
            if (atom !== null) {
              const terminal : TerminalDefContext = atom.terminalDef()
              if (terminal !== null) {
                return {
                  type: 'singleToken',
                  value: terminal.getText().replace(/'/g, "")
                }
              } else return { type: 'toBeSpecified' }
            } else return { type: 'toBeSpecified' }
          } else return { type: 'toBeSpecified' }
        } else {
          return { type: 'toBeSpecified' }
        }
      } else return { type: 'toBeSpecified' }
    } else return { type: 'toBeSpecified' }
  }

  visitLexerRuleSpec(ctx: LexerRuleSpecContext) : lexerRuleSpec {
    return {
      type: 'lexerRuleSpec',
      name: ctx.TOKEN_REF().getText(),
      definition : this.getLexerDefinition(ctx)
    }
  }

}