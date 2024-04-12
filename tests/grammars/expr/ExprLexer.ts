// Generated from Expr.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class ExprLexer extends Lexer {
	public static readonly VARIABLE = 1;
	public static readonly SCIENTIFIC_NUMBER = 2;
	public static readonly LPAREN = 3;
	public static readonly RPAREN = 4;
	public static readonly PLUS = 5;
	public static readonly MINUS = 6;
	public static readonly TIMES = 7;
	public static readonly DIV = 8;
	public static readonly GT = 9;
	public static readonly LT = 10;
	public static readonly EQ = 11;
	public static readonly POINT = 12;
	public static readonly POW = 13;
	public static readonly WS = 14;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, "'('", 
                                                            "')'", "'+'", 
                                                            "'-'", "'*'", 
                                                            "'/'", "'>'", 
                                                            "'<'", "'='", 
                                                            "'.'", "'^'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "VARIABLE", 
                                                             "SCIENTIFIC_NUMBER", 
                                                             "LPAREN", "RPAREN", 
                                                             "PLUS", "MINUS", 
                                                             "TIMES", "DIV", 
                                                             "GT", "LT", 
                                                             "EQ", "POINT", 
                                                             "POW", "WS" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"VARIABLE", "VALID_ID_START", "VALID_ID_CHAR", "SCIENTIFIC_NUMBER", "NUMBER", 
		"UNSIGNED_INTEGER", "E", "SIGN", "LPAREN", "RPAREN", "PLUS", "MINUS", 
		"TIMES", "DIV", "GT", "LT", "EQ", "POINT", "POW", "WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, ExprLexer._ATN, ExprLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "Expr.g4"; }

	public get literalNames(): (string | null)[] { return ExprLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return ExprLexer.symbolicNames; }
	public get ruleNames(): string[] { return ExprLexer.ruleNames; }

	public get serializedATN(): number[] { return ExprLexer._serializedATN; }

	public get channelNames(): string[] { return ExprLexer.channelNames; }

	public get modeNames(): string[] { return ExprLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,14,114,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,1,0,1,0,5,0,44,8,0,10,0,12,0,47,9,0,1,
	1,1,1,1,2,1,2,3,2,53,8,2,1,3,1,3,1,3,3,3,58,8,3,1,3,1,3,3,3,62,8,3,1,4,
	4,4,65,8,4,11,4,12,4,66,1,4,1,4,4,4,71,8,4,11,4,12,4,72,3,4,75,8,4,1,5,
	4,5,78,8,5,11,5,12,5,79,1,6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,
	1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,18,1,
	18,1,19,4,19,109,8,19,11,19,12,19,110,1,19,1,19,0,0,20,1,1,3,0,5,0,7,2,
	9,0,11,0,13,0,15,0,17,3,19,4,21,5,23,6,25,7,27,8,29,9,31,10,33,11,35,12,
	37,13,39,14,1,0,4,3,0,65,90,95,95,97,122,2,0,69,69,101,101,2,0,43,43,45,
	45,3,0,9,10,13,13,32,32,116,0,1,1,0,0,0,0,7,1,0,0,0,0,17,1,0,0,0,0,19,1,
	0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,
	0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,1,41,1,
	0,0,0,3,48,1,0,0,0,5,52,1,0,0,0,7,54,1,0,0,0,9,64,1,0,0,0,11,77,1,0,0,0,
	13,81,1,0,0,0,15,83,1,0,0,0,17,85,1,0,0,0,19,87,1,0,0,0,21,89,1,0,0,0,23,
	91,1,0,0,0,25,93,1,0,0,0,27,95,1,0,0,0,29,97,1,0,0,0,31,99,1,0,0,0,33,101,
	1,0,0,0,35,103,1,0,0,0,37,105,1,0,0,0,39,108,1,0,0,0,41,45,3,3,1,0,42,44,
	3,5,2,0,43,42,1,0,0,0,44,47,1,0,0,0,45,43,1,0,0,0,45,46,1,0,0,0,46,2,1,
	0,0,0,47,45,1,0,0,0,48,49,7,0,0,0,49,4,1,0,0,0,50,53,3,3,1,0,51,53,2,48,
	57,0,52,50,1,0,0,0,52,51,1,0,0,0,53,6,1,0,0,0,54,61,3,9,4,0,55,57,3,13,
	6,0,56,58,3,15,7,0,57,56,1,0,0,0,57,58,1,0,0,0,58,59,1,0,0,0,59,60,3,11,
	5,0,60,62,1,0,0,0,61,55,1,0,0,0,61,62,1,0,0,0,62,8,1,0,0,0,63,65,2,48,57,
	0,64,63,1,0,0,0,65,66,1,0,0,0,66,64,1,0,0,0,66,67,1,0,0,0,67,74,1,0,0,0,
	68,70,5,46,0,0,69,71,2,48,57,0,70,69,1,0,0,0,71,72,1,0,0,0,72,70,1,0,0,
	0,72,73,1,0,0,0,73,75,1,0,0,0,74,68,1,0,0,0,74,75,1,0,0,0,75,10,1,0,0,0,
	76,78,2,48,57,0,77,76,1,0,0,0,78,79,1,0,0,0,79,77,1,0,0,0,79,80,1,0,0,0,
	80,12,1,0,0,0,81,82,7,1,0,0,82,14,1,0,0,0,83,84,7,2,0,0,84,16,1,0,0,0,85,
	86,5,40,0,0,86,18,1,0,0,0,87,88,5,41,0,0,88,20,1,0,0,0,89,90,5,43,0,0,90,
	22,1,0,0,0,91,92,5,45,0,0,92,24,1,0,0,0,93,94,5,42,0,0,94,26,1,0,0,0,95,
	96,5,47,0,0,96,28,1,0,0,0,97,98,5,62,0,0,98,30,1,0,0,0,99,100,5,60,0,0,
	100,32,1,0,0,0,101,102,5,61,0,0,102,34,1,0,0,0,103,104,5,46,0,0,104,36,
	1,0,0,0,105,106,5,94,0,0,106,38,1,0,0,0,107,109,7,3,0,0,108,107,1,0,0,0,
	109,110,1,0,0,0,110,108,1,0,0,0,110,111,1,0,0,0,111,112,1,0,0,0,112,113,
	6,19,0,0,113,40,1,0,0,0,10,0,45,52,57,61,66,72,74,79,110,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ExprLexer.__ATN) {
			ExprLexer.__ATN = new ATNDeserializer().deserialize(ExprLexer._serializedATN);
		}

		return ExprLexer.__ATN;
	}


	static DecisionsToDFA = ExprLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}