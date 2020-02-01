module engine {
    export class CanvasKeyBoardEvent extends CanvasInputEvent {
        key: string;
        keyCode: number;
        repeat: boolean;
        constructor(key: string, keyCode: number, repeat: boolean = false, altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false) {
            super(altKey, ctrlKey, shiftKey, EInputEventType.KEYBOARDEVENT);
            this.key = key;
            this.keyCode = keyCode;
            this.repeat = repeat;
        }
    }
}