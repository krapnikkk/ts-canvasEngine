module engine {
    export class Doom3Tokenizer implements IDoom3Tokenizer {
        private _digits: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        private _isDigit(c: string): boolean {
            for (let i = 0; i < this._digits.length; i++) {
                if (this._digits[i] === c) {
                    return true;
                }
            }
            return false;
        }

        private _whiteSpaces: string[] = [" ", "\t", "\n", "\v"];
        private _isWhiteSpace(c: string): boolean {
            for (let i: number = 0; i < this._whiteSpaces.length; i++) {
                if (this._whiteSpaces[i] === c) {
                    return true;
                }
            }
            return false;
        }

        private _source: string = "Doom3Tokenzer";
        private _currIdx: number = 0;
        setSource(source: string): void {
            this._source = source;
            this._currIdx = 0;
        }

        reset(): void {
            this._currIdx = 0;
        }

        private _getChar(): string {
            if (this._currIdx >= 0 && this._currIdx < this._source.length) {
                return this._source.charAt(this._currIdx++);
            }
            return "";
        }

        private _peekChar(): string {
            if (this._currIdx >= 0 && this._currIdx < this._source.length) {
                return this._source.charAt(this._currIdx);
            }
            return "";
        }

        private _ungetChar(): void {
            if (this._currIdx > 0) {
                --this._currIdx;
            }
        }

        private _getNextToken(tok: IDoom3Token): boolean {
            let token: Doom3Token = tok as Doom3Token;
            let c: string = "";
            token.reset();
            do {
                c = this._skipWhiteSpace();//skip withespace
                if (c === "/" && this._peekChar() === '/') {//skip new line
                    c = this._skipComments0();
                } else if (c === '/' && this._peekChar() === "*") {// skip annotation
                    c = this._skipComments1();
                } else if (
                    this._isDigit(c) ||
                    c === "-" || 
                    c === "+" ||
                    (c === "." && this._isDigit(this._peekChar()))
                ) {// skip init number
                    this._ungetChar();
                    this._getNumber(token);
                    return true;
                } else if (c === "\'" || c === '\"') {
                    this._getsubstring(token, c);
                    return true;
                } else if (c.length > 0) {
                    this._ungetChar();
                    this._getString(token);
                    return true;
                }

            } while (c.length > 0);
            return false;
        }

        private _skipWhiteSpace(): string {
            let c: string = "";
            do {
                c = this._getChar();
            } while (c.length > 0 && this._isWhiteSpace(c));

            return c;
        }

        private _skipComments0(): string {//skip newline
            let c: string = "";
            do {
                c = this._getChar();
            } while (c.length > 0 && c !== '\n');
            return c;
        }

        private _skipComments1(): string {//skip annotation
            let c: string = "";
            c = this._getChar();
            do {
                c = this._getChar();
            } while (c.length > 0 && (c !== '*' || this._peekChar() !== '/'));
            c = this._getChar();
            return c;
        }

        private _getNumber(token: Doom3Token): void {
            let val: number = 0.0;
            let isFloat: boolean = false;
            let scaleValue: number = 0.1; 
            let c: string = this._getChar();
            let isNegate: boolean = (c === '-');
            let consumed: boolean = false;
            let ascii0 = "0".charCodeAt(0);
            do {
                token.addChar(c);
                if (c === '.') {
                    isFloat = true;
                } else if (c !== '-'&& c !== '+') {
                    let ascii: number = c.charCodeAt(0);
                    let vc: number = (ascii - ascii0);
                    if (!isFloat)
                        val = 10 * val + vc;
                    else {
                        val = val + scaleValue * vc;
                        scaleValue *= 0.1;
                    }
                } 
                if (consumed === true)
                    this._getChar();
                c = this._peekChar();
                consumed = true;
            } while (c.length > 0 && (this._isDigit(c) || (!isFloat && c === '.')));

            if (isNegate) {
                val = - val;
            }

            //设置数字值和NUMBER类型
            token.setVal(val);
        }

        private _getsubstring(token: Doom3Token, endChar: string): void {
            let end: boolean = false;
            let c: string = "";
            token.setType(ETokenType.STRING);
            do {
                c = this._getChar();
                if (c === endChar) {
                    end = true;
                }
                else {
                    token.addChar(c);
                }
            } while (c.length > 0 && c !== '\n' && !end);
        }

        private _getString(token: Doom3Token): void {
            let c: string = this._getChar();
            token.setType(ETokenType.STRING);
            do {
                token.addChar(c);
                if (!this._isSpecialChar(c)) {
                    c = this._getChar();
                }
            } while (c.length > 0 && !this._isWhiteSpace(c) && !this._isSpecialChar(c));
        }

        private _isSpecialChar(c: string): boolean {
            switch (c) {
                case '(':
                    return true;
                case ')':
                    return true;
                case '[':
                    return true;
                case ']':
                    return true;
                case '{':
                    return true;
                case '}':
                    return true;
                case ',':
                    return true;
                case '.':
                    return true;
                case '`':
                    return true;
            }
            return false;
        }

        createIDoom3Token(): IDoom3Token {
            return new Doom3Token();
        }

        private _current: IDoom3Token = new Doom3Token();
        moveNext(): boolean {
            return this._getNextToken(this._current);
        }
        get current(): IDoom3Token {
            return this._current;
        }
    }
}