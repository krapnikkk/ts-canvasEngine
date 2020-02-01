module engine {
    export class Doom3Factory {
        static createDoom3Tokenizer(): IDoom3Tokenizer {
            let ret: IDoom3Tokenizer = new Doom3Tokenizer();
            return ret;
        }
    }
}