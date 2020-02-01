module engine {
    export interface IDoom3Token {
        reset(): void;
        isString(str: string): boolean;
        readonly type: ETokenType;
        getString(): string;
        getFloat(): number;
        getInt(): number;
    }

}