"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var antlr4_1 = require("antlr4");
var ANTLRv4Lexer_1 = require("../ANTLRv4Lexer");
var LexerAdaptor = /** @class */ (function (_super) {
    __extends(LexerAdaptor, _super);
    function LexerAdaptor(input) {
        var _this = _super.call(this, input) || this;
        _this._modeStack = [];
        _this._mode = 0;
        _this.INVALID_TYPE = -1;
        /**
         *  Generic type for OPTIONS, TOKENS and CHANNELS
         */
        _this.PREQUEL_CONSTRUCT = -10;
        _this.OPTIONS_CONSTRUCT = -11;
        /**
         * Track whether we are inside of a rule and whether it is lexical parser. _currentRuleType==Token.INVALID_TYPE
         * means that we are outside of a rule. At the first sign of a rule name reference and _currentRuleType==invalid, we
         * can assume that we are starting a parser rule. Similarly, seeing a token reference when not already in rule means
         * starting a token rule. The terminating ';' of a rule, flips this back to invalid type.
         *
         * This is not perfect logic but works. For example, "grammar T;" means that we start and stop a lexical rule for
         * the "T;". Dangerous but works.
         *
         * The whole point of this state information is to distinguish between [..arg actions..] and [charsets]. Char sets
         * can only occur in lexical rules and arg actions cannot occur.
         */
        _this._currentRuleType = _this.INVALID_TYPE;
        _this.insideOptionsBlock = false;
        return _this;
    }
    LexerAdaptor.prototype.getCurrentRuleType = function () {
        return this._currentRuleType;
    };
    LexerAdaptor.prototype.setCurrentRuleType = function (ruleType) {
        this._currentRuleType = ruleType;
    };
    LexerAdaptor.prototype.handleBeginArgument = function () {
        if (this.inLexerRule()) {
            this.pushMode(ANTLRv4Lexer_1.default.LexerCharSet);
            this.more();
        }
        else {
            this.pushMode(ANTLRv4Lexer_1.default.Argument);
        }
    };
    LexerAdaptor.prototype.handleEndArgument = function () {
        this.popMode();
        if (this._modeStack.length > 0) {
            this._type = ANTLRv4Lexer_1.default.ARGUMENT_CONTENT;
        }
    };
    LexerAdaptor.prototype.handleEndAction = function () {
        var oldMode = this._mode;
        var newMode = this.popMode();
        var isActionWithinAction = this._modeStack.length > 0
            && newMode == ANTLRv4Lexer_1.default.TargetLanguageAction
            && oldMode == newMode;
        if (isActionWithinAction) {
            this._type = ANTLRv4Lexer_1.default.ACTION_CONTENT;
        }
    };
    LexerAdaptor.prototype.emit = function () {
        if ((this._type == ANTLRv4Lexer_1.default.OPTIONS || this._type == ANTLRv4Lexer_1.default.TOKENS || this._type == ANTLRv4Lexer_1.default.CHANNELS)
            && this.getCurrentRuleType() == this.INVALID_TYPE) { // enter prequel construct ending with an RBRACE
            this.setCurrentRuleType(this.PREQUEL_CONSTRUCT);
        }
        else if (this._type == ANTLRv4Lexer_1.default.OPTIONS && this.getCurrentRuleType() == ANTLRv4Lexer_1.default.TOKEN_REF) {
            this.setCurrentRuleType(this.OPTIONS_CONSTRUCT);
        }
        else if (this._type == ANTLRv4Lexer_1.default.RBRACE && this.getCurrentRuleType() == this.PREQUEL_CONSTRUCT) { // exit prequel construct
            this.setCurrentRuleType(this.INVALID_TYPE);
        }
        else if (this._type == ANTLRv4Lexer_1.default.RBRACE && this.getCurrentRuleType() == this.OPTIONS_CONSTRUCT) { // exit options
            this.setCurrentRuleType(ANTLRv4Lexer_1.default.TOKEN_REF);
        }
        else if (this._type == ANTLRv4Lexer_1.default.AT && this.getCurrentRuleType() == this.INVALID_TYPE) { // enter action
            this.setCurrentRuleType(ANTLRv4Lexer_1.default.AT);
        }
        else if (this._type == ANTLRv4Lexer_1.default.SEMI && this.getCurrentRuleType() == this.OPTIONS_CONSTRUCT) { // ';' in options { .... }. Don't change anything.
        }
        else if (this._type == ANTLRv4Lexer_1.default.END_ACTION && this.getCurrentRuleType() == ANTLRv4Lexer_1.default.AT) { // exit action
            this.setCurrentRuleType(this.INVALID_TYPE);
        }
        else if (this._type == ANTLRv4Lexer_1.default.ID) {
            var firstChar = this._input.getText(this._tokenStartCharIndex, this._tokenStartCharIndex);
            var c = firstChar.charAt(0);
            if (c == c.toUpperCase()) {
                this._type = ANTLRv4Lexer_1.default.TOKEN_REF;
            }
            else {
                this._type = ANTLRv4Lexer_1.default.RULE_REF;
            }
            if (this.getCurrentRuleType() == this.INVALID_TYPE) { // if outside of rule def
                this.setCurrentRuleType(this._type); // set to inside lexer or parser rule
            }
        }
        else if (this._type == ANTLRv4Lexer_1.default.SEMI) { // exit rule def
            this.setCurrentRuleType(this.INVALID_TYPE);
        }
        return _super.prototype.emit.call(this);
    };
    LexerAdaptor.prototype.inLexerRule = function () {
        return this.getCurrentRuleType() == ANTLRv4Lexer_1.default.TOKEN_REF;
    };
    LexerAdaptor.prototype.inParserRule = function () {
        return this.getCurrentRuleType() == ANTLRv4Lexer_1.default.RULE_REF;
    };
    LexerAdaptor.prototype.reset = function () {
        this.setCurrentRuleType(this.INVALID_TYPE);
        this.insideOptionsBlock = false;
        _super.prototype.reset.call(this);
    };
    return LexerAdaptor;
}(antlr4_1.Lexer));
exports.default = LexerAdaptor;
