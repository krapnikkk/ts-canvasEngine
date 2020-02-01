module engine {
    export class Doom3Token implements IDoom3Token {
        private _type: ETokenType;
        private _charArr: string[] = [];
        private _val: number;
        constructor() {
            this._charArr = [];
            this._type = ETokenType.NONE;
            this._val = 0.0;
        }
        reset(): void {
            this._charArr = [];
            this._type = ETokenType.NONE;
            this._val = 0.0;
        }
        isString(str: string): boolean {
            const count: number = this._charArr.length;
            for (let i = 0; i < count; i++) {
                if (this._charArr[i] !== str[i]) {
                    return false;
                }
            }
            return true;
        }

        get type(): ETokenType {
            return this._type;
        }

        getString(): string {
            return this._charArr.join("");
        }

        getFloat(): number {
            return this._val;
        }

        getInt(): number {
            return parseInt(this._val.toString(), 10);
        }

        addChar(c: string): void {
            this._charArr.push(c);
        }

        setVal(num: number): void {
            this._val = num;
            this._type = ETokenType.NUMBER;
        }

        setType(type: ETokenType): void {

        }
    }
}
