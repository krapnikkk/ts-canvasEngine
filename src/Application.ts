module engine {
    export class Application implements EventListenerObject {
        protected _isMouseDown: boolean;
        protected _isSupportMouseMove: boolean;

        protected _start: boolean = false;
        protected _requestId: number = -1;
        protected _lastTime!: number;
        protected _startTime!: number;
        canvas!: HTMLCanvasElement;
        timers: Timer[] = [];
        private _timeId: number = -1;
        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            this.canvas.addEventListener("mousedown", this, false);
            this.canvas.addEventListener("mouseup", this, false);
            this.canvas.addEventListener("mousemove", this, false);
            window.addEventListener("keydown", this, false);
            window.addEventListener("keyup", this, false);
            window.addEventListener("keypress", this, false);
            this._isMouseDown = false;
            this._isSupportMouseMove = true;
        }
        start(): void {
            if (!this._start) {
                this._start = true;
                this._requestId = this._lastTime = this._startTime = -1;
                this._requestId = requestAnimationFrame(this.step.bind(this));
            }
        }

        step(timeStamp: number): void {
            if (this._startTime === -1) this._startTime = timeStamp;
            if (this._lastTime === -1) this._lastTime = timeStamp;
            let elapsedMsec: number = timeStamp - this._startTime,
                intervalSec: number = timeStamp - this._lastTime;
            if (intervalSec !== 0) {
                this._fps = 1000 / intervalSec;
            }

            intervalSec /= 1000.0;
            this._lastTime = timeStamp;
            this._handleTimers(intervalSec);
            this.update(elapsedMsec, intervalSec);
            this.render();

            requestAnimationFrame(this.step.bind(this));
        }

        stop(): void {
            if (this._start) {
                cancelAnimationFrame(this._requestId);
                this._requestId = this._lastTime = this._startTime = -1;
                this._start = false;
            }

        }

        isRunning(): boolean {
            return this._start;
        }

        update(elapsedMsec: number, intervalSec: number): void {

        }

        render(): void {

        }

        private _viewportToCanvasCoordinate(evt: MouseEvent): vec2 | null {
            if (this.canvas) {
                let rect: ClientRect = this.canvas.getBoundingClientRect();
                if (evt.type === "mousedown") {
                    console.log(`boundingClientRect:${JSON.stringify(rect)}`);
                    console.log(`clientX:${evt.clientX},clientY:${evt.clientY}`);
                }
                if (evt.target) {
                    let borderLeftWidth: number = 0,
                        borderTopWidth: number = 0,
                        paddingLeft: number = 0,
                        paddingTop: number = 0,
                        decl: CSSStyleDeclaration = window.getComputedStyle(evt.target as HTMLElement),
                        strNumber: string | null = decl.borderLeftWidth;

                    if (strNumber !== null) {
                        borderLeftWidth = parseInt(strNumber, 10);
                    }

                    if (strNumber !== null) {
                        borderTopWidth = parseInt(strNumber, 10);
                    }

                    strNumber = decl.paddingLeft;
                    if (strNumber !== null) {
                        paddingLeft = parseInt(strNumber, 10);
                    }

                    strNumber = decl.paddingTop;
                    if (strNumber !== null) {
                        paddingTop = parseInt(strNumber, 10);
                    }
                    let x: number = evt.clientX - rect.left - borderLeftWidth - paddingLeft,
                        y: number = evt.clientY - rect.top - borderTopWidth - paddingTop;
                    return vec2.create(x, y);
                }
            }
            throw new Error("canvas undefined!");
        }

        private _toCanvasMouseEvent(evt: Event): CanvasMouseEvent {
            let event: MouseEvent = evt as MouseEvent,
                mousePosition: vec2 = this._viewportToCanvasCoordinate(event)!,
                canvasMouseEvent = new CanvasMouseEvent(mousePosition, event.button, event.altKey, event.ctrlKey, event.shiftKey);
            return canvasMouseEvent;
        }

        private _toCanvasKeyBoardEvent(evt: Event): CanvasKeyBoardEvent {
            let event: KeyboardEvent = evt as KeyboardEvent,
                canvasBoardEvent = new CanvasKeyBoardEvent(event.key, event.charCode, event.altKey, event.ctrlKey, event.shiftKey);
            return canvasBoardEvent;
        }

        handleEvent(evt: Event): void {
            switch (evt.type) {
                case "mousedown":
                    this._isMouseDown = true;
                    this.dispatchMouseDown(this._toCanvasMouseEvent(evt));
                    break;
                case "mouseup":
                    this._isMouseDown = false;
                    this.dispatchMouseUp(this._toCanvasMouseEvent(evt));
                    break;
                case "mousemove":
                    if (this._isSupportMouseMove) {
                        this.dispatchMouseMove(this._toCanvasMouseEvent(evt));
                    }
                    if (this._isMouseDown) {
                        this.dispatchMouseDrag(this._toCanvasMouseEvent(evt));
                    }
                    break;
                case "keypress":
                    this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt));
                    break;
                case "keydown":
                    this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt));
                    break;
                case "keyup":
                    this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt));
                    break;
            }
        }

        protected dispatchMouseDown(evt: CanvasMouseEvent): void {
            return;
        }

        protected dispatchMouseUp(evt: CanvasMouseEvent): void {
            return;
        }

        protected dispatchMouseMove(evt: CanvasMouseEvent): void {
            return;
        }

        protected dispatchMouseDrag(evt: CanvasMouseEvent): void {
            return;
        }

        protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
            return;
        }

        protected dispatchKeyUp(evt: CanvasKeyBoardEvent): void {
            return;
        }

        protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void {
            return;
        }

        removeTimer(id: number) {
            let found: boolean = false;
            for (let i = 0; i < this.timers.length; i++) {
                let timer: Timer = this.timers[i];
                timer.enabled = false;
                found = true;
                break;
            }
            return found;
        }

        addTimer(callback: TimerCallback, timeout: number = 1, onlyOnce: boolean = false, data: any = undefined): number {
            for (let i = 0; i < this.timers.length; i++) {
                let timer: Timer = this.timers[i];
                if (timer.enabled === false) {
                    timer.enabled = true;
                    timer.callback = callback;
                    timer.timeout = timeout
                    timer.countdown = timeout;
                    timer.onlyOnce = onlyOnce;
                    return timer.id;
                }
            }
            let timer: Timer;
            timer = new Timer(callback);
            timer.callbackData = data;
            timer.enabled = true;
            timer.countdown = timeout;
            timer.onlyOnce = onlyOnce;
            timer.id = ++this._timeId;
            this.timers.push(timer);
            return timer.id;
        }

        private _handleTimers(intervalMsec: number): void {
            for (let i = 0; i < this.timers.length; i++) {
                let timer: Timer = this.timers[i];
                if (!timer.enabled) {
                    continue;
                }
                timer.countdown -= intervalMsec;
                if (timer.countdown < 0.0) {
                    timer.callback(timer.id, timer.callbackData);
                    if (!timer.onlyOnce) {
                        timer.countdown = timer.timeout;
                    } else {
                        this.removeTimer(timer.id);
                    }
                }
            }
        }

        private _fps: number = 0;
        get fps() {
            return this._fps;
        }


    }
}