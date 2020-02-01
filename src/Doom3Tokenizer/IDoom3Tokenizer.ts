module engine {
    export interface IDoom3Tokenizer extends IEnumerator<IDoom3Token> {
        setSource(source: string): void;
        // createIDoom3Token(): IDoom3Token;
        /**
         * replace by IEnumerator
         * 
         */
        // reset(): void;
        // getNextToken(token: IDoom3Token): boolean;
    }
}