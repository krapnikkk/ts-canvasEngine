module engine {
    export class TestCanvas2DApplication extends Canvas2DApplication {
        constructor(canvas: HTMLCanvasElement) {
            super(canvas);
        }
        drawRect(x: number, y: number, w: number, h: number): void {
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.lineWidth = 20;
                this.context2D.lineCap = 'round';
                this.context2D.lineJoin = 'miter';
                this.context2D.miterLimit = 1.3;
                this.context2D.lineDashOffset = this._lineDashOffset;

                this.context2D.strokeStyle = 'blue';
                this.context2D.fillStyle = "grey";
                this.context2D.setLineDash([30, 40]);
                this.context2D.beginPath();
                this.context2D.moveTo(x, y);
                this.context2D.lineTo(x + w, y);
                this.context2D.lineTo(x + w, y + h);
                this.context2D.lineTo(x, y + h);
                this.context2D.closePath();
                this.context2D.fill();
                this.context2D.stroke();
                this.context2D.restore();
            }
        }

        testMyRenderStateStack(): void {
            let stack: RenderStateStack = new RenderStateStack();
            stack.printCurrentStateInfo();
            stack.save();
            stack.lineWidth = 10;
            stack.fillStyle = 'black';
            stack.printCurrentStateInfo();
            stack.restore();
            stack.printCurrentStateInfo();
        }

        printLineStates(): void {
            if (this.context2D !== null) {
                console.log(`
                    ******lineState******
                    lineWidth:${this.context2D.lineWidth};
                    lineCap:${this.context2D.lineCap};
                    lineJoin:${this.context2D.lineJoin};
                    miterLimit:${this.context2D.miterLimit}
                `);
            }
        }

        private _lineDashOffset: number = 0;
        private _updateLineDashOffset(): void {
            this._lineDashOffset++;
            if (this._lineDashOffset > 1000) {
                this._lineDashOffset = 0;
            }
        }

        timeCallback(id: number, data: any) {
            this._updateLineDashOffset();
            this.drawRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
        }

        start() {
            console.log("start");
            this.addTimer((id: number, data: any): void => {
                this.timeCallback(id, data);
            }, 0.05);
            super.start();
        }

    }

}