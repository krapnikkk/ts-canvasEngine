declare module engine {
    class Application implements EventListenerObject {
        protected _isMouseDown: boolean;
        protected _isSupportMouseMove: boolean;
        protected _start: boolean;
        protected _requestId: number;
        protected _lastTime: number;
        protected _startTime: number;
        canvas: HTMLCanvasElement;
        timers: Timer[];
        private _timeId;
        constructor(canvas: HTMLCanvasElement);
        start(): void;
        step(timeStamp: number): void;
        stop(): void;
        isRunning(): boolean;
        update(elapsedMsec: number, intervalMsec: number): void;
        render(): void;
        private _viewportToCanvasCoordinate;
        private _toCanvasMouseEvent;
        private _toCanvasKeyBoardEvent;
        handleEvent(evt: Event): void;
        protected dispatchMouseDown(evt: CanvasMouseEvent): void;
        protected dispatchMouseUp(evt: CanvasMouseEvent): void;
        protected dispatchMouseMove(evt: CanvasMouseEvent): void;
        protected dispatchMouseDrag(evt: CanvasMouseEvent): void;
        protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void;
        protected dispatchKeyUp(evt: CanvasKeyBoardEvent): void;
        protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void;
        removeTimer(id: number): boolean;
        addTimer(callback: TimerCallback, timeout?: number, onlyOnce?: boolean, data?: any): number;
        private _handleTimers;
        private _fps;
        get fps(): number;
    }
}
declare module engine {
    class Canvas2DApplication extends Application {
        context2D: CanvasRenderingContext2D | null;
        constructor(canvas: HTMLCanvasElement);
    }
}
declare module engine {
    class RenderState {
        lineWidth: number;
        strokeStyle: string;
        fillStyle: string;
        clone(): RenderState;
        toString(): string;
    }
}
declare module engine {
    class RenderStateStack {
        private _stack;
        private get _currentState();
        save(): void;
        restore(): void;
        get lineWidth(): number;
        set lineWidth(value: number);
        get strokeStyle(): string;
        set strokeStyle(value: string);
        get fillStyle(): string;
        set fillStyle(value: string);
        printCurrentStateInfo(): void;
    }
}
declare module engine {
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
        constructor(canvas: HTMLCanvasElement);
        drawRect(x: number, y: number, w: number, h: number): void;
        testMyRenderStateStack(): void;
        printLineStates(): void;
        private _lineDashOffset;
        private _updateLineDashOffset;
        timeCallback(id: number, data: any): void;
        start(): void;
        static Colors: string[];
        private _linearGradient;
        fillLinearRect(x: number, y: number, w: number, h: number): void;
        private _radialGradient;
        fillRadialGradient(x: number, y: number, w: number, h: number): void;
        private _pattern;
        fillPattern(x: number, y: number, w: number, h: number, repeat?: Repeatition): void;
        fillCircle(x: number, y: number, radius: number, fillStyle?: string | CanvasGradient | CanvasPattern): void;
        strokeLine(x0: number, y0: number, x1: number, y1: number): void;
        strokeCoord(orginX: number, orginY: number, width: number, height: number, lineWidth?: number): void;
        strokeRect(x: number, y: number, w: number, h: number, color?: string): void;
        strokeGrid(color?: string, interval?: number): void;
        printTextStates(): void;
        fillText(text: string, x: number, y: number, color?: string, align?: TextAlign, baseline?: TextBaseline, font?: FontType): void;
        calcTextSize(text: string, char?: string, scale?: number): Size;
        testCanvas2DTextLayout(): void;
        calcLocalTextRectangle(layout: ELayout, text: string, parentWidth: number, parentHeight: number): Rectangle;
        fillRectWithTitle(x: number, y: number, width: number, height: number, title?: string, layout?: ELayout, color?: string, showCoord?: boolean): void;
        makeFontString(size?: FontSize, weight?: FontWeight, style?: FontStyle, variant?: FontVariant, family?: FontFamily): string;
        testMyTextLayout(font?: string): void;
        loadAndDrawImage(url: string): void;
    }
    export {};
}
declare module engine {
    class Timer {
        id: number;
        enabled: boolean;
        callback: TimerCallback;
        callbackData: any;
        countdown: number;
        timeout: number;
        onlyOnce: boolean;
        constructor(callback: TimerCallback);
    }
    type TimerCallback = (id: number, data: any) => void;
}
declare module engine {
    class WebGLApplication extends Application {
        context3D: WebGLRenderingContext | null;
        constructor(canvas: HTMLCanvasElement, contextAttributes?: WebGLContextAttributes);
    }
}
declare module engine {
    class Doom3Token implements IDoom3Token {
        private _type;
        private _charArr;
        private _val;
        constructor();
        reset(): void;
        isString(str: string): boolean;
        get type(): ETokenType;
        getString(): string;
        getFloat(): number;
        getInt(): number;
        addChar(c: string): void;
        setVal(num: number): void;
        setType(type: ETokenType): void;
    }
}
declare module engine {
    class Doom3Tokenizer implements IDoom3Tokenizer {
        private _digits;
        private _isDigit;
        private _whiteSpaces;
        private _isWhiteSpace;
        private _source;
        private _currIdx;
        setSource(source: string): void;
        reset(): void;
        private _getChar;
        private _peekChar;
        private _ungetChar;
        private _getNextToken;
        private _skipWhiteSpace;
        private _skipComments0;
        private _skipComments1;
        private _getNumber;
        private _getsubstring;
        private _getString;
        private _isSpecialChar;
        createIDoom3Token(): IDoom3Token;
        private _current;
        moveNext(): boolean;
        get current(): IDoom3Token;
    }
}
declare module engine {
    class Doom3Factory {
        static createDoom3Tokenizer(): IDoom3Tokenizer;
    }
}
declare module engine {
    interface IDoom3Token {
        reset(): void;
        isString(str: string): boolean;
        readonly type: ETokenType;
        getString(): string;
        getFloat(): number;
        getInt(): number;
    }
}
declare module engine {
    interface IDoom3Tokenizer extends IEnumerator<IDoom3Token> {
        setSource(source: string): void;
    }
}
declare module engine {
    enum EInputEventType {
        MOUSEEVENT = 0,
        MOUSEDOWN = 1,
        MOUSEUP = 2,
        MOUSEMOVE = 3,
        MOUSEDRAG = 4,
        KEYBOARDEVENT = 5,
        KEYUP = 6,
        KEYDOWN = 7,
        KEYPRESS = 8
    }
}
declare module engine {
    enum ELayout {
        LEFT_TOP = 0,
        RIGHT_TOP = 1,
        RIGHT_BOTTOM = 2,
        LEFT_BOTTOM = 3,
        CENTER_MIDDLE = 4,
        CENTER_TOP = 5,
        RIGHT_MIDDLE = 6,
        CENTER_BOTTOM = 7,
        LEFT_MIDDLE = 8
    }
}
declare module engine {
    enum ETextLayout {
        LEFT_TOP = 0,
        RIGHT_TOP = 1,
        RIGHT_BOTTOM = 2,
        LEFT_BOTTOM = 3,
        CENTER_MIDDLE = 4,
        CENTER_TOP = 5,
        CENTER_BOTTOM = 6,
        LETT_MIDDLE = 7
    }
}
declare module engine {
    enum ETokenType {
        NONE = 0,
        STRING = 1,
        NUMBER = 2
    }
}
declare module engine {
    class CanvasInputEvent {
        altKey: boolean;
        ctrlKey: boolean;
        shiftKey: boolean;
        type: EInputEventType;
        constructor(altKey?: boolean, ctrlKey?: boolean, shiftKey?: boolean, type?: EInputEventType);
    }
}
declare module engine {
    class CanvasKeyBoardEvent extends CanvasInputEvent {
        key: string;
        keyCode: number;
        repeat: boolean;
        constructor(key: string, keyCode: number, repeat?: boolean, altKey?: boolean, ctrlKey?: boolean, shiftKey?: boolean);
    }
}
declare module engine {
    class CanvasMouseEvent extends CanvasInputEvent {
        button: number;
        localPosition: vec2;
        canvasPosition: vec2;
        constructor(canvasPos: vec2, button: number, altKey?: boolean, ctrlKey?: boolean, shiftKey?: boolean);
    }
}
declare module engine {
}
declare module engine {
    class Rectangle {
        origin: vec2;
        size: Size;
        constructor(orign?: vec2, size?: Size);
        static create(x?: number, y?: number, w?: number, h?: number): Rectangle;
    }
}
declare module engine {
    class Size {
        values: Float32Array;
        constructor(w?: number, h?: number);
        set width(value: number);
        get width(): number;
        set height(value: number);
        get height(): number;
        static create(w?: number, h?: number): Size;
    }
}
declare module engine {
    class vec2 {
        values: Float32Array;
        constructor(x?: number, y?: number);
        toString(): string;
        get x(): number;
        set x(x: number);
        get y(): number;
        set y(y: number);
        reset(x: number | undefined, y: number): vec2;
        static create(x?: number, y?: number): vec2;
    }
}
declare module engine {
    interface IEnumerator<T> {
        reset(): void;
        moveNext(): boolean;
        readonly current: T;
    }
}
declare module "utils/HttpRequset" {
    export interface HttpResponse {
        success: boolean;
        responseType: string;
        response: any;
    }
    export class HttpRequset {
        static doGet(url: string): HttpResponse;
    }
}
