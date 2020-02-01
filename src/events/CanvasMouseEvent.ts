module engine {
    export class CanvasMouseEvent extends CanvasInputEvent {
        button: number;
        localPosition: vec2;
        canvasPosition: vec2;
        constructor(canvasPos: vec2, button: number, altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false) {
            super(altKey, ctrlKey, shiftKey);
            this.canvasPosition = canvasPos;
            this.button = button;
            this.localPosition = vec2.create();
        }
    }
}