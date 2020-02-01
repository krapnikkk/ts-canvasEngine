module engine {
    export class CanvasInputEvent {
        altKey: boolean;
        ctrlKey: boolean;
        shiftKey: boolean;
        type: EInputEventType;
        constructor(altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false, type: EInputEventType = EInputEventType.MOUSEEVENT) {
            this.altKey = altKey;
            this.ctrlKey = ctrlKey;
            this.shiftKey = shiftKey;
            this.type = type;
        }
    }
}