// Generated from Basic.g4 by ANTLR 4.13.1
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
export default class BasicLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly NEWLINE = 7;
	public static readonly INT = 8;
	public static readonly WS = 9;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, "'*'", 
                                                            "'/'", "'+'", 
                                                            "'-'", "'('", 
                                                            "')'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "NEWLINE", 
                                                             "INT", "WS" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "NEWLINE", "INT", "WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, BasicLexer._ATN, BasicLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "Basic.g4"; }

	public get literalNames(): (string | null)[] { return BasicLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return BasicLexer.symbolicNames; }
	public get ruleNames(): string[] { return BasicLexer.ruleNames; }

	public get serializedATN(): number[] { return BasicLexer._serializedATN; }

	public get channelNames(): string[] { return BasicLexer.channelNames; }

	public get modeNames(): string[] { return BasicLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,9,50,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,1,0,1,
	0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,6,4,6,33,8,6,11,6,12,6,34,1,
	6,1,6,1,7,4,7,40,8,7,11,7,12,7,41,1,8,4,8,45,8,8,11,8,12,8,46,1,8,1,8,0,
	0,9,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,1,0,3,2,0,10,10,13,13,1,0,48,
	57,2,0,9,9,32,32,52,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,
	1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,1,19,1,0,0,
	0,3,21,1,0,0,0,5,23,1,0,0,0,7,25,1,0,0,0,9,27,1,0,0,0,11,29,1,0,0,0,13,
	32,1,0,0,0,15,39,1,0,0,0,17,44,1,0,0,0,19,20,5,42,0,0,20,2,1,0,0,0,21,22,
	5,47,0,0,22,4,1,0,0,0,23,24,5,43,0,0,24,6,1,0,0,0,25,26,5,45,0,0,26,8,1,
	0,0,0,27,28,5,40,0,0,28,10,1,0,0,0,29,30,5,41,0,0,30,12,1,0,0,0,31,33,7,
	0,0,0,32,31,1,0,0,0,33,34,1,0,0,0,34,32,1,0,0,0,34,35,1,0,0,0,35,36,1,0,
	0,0,36,37,6,6,0,0,37,14,1,0,0,0,38,40,7,1,0,0,39,38,1,0,0,0,40,41,1,0,0,
	0,41,39,1,0,0,0,41,42,1,0,0,0,42,16,1,0,0,0,43,45,7,2,0,0,44,43,1,0,0,0,
	45,46,1,0,0,0,46,44,1,0,0,0,46,47,1,0,0,0,47,48,1,0,0,0,48,49,6,8,0,0,49,
	18,1,0,0,0,4,0,34,41,46,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!BasicLexer.__ATN) {
			BasicLexer.__ATN = new ATNDeserializer().deserialize(BasicLexer._serializedATN);
		}

		return BasicLexer.__ATN;
	}


	static DecisionsToDFA = BasicLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}