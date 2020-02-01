module engine {
    export class Canvas2DApplication extends Application {
        context2D: CanvasRenderingContext2D | null;
        constructor(canvas: HTMLCanvasElement) {
            super(canvas);
            this.context2D = this.canvas.getContext('2d');
        }
    }
}