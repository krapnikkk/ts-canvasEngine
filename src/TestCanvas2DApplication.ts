module engine {
    type Repeatition = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
    type TextAlign = "start" | "left" | "center" | "right" | "end";
    type TextBaseline = "alphabetic" | "hanging" | "top" | "middle" | "bottom";
    type FontType = "10px sans-serif" | "15px sans-serif" | "20px sans-serif" | "25px sans-serif";
    type FontStyle = "normal" | "italic" | "oblique";
    type FontVariant = "normal" | "small-caps";
    type FontWeight = "normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    type FontSize = "10px" | "12px" | "16px" | "18px" | "24px" | "50%" | "75%" | "100%" | "125%" | "150%" | "xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large";
    type FontFamily = "sans-serif" | "serif" | "courier" | "fantasy" | "monospace";


    export class TestCanvas2DApplication extends Canvas2DApplication {
        constructor(canvas: HTMLCanvasElement) {
            super(canvas);
        }

        private _mouseX: number = 0;
        private _mouseY: number = 0;
        protected dispatchMouseMove(evt: CanvasMouseEvent): void {
            this._mouseX = evt.canvasPosition.x;
            this._mouseY = evt.canvasPosition.y;
        }

        render(): void {
            if (this.context2D !== null) {
                this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.strokeGrid();
                this.drawCanvasCoordCenter();

                // this.doTranslate();
                // this.doTransform(20, true);
                this.testFillLocalRectWithTitle();
                this.drawCoordInfo(`[${this._mouseX},${this._mouseY}]`, this._mouseX, this._mouseY);
            }
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
            // this.drawRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);

        }

        start() {
            console.log("start");
            // this.strokeGrid();
            // this.fillLinearRect(10, 10, 100, 100);
            // this.fillRadialGradient(10, 110, 100, 100);
            // this.fillPattern(10, 210, 400, 400);
            // this.printTextStates();
            // this.fillText("hello world",100,100);
            // this.testCanvas2DTextLayout();
            // this.testMyTextLayout();
            // this.loadAndDrawImage("./assets/test.jpg");
            // this.drawColorCanvas();
            // this.setShadowState();
            // this.testChangePartCanvasImageData();
            // this.printShadowStates();
            // this.printAllRenderStates();

            this.addTimer((id: number, data: any): void => {
                this.timeCallback(id, data);
            }, 0.05);
            super.start();
        }

        static Colors: string[] = [
            'aqua',    //浅绿色
            'black',   //黑色
            'blue',    //蓝色 
            'fuchsia', //紫红色
            'gray',     //灰色
            'green',   //绿色
            'lime',    //绿黄色
            'maroon',  //褐红色
            'navy',    //海军蓝
            'olive',   //橄榄色
            'orange',  //橙色
            'purple',  //紫色
            'red',      //红色
            'silver',  //银灰色
            'teal',    //蓝绿色
            'yellow',   //黄色
            'white'   //白色
        ];

        private _linearGradient!: CanvasGradient;
        fillLinearRect(x: number, y: number, w: number, h: number): void {
            if (this.context2D !== null) {
                this.context2D.save();
                if (this._linearGradient === undefined) {
                    this._linearGradient = this.context2D.createLinearGradient(x, y, x + w, y);
                    // this . _linearGradient = this . context2D . createLinearGradient ( x , y , x , y + h ) ;
                    // this . _linearGradient = this . context2D . createLinearGradient ( x , y , x + w , y + h ) ;
                    // this . _linearGradient = this . context2D . createLinearGradient ( x + w , y + h , x , y) ;
                    this._linearGradient.addColorStop(0.0, 'grey');
                    this._linearGradient.addColorStop(0.25, 'rgba( 255 , 0 , 0 , 1 ) ');
                    this._linearGradient.addColorStop(0.5, 'green');
                    this._linearGradient.addColorStop(0.75, '#0000FF');
                    this._linearGradient.addColorStop(1.0, 'black');
                }
                this.context2D.fillStyle = this._linearGradient;
                this.context2D.beginPath();
                this.context2D.rect(x, y, w, h);
                this.context2D.fill();
                this.context2D.restore();
            }

        }

        private _radialGradient!: CanvasGradient;
        fillRadialGradient(x: number, y: number, w: number, h: number): void {
            if (this.context2D !== null) {
                this.context2D.save();
                if (this._radialGradient === undefined) {
                    let centX: number = x + w * 0.5;
                    let centY: number = y + h * 0.5;
                    let radius: number = Math.min(w, h);
                    radius *= 0.5;
                    this._radialGradient = this.context2D.createRadialGradient(centX, centY, radius * 0.1, centX, centY, radius);
                    this._radialGradient.addColorStop(0.0, 'black');
                    this._radialGradient.addColorStop(0.25, 'rgba( 255 , 0 , 0 , 1 ) ');
                    this._radialGradient.addColorStop(0.5, 'green');
                    this._radialGradient.addColorStop(0.75, '#0000FF');
                    this._radialGradient.addColorStop(1.0, 'white');
                }
                this.context2D.fillStyle = this._radialGradient;
                this.context2D.beginPath();
                this.context2D.rect(x, y, w, h);
                this.context2D.fill();
                this.context2D.restore();
            }
        }

        private _pattern!: CanvasPattern;
        fillPattern(x: number, y: number, w: number, h: number, repeat: Repeatition = "repeat"): void {
            if (this.context2D !== null) {
                this.context2D.save();
                if (this._pattern === undefined) {
                    let img: HTMLImageElement = document.createElement('img') as HTMLImageElement;
                    img.src = './assets/test.jpg';
                    img.onload = (ev: Event): void => {
                        if (this.context2D !== null) {
                            this._pattern = this.context2D.createPattern(img, repeat)!;
                            if (this._pattern) {
                                this.context2D.fillStyle = this._pattern;
                            }
                            this.context2D.beginPath();
                            this.context2D.rect(x, y, w, h);
                            this.context2D.fill();
                            this.context2D.restore();
                        }
                    }
                } else {
                    this.context2D.fillStyle = this._pattern;
                    this.context2D.beginPath();
                    this.context2D.rect(x, y, w, h);
                    this.context2D.fill();
                    this.context2D.restore();
                }

            }
        }

        public fillRectangleWithColor(rect: Rectangle, color: string): void {
            if (rect.isEmpty()) {
                return;
            }
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.fillStyle = color;
                this.context2D.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                this.context2D.restore();
            }
        }

        fillCircle(x: number, y: number, radius: number, fillStyle: string | CanvasGradient | CanvasPattern = "red"): void {
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.fillStyle = fillStyle;
                this.context2D.beginPath();
                this.context2D.arc(x, y, radius, 0, Math.PI * 2);
                this.context2D.fill();
                this.context2D.restore();
            }
        }

        strokeLine(x0: number, y0: number, x1: number, y1: number): void {
            if (this.context2D !== null) {
                this.context2D.beginPath();
                this.context2D.moveTo(x0, y0);
                this.context2D.lineTo(x1, y1);
                this.context2D.stroke();
            }
        }

        strokeCoord(orginX: number, orginY: number, width: number, height: number, lineWidth: number = 3): void {
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.lineWidth = lineWidth;
                this.context2D.strokeStyle = 'red';
                this.strokeLine(orginX, orginY, orginX + width, orginY);
                this.context2D.strokeStyle = 'blue';
                this.strokeLine(orginX, orginY, orginX, orginY + height);
                this.context2D.restore();
            }
        }

        strokeRect(x: number, y: number, w: number, h: number, color: string = 'black'): void {
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.strokeStyle = color;
                this.context2D.beginPath();
                this.context2D.moveTo(x, y);
                this.context2D.lineTo(x + w, y);
                this.context2D.lineTo(x + w, y + h);
                this.context2D.lineTo(x, y + h);
                this.context2D.closePath();
                this.context2D.stroke();
                this.context2D.restore();
            }
        }

        strokeCircle(x: number, y: number, radius: number, color: string = 'red', lineWidth: number = 1): void {
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.strokeStyle = color;
                this.context2D.lineWidth = lineWidth;
                this.context2D.beginPath();
                this.context2D.arc(x, y, radius, 0, Math.PI * 2);
                this.context2D.stroke();
                this.context2D.restore();
            }
        }

        strokeGrid(color: string = "grey", interval: number = 10): void {
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.strokeStyle = color;
                this.context2D.lineWidth = 0.5;
                for (let i: number = interval + 0.5; i < this.canvas.width; i += interval) {
                    this.strokeLine(i, 0, i, this.canvas.height);
                }
                for (let i: number = interval + 0.5; i < this.canvas.height; i += interval) {
                    this.strokeLine(0, i, this.canvas.width, i);
                }
                this.context2D.restore();
                this.fillCircle(0, 0, 5, 'green');
                this.strokeCoord(0, 0, this.canvas.width, this.canvas.height);
            }
        }

        printTextStates(): void {
            if (this.context2D !== null) {
                console.log("=======TextState========");
                console.log(`font：${this.context2D.font}`);
                console.log(`textAlign：${this.context2D.textAlign}`);
                console.log(`textBaseline:${this.context2D.textBaseline}`);
            }
        }

        fillText(text: string, x: number, y: number, color: string = "black", align: TextAlign = "left", baseline: TextBaseline = "top", font: FontType = '10px sans-serif'): void {
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.textAlign = align;
                this.context2D.textBaseline = baseline;
                this.context2D.font = font;
                this.context2D.fillStyle = color;
                this.context2D.fillText(text, x, y);
                this.context2D.restore();
            }
        }

        calcTextSize(text: string, char: string = 'W', scale: number = 0.5): Size {
            if (this.context2D !== null) {
                let size: Size = new Size();
                size.width = this.context2D.measureText(text).width;
                let w: number = this.context2D.measureText(char).width;
                size.height = w + w * scale;
                return size;
            }

            alert(" context2D 渲染上下文为null ");
            throw new Error(" context2D 渲染上下文为null ");
        }

        testCanvas2DTextLayout(): void {
            let x: number = 20;
            let y: number = 20;
            let width: number = this.canvas.width - x * 2;
            let height: number = this.canvas.height - y * 2;
            let drawX: number = x;
            let drawY: number = y;
            let radius: number = 3;

            // this.fillRectWithTitle( x, y, width, height );
            this.fillText("left-top", drawX, drawY, 'black', 'left', 'top' /*, '20px sans-serif' */);
            this.fillCircle(drawX, drawY, radius, 'black');

            drawX = x + width;
            drawY = y;
            this.fillText("right-top", drawX, drawY, 'black', 'right', 'top' /* , '20px sans-serif' */);
            this.fillCircle(drawX, drawY, radius, 'black');

            drawX = x + width;
            drawY = y + height;
            this.fillText("right-bottom", drawX, drawY, 'black', 'right', 'bottom' /* , '20px sans-serif' */);
            this.fillCircle(drawX, drawY, radius, 'black');

            drawX = x;
            drawY = y + height;
            this.fillText("left-bottom", drawX, drawY, 'black', 'left', 'bottom' /* , '20px sans-serif' */);
            this.fillCircle(drawX, drawY, radius, 'black');

            drawX = x + width * 0.5;
            drawY = y + height * 0.5;
            this.fillText("center-middle", drawX, drawY, 'black', 'center', 'middle' /* , '20px sans-serif' */);
            this.fillCircle(drawX, drawY, radius, 'red');

            drawX = x + width * 0.5;
            drawY = y;
            this.fillText("center-top", drawX, drawY, 'blue', 'center', 'top' /* , '20px sans-serif' */);
            this.fillCircle(drawX, drawY, radius, 'black');

            drawX = x + width;
            drawY = y + height * 0.5;
            this.fillText("right-middle", drawX, drawY, 'blue', 'right', 'middle' /* , '20px sans-serif' */);
            this.fillCircle(drawX, drawY, radius, 'black');

            drawX = x + width * 0.5;
            drawY = y + height;
            this.fillText("center-bottom", drawX, drawY, 'blue', 'center', 'bottom');
            this.fillCircle(drawX, drawY, radius, 'black');

            drawX = x;
            drawY = y + height * 0.5;
            this.fillText("left-middle", drawX, drawY, 'blue', 'left', 'middle' /* , '20px sans-serif' */);
            this.fillCircle(drawX, drawY, radius, 'black');
        }

        calcLocalTextRectangle(layout: ELayout, text: string, parentWidth: number, parentHeight: number): Rectangle {
            let s: Size = this.calcTextSize(text);
            let o: vec2 = vec2.create();
            let left: number = 0;
            let top: number = 0;
            let right: number = parentWidth - s.width;
            let bottom: number = parentHeight - s.height;
            let center: number = right * 0.5;
            let middle: number = bottom * 0.5;
            switch (layout) {
                case ELayout.LEFT_TOP:
                    o.x = left;
                    o.y = top;
                    break;
                case ELayout.RIGHT_TOP:
                    o.x = right;
                    o.y = top;
                    break;
                case ELayout.RIGHT_BOTTOM:
                    o.x = right;
                    o.y = bottom;
                    break;
                case ELayout.LEFT_BOTTOM:
                    o.x = left;
                    o.y = bottom;
                    break;
                case ELayout.CENTER_MIDDLE:
                    o.x = center;
                    o.y = middle;
                    break;
                case ELayout.CENTER_TOP:
                    o.x = center;
                    o.y = 0;
                    break;
                case ELayout.RIGHT_MIDDLE:
                    o.x = right;
                    o.y = middle;
                    break;
                case ELayout.CENTER_BOTTOM:
                    o.x = center;
                    o.y = bottom;
                    break;
                case ELayout.LEFT_MIDDLE:
                    o.x = left;
                    o.y = middle;
                    break;
            }
            return new Rectangle(o, s);
        }

        fillRectWithTitle(x: number, y: number, width: number, height: number, title: string = '', layout: ELayout = ELayout.CENTER_MIDDLE, color: string = 'grey', showCoord: boolean = true): void {
            if (this.context2D !== null) {

                this.context2D.save();
                this.context2D.fillStyle = color;
                this.context2D.beginPath();
                this.context2D.rect(x, y, width, height);
                this.context2D.fill();
                if (title.length !== 0) {
                    let rect: Rectangle = this.calcLocalTextRectangle(layout, title, width, height);
                    this.fillText(title, x + rect.origin.x, y + rect.origin.y, 'white', 'left', 'top' /*, '10px sans-serif'*/);
                    this.strokeRect(x + rect.origin.x, y + rect.origin.y, rect.size.width, rect.size.height, 'rgba( 0 , 0 , 0 , 0.5 ) ');
                    this.fillCircle(x + rect.origin.x, y + rect.origin.y, 2);
                }
                if (showCoord) {
                    this.strokeCoord(x, y, width + 20, height + 20);
                    this.fillCircle(x, y, 3);
                }

                this.context2D.restore();
            }
        }

        makeFontString(size: FontSize = '10px',
            weight: FontWeight = 'normal',
            style: FontStyle = 'normal',
            variant: FontVariant = 'normal',
            family: FontFamily = 'sans-serif',
        ): string {
            let strs: string[] = [];
            strs.push(style);
            strs.push(variant);
            strs.push(weight);
            strs.push(size);
            strs.push(family);
            let ret: string = strs.join(" ");
            console.log(ret);
            return ret;
        }

        testMyTextLayout(font: string = this.makeFontString("10px", "normal", "normal", "normal", 'sans-serif')): void {

            let x: number = 20;
            let y: number = 20;
            let width: number = this.canvas.width - x * 2;
            let height: number = this.canvas.height - y * 2;
            let right: number = x + width;
            let bottom: number = y + height;

            let drawX: number = x;
            let drawY: number = y;
            let drawWidth: number = 150;
            let drawHeight: number = 50;

            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.font = font;
                this.fillRectWithTitle(x, y, width, height);
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-top', ELayout.LEFT_TOP, 'rgba( 255 , 255 , 0 , 0.2 )');
                drawX = right - drawWidth;
                drawY = y;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-top', ELayout.RIGHT_TOP, 'rgba( 255 , 255 , 0 , 0.2 )');
                drawX = right - drawWidth;
                drawY = bottom - drawHeight;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-bottom', ELayout.RIGHT_BOTTOM, 'rgba( 255 , 255 , 0 , 0.2 )');
                drawX = x;
                drawY = bottom - drawHeight;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-bottom', ELayout.LEFT_BOTTOM, 'rgba( 255 , 255 , 0 , 0.2 )');
                drawX = (right - drawWidth) * 0.5;
                drawY = (bottom - drawHeight) * 0.5;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-middle', ELayout.CENTER_MIDDLE, 'rgba( 255 , 0 , 0 , 0.2 )');
                drawX = (right - drawWidth) * 0.5;
                drawY = y;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-top', ELayout.CENTER_TOP, 'rgba( 0 , 255 , 0 , 0.2 )');
                drawX = (right - drawWidth);
                drawY = (bottom - drawHeight) * 0.5;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-middle', ELayout.RIGHT_MIDDLE, 'rgba( 0 , 255 , 0 , 0.2 )');
                drawX = (right - drawWidth) * 0.5;
                drawY = (bottom - drawHeight);
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-bottom', ELayout.CENTER_BOTTOM, 'rgba( 0 , 255 , 0 , 0.2 )');
                drawX = x;
                drawY = (bottom - drawHeight) * 0.5;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-middle', ELayout.LEFT_MIDDLE, 'rgba( 0 , 255 , 0 , 0.2 )');
            }
        }

        loadAndDrawImage(url: string): void {
            let img: HTMLImageElement = document.createElement('img');
            img.src = url;
            img.onload = (evt: Event) => {
                if (this.context2D !== null) {
                    console.log(`${url}尺寸为${img.width},${img.height}`);
                    // this.context2D.drawImage(img, 10, 10);
                    // this.context2D.drawImage(img, img.width + 30, 10, 200, img.height);
                    // this.context2D.drawImage(img, 44, 6, 162, 175, 200, img.height + 30, 200, 130);
                    // this . drawImage ( img , Rectangle .create ( 20, 20 , 540 , 300 ) , Rectangle . create ( 44 , 6 , 162 , 175 ) , EImageFillType . STRETCH ) ;
                    this.drawImage(img, Rectangle.create(20, 20, 1000, 500), Rectangle.create(44, 6, 162, 175), EImageFillType.REPEAT);
                }
            }
        }

        drawImage(img: HTMLImageElement | HTMLCanvasElement, destRect: Rectangle, srcRect: Rectangle = Rectangle.create(0, 0, img.width, img.height), fillType: EImageFillType = EImageFillType.STRETCH) {
            if (this.context2D === null) {
                return false;
            }
            if (destRect.isEmpty()) {
                return false;
            }
            if (srcRect.isEmpty()) {
                return false;
            }
            if (fillType === EImageFillType.STRETCH) {
                this.context2D.drawImage(img,
                    srcRect.origin.x,
                    srcRect.origin.y,
                    srcRect.size.width,
                    srcRect.size.height,
                    destRect.origin.x,
                    destRect.origin.y,
                    destRect.size.width,
                    destRect.size.height
                );
            } else {
                this.fillRectangleWithColor(destRect, 'grey');
                let rows: number = Math.ceil(destRect.size.width / srcRect.size.width);
                let colums: number = Math.ceil(destRect.size.height / srcRect.size.height);
                let left: number = 0;
                let top: number = 0;
                let right: number = 0;
                let bottom: number = 0;
                let width: number = 0;
                let height: number = 0;
                let destRight: number = destRect.origin.x + destRect.size.width;
                let destBottom: number = destRect.origin.y + destRect.size.height;
                if (fillType === EImageFillType.REPEAT_X) {
                    colums = 1;
                } else if (fillType === EImageFillType.REPEAT_Y) {
                    rows = 1;
                }

                for (let i: number = 0; i < rows; i++) {
                    for (let j: number = 0; j < colums; j++) {
                        left = destRect.origin.x + i * srcRect.size.width;
                        top = destRect.origin.y + j * srcRect.size.height;

                        width = srcRect.size.width;
                        height = srcRect.size.height;
                        right = left + width;
                        bottom = top + height;
                        if (right > destRight) {
                            width = srcRect.size.width - (right - destRight);
                        }
                        if (bottom > destBottom) {
                            height = srcRect.size.height - (bottom - destBottom);
                        }
                        this.context2D.drawImage(img,
                            srcRect.origin.x,
                            srcRect.origin.y,
                            width,
                            height,
                            left, top, width, height
                        );
                    }
                }
            }
            return true;
        }

        getColorCanvas(amount: number = 32): HTMLCanvasElement {
            let step: number = 4;
            let canvas: HTMLCanvasElement = document.createElement("canvas");
            canvas.width = amount * step;
            canvas.height = amount * step;
            let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
            if (ctx === null) {
                throw new Error("离屏Canvas获取渲染上下文失败！");
            }
            for (let i = 0; i < step; i++) {
                for (let j: number = 0; j < step; j++) {
                    let idx: number = step * i + j;
                    ctx.save();
                    ctx.fillStyle = TestCanvas2DApplication.Colors[idx];
                    ctx.fillRect(i * amount, j * amount, amount, amount);
                    ctx.restore();
                }
            }

            return canvas;
        }

        drawColorCanvas(): void {
            let colorCanvas: HTMLCanvasElement = this.getColorCanvas();
            this.drawImage(colorCanvas, Rectangle.create(100, 100, colorCanvas.width, colorCanvas.height));
        }

        testChangePartCanvasImageData(rRow: number = 2, rColum: number = 0, cRow: number = 1, cColum: number = 0, size: number = 32): void {
            let colorCanvas: HTMLCanvasElement = this.getColorCanvas(size);
            let ctx: CanvasRenderingContext2D | null = colorCanvas.getContext("2d");
            if (ctx === null) {
                throw new Error("Canvas获取渲染上下文失败！");
            }
            this.drawImage(colorCanvas, Rectangle.create(100, 100, colorCanvas.width, colorCanvas.height));
            let imgData: ImageData = ctx.createImageData(size, size);

            let data: Uint8ClampedArray = imgData.data;
            let rbgaCount: number = data.length / 4;
            for (let i = 0; i < rbgaCount; i++) {
                data[i * 4 + 0] = 255;
                data[i * 4 + 1] = 0;
                data[i * 4 + 2] = 0;
                data[i * 4 + 3] = 255;
            }
            ctx.putImageData(imgData, size * rColum, size * rRow, 0, 0, size, size);
            imgData = ctx.getImageData(size * cColum, size * cRow, size, size);
            data = imgData.data;
            let component: number = 0;
            for (let i: number = 0; i < imgData.width; i++) {
                for (let j: number = 0; j < imgData.height; j++) {
                    for (let k: number = 0; k < 4; k++) {
                        let idx: number = (i * imgData.height + j) * 4 + k;
                        component = data[idx];
                        if (idx % 4 !== 3) {
                            data[idx] = 255 - component;
                        }
                    }
                }
            }
            ctx.putImageData(imgData, size * cColum, size * cRow, 0, 0, size, size);
            this.drawImage(colorCanvas, Rectangle.create(300, 100, colorCanvas.width, colorCanvas.height));
        }

        printShadowStates(): void {
            if (this.context2D !== null) {
                console.log("======ShadowState======");
                console.log(" shadowBlur : " + this.context2D.shadowBlur);
                console.log(" shadowColor : " + this.context2D.shadowColor);
                console.log(" shadowOffsetX : " + this.context2D.shadowOffsetX);
                console.log(" shadowOffsetY : " + this.context2D.shadowOffsetY);
            }
        }

        setShadowState(shadowBlur: number = 5, shadowColor: string = "rgba( 127 , 127 , 127 , 0.5 )", shadowOffsetX: number = 10, shadowOffsetY: number = 10): void {
            if (this.context2D !== null) {
                this.context2D.shadowBlur = shadowBlur;
                this.context2D.shadowColor = shadowColor;
                this.context2D.shadowOffsetX = shadowOffsetX;
                this.context2D.shadowOffsetY = shadowOffsetY;
            }
        }

        printAllRenderStates(): void {
            if (this.context2D !== null) {
                console.log("======LineState======");
                console.log(" lineWidth : " + this.context2D.lineWidth);
                console.log(" lineCap : " + this.context2D.lineCap);
                console.log(" lineJoin : " + this.context2D.lineJoin);
                console.log(" miterLimit : " + this.context2D.miterLimit);

                console.log("======LineDashState======");
                console.log(" lineDashOffset : " + this.context2D.lineDashOffset);

                console.log("======ShadowState======");
                console.log(" shadowBlur : " + this.context2D.shadowBlur);
                console.log(" shadowColor : " + this.context2D.shadowColor);
                console.log(" shadowOffsetX : " + this.context2D.shadowOffsetX);
                console.log(" shadowOffsetY : " + this.context2D.shadowOffsetY);

                console.log("*********TextState**********");
                console.log(" font : " + this.context2D.font);
                console.log(" textAlign : " + this.context2D.textAlign);
                console.log(" textBaseline : " + this.context2D.textBaseline);

                console.log("*********RenderState**********");
                console.log(" strokeStyle : " + this.context2D.strokeStyle);
                console.log(" fillStyle : " + this.context2D.fillStyle);
                console.log(" globalAlpha : " + this.context2D.globalAlpha);
                console.log(" globalCompositeOperation : " + this.context2D.globalCompositeOperation);
            }
        }

        /**
         * 
         * TransformApplication
         * 
         */

        drawCanvasCoordCenter(): void {
            if (this.context2D === null) {
                return;
            }
            let halfWidth: number = this.canvas.width * 0.5;
            let halfHeight: number = this.canvas.height * 0.5;

            this.context2D.save();
            this.context2D.lineWidth = 2;
            this.context2D.strokeStyle = 'rgba( 255 , 0 , 0 , 0.5 ) ';

            this.strokeLine(0, halfHeight, this.canvas.width, halfHeight);
            this.context2D.strokeStyle = 'rgba( 0 , 0 , 255 , 0.5 )';

            this.strokeLine(halfWidth, 0, halfWidth, this.canvas.height);
            this.context2D.restore();

            this.fillCircle(halfWidth, halfHeight, 5, 'rgba( 0 , 0 , 0 , 0.5 ) ');
        }

        drawCoordInfo(info: string, x: number, y: number): void {
            this.fillText(info, x, y, 'black', 'center', 'bottom');
        }

        distance(x0: number, y0: number, x1: number, y1: number): number {
            let diffX: number = x1 - x0;
            let diffY: number = y1 - y0;
            return Math.sqrt(diffX * diffX + diffY * diffY);
        }

        fillLocalRectWithTitle(width: number, height: number, title: string = '', referencePt: ELayout = ELayout.LEFT_TOP, layout: ELayout = ELayout.CENTER_MIDDLE, color: string = 'grey', showCoord: boolean = true): void {
            if (this.context2D !== null) {

                let x: number = 0;
                let y: number = 0;

                switch (referencePt) {
                    case ELayout.LEFT_TOP:
                        x = 0;
                        y = 0;
                        break;
                    case ELayout.LEFT_MIDDLE:
                        x = 0;
                        y = - height * 0.5;
                        break;
                    case ELayout.LEFT_BOTTOM:
                        x = 0;
                        y = - height;
                        break;
                    case ELayout.RIGHT_TOP:
                        x = - width;
                        y = 0;
                        break;
                    case ELayout.RIGHT_MIDDLE:
                        x = - width;
                        y = - height * 0.5;
                        break;
                    case ELayout.RIGHT_BOTTOM:
                        x = - width;
                        y = - height;
                        break;
                    case ELayout.CENTER_TOP:
                        x = - width * 0.5;
                        y = 0;
                        break;
                    case ELayout.CENTER_MIDDLE:
                        x = - width * 0.5;
                        y = -height * 0.5;
                        break;
                    case ELayout.CENTER_BOTTOM:
                        x = - width * 0.5;
                        y = -height;
                        break;
                }

                this.context2D.save();
                this.context2D.fillStyle = color;
                this.context2D.beginPath();
                this.context2D.rect(x, y, width, height);
                this.context2D.fill();
                if (title.length !== 0) {
                    let rect: Rectangle = this.calcLocalTextRectangle(layout, title, width, height);
                    this.fillText(title, x + rect.origin.x, y + rect.origin.y, 'white', 'left', 'top' /*, '10px sans-serif'*/);
                    this.strokeRect(x + rect.origin.x, y + rect.origin.y, rect.size.width, rect.size.height, 'rgba( 0 , 0 , 0 , 0.5 ) ');
                    this.fillCircle(x + rect.origin.x, y + rect.origin.y, 2);
                }
                if (showCoord) {
                    this.strokeCoord(0, 0, width + 20, height + 20);
                    this.fillCircle(0, 0, 3);
                }

                this.context2D.restore();

            }
        }

        rotateTranslate(degree: number, layout: ELayout = ELayout.LEFT_TOP, width: number = 40, height: number = 20): void {
            if (this.context2D === null) {
                return;
            }
            let radians: number = Math2D.toRadian(degree);
            this.context2D.save();
            this.context2D.rotate(radians);
            this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
            this.fillLocalRectWithTitle(width, height, "", layout);
            this.context2D.restore();
        }

        doTranslate(): void {
            if (this.context2D !== null) {
                let width: number = 100;
                let height: number = 60;
                let x: number = this.canvas.width * 0.5;
                let y: number = this.canvas.height * 0.5;
                this.context2D.save();
                this.context2D.translate(x, y);
                this.fillRectWithTitle(0, 0, width, height, "平移到中心");
                this.context2D.restore();
            }
        }

        doTransform(degree: number, rotateFirst: boolean = true): void {
            if (this.context2D !== null) {
                let radians: number = Math2D.toRadian(degree);
                this.context2D.save();
                if (rotateFirst) {
                    this.context2D.rotate(radians);
                    this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
                } else {
                    this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
                    this.context2D.rotate(radians);
                }
                // this.fillRectWithTitle(0, 0, 100, 60, '+' + degree + '度旋转');
                this.fillLocalRectWithTitle(100, 60, '+' + degree + '度旋转', ELayout.CENTER_MIDDLE);
                this.context2D.restore();

                this.context2D.save();
                if (rotateFirst) {
                    this.context2D.rotate(- radians);
                    this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);

                } else {
                    this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
                    this.context2D.rotate(- radians);
                }
                // this.fillRectWithTitle(0, 0, 100, 60, '-' + degree + '度旋转');
                this.fillLocalRectWithTitle(100, 60, '-' + degree + '度旋转', ELayout.CENTER_MIDDLE);
                this.context2D.restore();
                let radius: number = this.distance(0, 0, this.canvas.width * 0.5, this.canvas.height * 0.5);
                this.strokeCircle(0, 0, radius, 'black');
            }
        }

        testFillLocalRectWithTitle(): void {
            if (this.context2D !== null) {
                this.rotateTranslate(0, ELayout.LEFT_TOP);
                this.rotateTranslate(8, ELayout.LEFT_MIDDLE);
                this.rotateTranslate(16, ELayout.LEFT_BOTTOM);
                this.rotateTranslate(24, ELayout.CENTER_TOP);
                this.rotateTranslate(32, ELayout.CENTER_MIDDLE);
                this.rotateTranslate(- 8, ELayout.CENTER_BOTTOM);
                this.rotateTranslate(- 16, ELayout.RIGHT_TOP);
                this.rotateTranslate(- 24, ELayout.RIGHT_MIDDLE);
                this.rotateTranslate(- 32, ELayout.RIGHT_BOTTOM);
                let radius: number = this.distance(0, 0, this.canvas.width * 0.5, this.canvas.height * 0.5);
                this.strokeCircle(0, 0, radius, 'black');
            }
        }
    }

}