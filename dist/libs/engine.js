"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var engine;
(function (engine) {
    var Application = /** @class */ (function () {
        function Application(canvas) {
            this._start = false;
            this._requestId = -1;
            this.timers = [];
            this._timeId = -1;
            this._fps = 0;
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
        Application.prototype.start = function () {
            if (!this._start) {
                this._start = true;
                this._requestId = this._lastTime = this._startTime = -1;
                this._requestId = requestAnimationFrame(this.step.bind(this));
            }
        };
        Application.prototype.step = function (timeStamp) {
            if (this._startTime === -1)
                this._startTime = timeStamp;
            if (this._lastTime === -1)
                this._lastTime = timeStamp;
            var elapsedMsec = timeStamp - this._startTime, intervalSec = timeStamp - this._lastTime;
            if (intervalSec !== 0) {
                this._fps = 1000 / intervalSec;
            }
            intervalSec /= 1000.0;
            this._lastTime = timeStamp;
            this._handleTimers(intervalSec);
            this.update(elapsedMsec, intervalSec);
            this.render();
            requestAnimationFrame(this.step.bind(this));
        };
        Application.prototype.stop = function () {
            if (this._start) {
                cancelAnimationFrame(this._requestId);
                this._requestId = this._lastTime = this._startTime = -1;
                this._start = false;
            }
        };
        Application.prototype.isRunning = function () {
            return this._start;
        };
        Application.prototype.update = function (elapsedMsec, intervalSec) {
        };
        Application.prototype.render = function () {
        };
        Application.prototype._viewportToCanvasCoordinate = function (evt) {
            if (this.canvas) {
                var rect = this.canvas.getBoundingClientRect();
                if (evt.type === "mousedown") {
                    console.log("boundingClientRect:" + JSON.stringify(rect));
                    console.log("clientX:" + evt.clientX + ",clientY:" + evt.clientY);
                }
                if (evt.target) {
                    var borderLeftWidth = 0, borderTopWidth = 0, paddingLeft = 0, paddingTop = 0, decl = window.getComputedStyle(evt.target), strNumber = decl.borderLeftWidth;
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
                    var x = evt.clientX - rect.left - borderLeftWidth - paddingLeft, y = evt.clientY - rect.top - borderTopWidth - paddingTop;
                    return engine.vec2.create(x, y);
                }
            }
            throw new Error("canvas undefined!");
        };
        Application.prototype._toCanvasMouseEvent = function (evt) {
            var event = evt, mousePosition = this._viewportToCanvasCoordinate(event), canvasMouseEvent = new engine.CanvasMouseEvent(mousePosition, event.button, event.altKey, event.ctrlKey, event.shiftKey);
            return canvasMouseEvent;
        };
        Application.prototype._toCanvasKeyBoardEvent = function (evt) {
            var event = evt, canvasBoardEvent = new engine.CanvasKeyBoardEvent(event.key, event.charCode, event.altKey, event.ctrlKey, event.shiftKey);
            return canvasBoardEvent;
        };
        Application.prototype.handleEvent = function (evt) {
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
        };
        Application.prototype.dispatchMouseDown = function (evt) {
            return;
        };
        Application.prototype.dispatchMouseUp = function (evt) {
            return;
        };
        Application.prototype.dispatchMouseMove = function (evt) {
            return;
        };
        Application.prototype.dispatchMouseDrag = function (evt) {
            return;
        };
        Application.prototype.dispatchKeyDown = function (evt) {
            return;
        };
        Application.prototype.dispatchKeyUp = function (evt) {
            return;
        };
        Application.prototype.dispatchKeyPress = function (evt) {
            return;
        };
        Application.prototype.removeTimer = function (id) {
            var found = false;
            for (var i = 0; i < this.timers.length; i++) {
                var timer = this.timers[i];
                timer.enabled = false;
                found = true;
                break;
            }
            return found;
        };
        Application.prototype.addTimer = function (callback, timeout, onlyOnce, data) {
            if (timeout === void 0) { timeout = 1; }
            if (onlyOnce === void 0) { onlyOnce = false; }
            if (data === void 0) { data = undefined; }
            for (var i = 0; i < this.timers.length; i++) {
                var timer_1 = this.timers[i];
                if (timer_1.enabled === false) {
                    timer_1.enabled = true;
                    timer_1.callback = callback;
                    timer_1.timeout = timeout;
                    timer_1.countdown = timeout;
                    timer_1.onlyOnce = onlyOnce;
                    return timer_1.id;
                }
            }
            var timer;
            timer = new engine.Timer(callback);
            timer.callbackData = data;
            timer.enabled = true;
            timer.countdown = timeout;
            timer.onlyOnce = onlyOnce;
            timer.id = ++this._timeId;
            this.timers.push(timer);
            return timer.id;
        };
        Application.prototype._handleTimers = function (intervalMsec) {
            for (var i = 0; i < this.timers.length; i++) {
                var timer = this.timers[i];
                if (!timer.enabled) {
                    continue;
                }
                timer.countdown -= intervalMsec;
                if (timer.countdown < 0.0) {
                    timer.callback(timer.id, timer.callbackData);
                    if (!timer.onlyOnce) {
                        timer.countdown = timer.timeout;
                    }
                    else {
                        this.removeTimer(timer.id);
                    }
                }
            }
        };
        Object.defineProperty(Application.prototype, "fps", {
            get: function () {
                return this._fps;
            },
            enumerable: true,
            configurable: true
        });
        return Application;
    }());
    engine.Application = Application;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Canvas2DApplication = /** @class */ (function (_super) {
        __extends(Canvas2DApplication, _super);
        function Canvas2DApplication(canvas) {
            var _this = _super.call(this, canvas) || this;
            _this.context2D = _this.canvas.getContext('2d');
            return _this;
        }
        return Canvas2DApplication;
    }(engine.Application));
    engine.Canvas2DApplication = Canvas2DApplication;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var RenderState = /** @class */ (function () {
        function RenderState() {
            this.lineWidth = 1;
            this.strokeStyle = "red";
            this.fillStyle = "green";
        }
        RenderState.prototype.clone = function () {
            var state = new RenderState();
            state.lineWidth = this.lineWidth;
            state.fillStyle = this.fillStyle;
            state.strokeStyle = this.strokeStyle;
            return state;
        };
        RenderState.prototype.toString = function () {
            return JSON.stringify(this, null, '');
        };
        return RenderState;
    }());
    engine.RenderState = RenderState;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var RenderStateStack = /** @class */ (function () {
        function RenderStateStack() {
            this._stack = [new engine.RenderState()];
        }
        Object.defineProperty(RenderStateStack.prototype, "_currentState", {
            get: function () {
                return this._stack[this._stack.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        RenderStateStack.prototype.save = function () {
            this._stack.push(this._currentState.clone());
        };
        RenderStateStack.prototype.restore = function () {
            {
                this._stack.pop();
            }
        };
        Object.defineProperty(RenderStateStack.prototype, "lineWidth", {
            get: function () {
                return this._currentState.lineWidth;
            },
            set: function (value) {
                this._currentState.lineWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderStateStack.prototype, "strokeStyle", {
            get: function () {
                return this._currentState.strokeStyle;
            },
            set: function (value) {
                this._currentState.strokeStyle = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderStateStack.prototype, "fillStyle", {
            get: function () {
                return this._currentState.fillStyle;
            },
            set: function (value) {
                this._currentState.fillStyle = value;
            },
            enumerable: true,
            configurable: true
        });
        RenderStateStack.prototype.printCurrentStateInfo = function () {
            console.log(this._currentState.toString());
        };
        return RenderStateStack;
    }());
    engine.RenderStateStack = RenderStateStack;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var TestCanvas2DApplication = /** @class */ (function (_super) {
        __extends(TestCanvas2DApplication, _super);
        function TestCanvas2DApplication(canvas) {
            var _this = _super.call(this, canvas) || this;
            _this._mouseX = 0;
            _this._mouseY = 0;
            _this._lineDashOffset = 0;
            _this._rotationSunSpeed = 50;
            _this._rotationMoonSpeed = 100;
            _this._revolutionSpeed = 60;
            _this._rotationSun = 0;
            _this._rotationMoon = 0;
            _this._revolution = 0;
            return _this;
        }
        TestCanvas2DApplication.prototype.dispatchMouseMove = function (evt) {
            this._mouseX = evt.canvasPosition.x;
            this._mouseY = evt.canvasPosition.y;
        };
        TestCanvas2DApplication.prototype.render = function () {
            if (this.context2D !== null) {
                this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.strokeGrid();
                this.drawCanvasCoordCenter();
                // this.doTranslate();
                // this.doTransform(20, true);
                // this.testFillLocalRectWithTitle();
                // this.doLocalTransform();
                // this.testFillLocalRectWithTitleUV();
                this.rotationAndRevolutionSimulation();
                this.draw4Quadrant();
                this.drawCoordInfo("[" + this._mouseX + "," + this._mouseY + "]", this._mouseX, this._mouseY);
            }
        };
        TestCanvas2DApplication.prototype.drawRect = function (x, y, w, h) {
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
        };
        TestCanvas2DApplication.prototype.testMyRenderStateStack = function () {
            var stack = new engine.RenderStateStack();
            stack.printCurrentStateInfo();
            stack.save();
            stack.lineWidth = 10;
            stack.fillStyle = 'black';
            stack.printCurrentStateInfo();
            stack.restore();
            stack.printCurrentStateInfo();
        };
        TestCanvas2DApplication.prototype.printLineStates = function () {
            if (this.context2D !== null) {
                console.log("\n                    ******lineState******\n                    lineWidth:" + this.context2D.lineWidth + ";\n                    lineCap:" + this.context2D.lineCap + ";\n                    lineJoin:" + this.context2D.lineJoin + ";\n                    miterLimit:" + this.context2D.miterLimit + "\n                ");
            }
        };
        TestCanvas2DApplication.prototype._updateLineDashOffset = function () {
            this._lineDashOffset++;
            if (this._lineDashOffset > 1000) {
                this._lineDashOffset = 0;
            }
        };
        TestCanvas2DApplication.prototype.timeCallback = function (id, data) {
            this._updateLineDashOffset();
            // this.drawRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
        };
        TestCanvas2DApplication.prototype.start = function () {
            var _this = this;
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
            this.addTimer(function (id, data) {
                _this.timeCallback(id, data);
            }, 0.05);
            _super.prototype.start.call(this);
        };
        TestCanvas2DApplication.prototype.fillLinearRect = function (x, y, w, h) {
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
        };
        TestCanvas2DApplication.prototype.fillRadialGradient = function (x, y, w, h) {
            if (this.context2D !== null) {
                this.context2D.save();
                if (this._radialGradient === undefined) {
                    var centX = x + w * 0.5;
                    var centY = y + h * 0.5;
                    var radius = Math.min(w, h);
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
        };
        TestCanvas2DApplication.prototype.fillPattern = function (x, y, w, h, repeat) {
            var _this = this;
            if (repeat === void 0) { repeat = "repeat"; }
            if (this.context2D !== null) {
                this.context2D.save();
                if (this._pattern === undefined) {
                    var img_1 = document.createElement('img');
                    img_1.src = './assets/test.jpg';
                    img_1.onload = function (ev) {
                        if (_this.context2D !== null) {
                            _this._pattern = _this.context2D.createPattern(img_1, repeat);
                            if (_this._pattern) {
                                _this.context2D.fillStyle = _this._pattern;
                            }
                            _this.context2D.beginPath();
                            _this.context2D.rect(x, y, w, h);
                            _this.context2D.fill();
                            _this.context2D.restore();
                        }
                    };
                }
                else {
                    this.context2D.fillStyle = this._pattern;
                    this.context2D.beginPath();
                    this.context2D.rect(x, y, w, h);
                    this.context2D.fill();
                    this.context2D.restore();
                }
            }
        };
        TestCanvas2DApplication.prototype.fillRectangleWithColor = function (rect, color) {
            if (rect.isEmpty()) {
                return;
            }
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.fillStyle = color;
                this.context2D.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                this.context2D.restore();
            }
        };
        TestCanvas2DApplication.prototype.fillCircle = function (x, y, radius, fillStyle) {
            if (fillStyle === void 0) { fillStyle = "red"; }
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.fillStyle = fillStyle;
                this.context2D.beginPath();
                this.context2D.arc(x, y, radius, 0, Math.PI * 2);
                this.context2D.fill();
                this.context2D.restore();
            }
        };
        TestCanvas2DApplication.prototype.strokeLine = function (x0, y0, x1, y1) {
            if (this.context2D !== null) {
                this.context2D.beginPath();
                this.context2D.moveTo(x0, y0);
                this.context2D.lineTo(x1, y1);
                this.context2D.stroke();
            }
        };
        TestCanvas2DApplication.prototype.strokeCoord = function (orginX, orginY, width, height, lineWidth) {
            if (lineWidth === void 0) { lineWidth = 3; }
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.lineWidth = lineWidth;
                this.context2D.strokeStyle = 'red';
                this.strokeLine(orginX, orginY, orginX + width, orginY);
                this.context2D.strokeStyle = 'blue';
                this.strokeLine(orginX, orginY, orginX, orginY + height);
                this.context2D.restore();
            }
        };
        TestCanvas2DApplication.prototype.strokeRect = function (x, y, w, h, color) {
            if (color === void 0) { color = 'black'; }
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
        };
        TestCanvas2DApplication.prototype.strokeCircle = function (x, y, radius, color, lineWidth) {
            if (color === void 0) { color = 'red'; }
            if (lineWidth === void 0) { lineWidth = 1; }
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.strokeStyle = color;
                this.context2D.lineWidth = lineWidth;
                this.context2D.beginPath();
                this.context2D.arc(x, y, radius, 0, Math.PI * 2);
                this.context2D.stroke();
                this.context2D.restore();
            }
        };
        TestCanvas2DApplication.prototype.strokeGrid = function (color, interval) {
            if (color === void 0) { color = "grey"; }
            if (interval === void 0) { interval = 10; }
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.strokeStyle = color;
                this.context2D.lineWidth = 0.5;
                for (var i = interval + 0.5; i < this.canvas.width; i += interval) {
                    this.strokeLine(i, 0, i, this.canvas.height);
                }
                for (var i = interval + 0.5; i < this.canvas.height; i += interval) {
                    this.strokeLine(0, i, this.canvas.width, i);
                }
                this.context2D.restore();
                this.fillCircle(0, 0, 5, 'green');
                this.strokeCoord(0, 0, this.canvas.width, this.canvas.height);
            }
        };
        TestCanvas2DApplication.prototype.printTextStates = function () {
            if (this.context2D !== null) {
                console.log("=======TextState========");
                console.log("font\uFF1A" + this.context2D.font);
                console.log("textAlign\uFF1A" + this.context2D.textAlign);
                console.log("textBaseline:" + this.context2D.textBaseline);
            }
        };
        TestCanvas2DApplication.prototype.fillText = function (text, x, y, color, align, baseline, font) {
            if (color === void 0) { color = "black"; }
            if (align === void 0) { align = "left"; }
            if (baseline === void 0) { baseline = "top"; }
            if (font === void 0) { font = '10px sans-serif'; }
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.textAlign = align;
                this.context2D.textBaseline = baseline;
                this.context2D.font = font;
                this.context2D.fillStyle = color;
                this.context2D.fillText(text, x, y);
                this.context2D.restore();
            }
        };
        TestCanvas2DApplication.prototype.calcTextSize = function (text, char, scale) {
            if (char === void 0) { char = 'W'; }
            if (scale === void 0) { scale = 0.5; }
            if (this.context2D !== null) {
                var size = new engine.Size();
                size.width = this.context2D.measureText(text).width;
                var w = this.context2D.measureText(char).width;
                size.height = w + w * scale;
                return size;
            }
            alert(" context2D 渲染上下文为null ");
            throw new Error(" context2D 渲染上下文为null ");
        };
        TestCanvas2DApplication.prototype.testCanvas2DTextLayout = function () {
            var x = 20;
            var y = 20;
            var width = this.canvas.width - x * 2;
            var height = this.canvas.height - y * 2;
            var drawX = x;
            var drawY = y;
            var radius = 3;
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
        };
        TestCanvas2DApplication.prototype.calcLocalTextRectangle = function (layout, text, parentWidth, parentHeight) {
            var s = this.calcTextSize(text);
            var o = engine.vec2.create();
            var left = 0;
            var top = 0;
            var right = parentWidth - s.width;
            var bottom = parentHeight - s.height;
            var center = right * 0.5;
            var middle = bottom * 0.5;
            switch (layout) {
                case engine.ELayout.LEFT_TOP:
                    o.x = left;
                    o.y = top;
                    break;
                case engine.ELayout.RIGHT_TOP:
                    o.x = right;
                    o.y = top;
                    break;
                case engine.ELayout.RIGHT_BOTTOM:
                    o.x = right;
                    o.y = bottom;
                    break;
                case engine.ELayout.LEFT_BOTTOM:
                    o.x = left;
                    o.y = bottom;
                    break;
                case engine.ELayout.CENTER_MIDDLE:
                    o.x = center;
                    o.y = middle;
                    break;
                case engine.ELayout.CENTER_TOP:
                    o.x = center;
                    o.y = 0;
                    break;
                case engine.ELayout.RIGHT_MIDDLE:
                    o.x = right;
                    o.y = middle;
                    break;
                case engine.ELayout.CENTER_BOTTOM:
                    o.x = center;
                    o.y = bottom;
                    break;
                case engine.ELayout.LEFT_MIDDLE:
                    o.x = left;
                    o.y = middle;
                    break;
            }
            return new engine.Rectangle(o, s);
        };
        TestCanvas2DApplication.prototype.fillRectWithTitle = function (x, y, width, height, title, layout, color, showCoord) {
            if (title === void 0) { title = ''; }
            if (layout === void 0) { layout = engine.ELayout.CENTER_MIDDLE; }
            if (color === void 0) { color = 'grey'; }
            if (showCoord === void 0) { showCoord = true; }
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.fillStyle = color;
                this.context2D.beginPath();
                this.context2D.rect(x, y, width, height);
                this.context2D.fill();
                if (title.length !== 0) {
                    var rect = this.calcLocalTextRectangle(layout, title, width, height);
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
        };
        TestCanvas2DApplication.prototype.makeFontString = function (size, weight, style, variant, family) {
            if (size === void 0) { size = '10px'; }
            if (weight === void 0) { weight = 'normal'; }
            if (style === void 0) { style = 'normal'; }
            if (variant === void 0) { variant = 'normal'; }
            if (family === void 0) { family = 'sans-serif'; }
            var strs = [];
            strs.push(style);
            strs.push(variant);
            strs.push(weight);
            strs.push(size);
            strs.push(family);
            var ret = strs.join(" ");
            console.log(ret);
            return ret;
        };
        TestCanvas2DApplication.prototype.testMyTextLayout = function (font) {
            if (font === void 0) { font = this.makeFontString("10px", "normal", "normal", "normal", 'sans-serif'); }
            var x = 20;
            var y = 20;
            var width = this.canvas.width - x * 2;
            var height = this.canvas.height - y * 2;
            var right = x + width;
            var bottom = y + height;
            var drawX = x;
            var drawY = y;
            var drawWidth = 150;
            var drawHeight = 50;
            if (this.context2D !== null) {
                this.context2D.save();
                this.context2D.font = font;
                this.fillRectWithTitle(x, y, width, height);
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-top', engine.ELayout.LEFT_TOP, 'rgba( 255 , 255 , 0 , 0.2 )');
                drawX = right - drawWidth;
                drawY = y;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-top', engine.ELayout.RIGHT_TOP, 'rgba( 255 , 255 , 0 , 0.2 )');
                drawX = right - drawWidth;
                drawY = bottom - drawHeight;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-bottom', engine.ELayout.RIGHT_BOTTOM, 'rgba( 255 , 255 , 0 , 0.2 )');
                drawX = x;
                drawY = bottom - drawHeight;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-bottom', engine.ELayout.LEFT_BOTTOM, 'rgba( 255 , 255 , 0 , 0.2 )');
                drawX = (right - drawWidth) * 0.5;
                drawY = (bottom - drawHeight) * 0.5;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-middle', engine.ELayout.CENTER_MIDDLE, 'rgba( 255 , 0 , 0 , 0.2 )');
                drawX = (right - drawWidth) * 0.5;
                drawY = y;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-top', engine.ELayout.CENTER_TOP, 'rgba( 0 , 255 , 0 , 0.2 )');
                drawX = (right - drawWidth);
                drawY = (bottom - drawHeight) * 0.5;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-middle', engine.ELayout.RIGHT_MIDDLE, 'rgba( 0 , 255 , 0 , 0.2 )');
                drawX = (right - drawWidth) * 0.5;
                drawY = (bottom - drawHeight);
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-bottom', engine.ELayout.CENTER_BOTTOM, 'rgba( 0 , 255 , 0 , 0.2 )');
                drawX = x;
                drawY = (bottom - drawHeight) * 0.5;
                this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-middle', engine.ELayout.LEFT_MIDDLE, 'rgba( 0 , 255 , 0 , 0.2 )');
            }
        };
        TestCanvas2DApplication.prototype.loadAndDrawImage = function (url) {
            var _this = this;
            var img = document.createElement('img');
            img.src = url;
            img.onload = function (evt) {
                if (_this.context2D !== null) {
                    console.log(url + "\u5C3A\u5BF8\u4E3A" + img.width + "," + img.height);
                    // this.context2D.drawImage(img, 10, 10);
                    // this.context2D.drawImage(img, img.width + 30, 10, 200, img.height);
                    // this.context2D.drawImage(img, 44, 6, 162, 175, 200, img.height + 30, 200, 130);
                    // this . drawImage ( img , Rectangle .create ( 20, 20 , 540 , 300 ) , Rectangle . create ( 44 , 6 , 162 , 175 ) , EImageFillType . STRETCH ) ;
                    _this.drawImage(img, engine.Rectangle.create(20, 20, 1000, 500), engine.Rectangle.create(44, 6, 162, 175), engine.EImageFillType.REPEAT);
                }
            };
        };
        TestCanvas2DApplication.prototype.drawImage = function (img, destRect, srcRect, fillType) {
            if (srcRect === void 0) { srcRect = engine.Rectangle.create(0, 0, img.width, img.height); }
            if (fillType === void 0) { fillType = engine.EImageFillType.STRETCH; }
            if (this.context2D === null) {
                return false;
            }
            if (destRect.isEmpty()) {
                return false;
            }
            if (srcRect.isEmpty()) {
                return false;
            }
            if (fillType === engine.EImageFillType.STRETCH) {
                this.context2D.drawImage(img, srcRect.origin.x, srcRect.origin.y, srcRect.size.width, srcRect.size.height, destRect.origin.x, destRect.origin.y, destRect.size.width, destRect.size.height);
            }
            else {
                this.fillRectangleWithColor(destRect, 'grey');
                var rows = Math.ceil(destRect.size.width / srcRect.size.width);
                var colums = Math.ceil(destRect.size.height / srcRect.size.height);
                var left = 0;
                var top_1 = 0;
                var right = 0;
                var bottom = 0;
                var width = 0;
                var height = 0;
                var destRight = destRect.origin.x + destRect.size.width;
                var destBottom = destRect.origin.y + destRect.size.height;
                if (fillType === engine.EImageFillType.REPEAT_X) {
                    colums = 1;
                }
                else if (fillType === engine.EImageFillType.REPEAT_Y) {
                    rows = 1;
                }
                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < colums; j++) {
                        left = destRect.origin.x + i * srcRect.size.width;
                        top_1 = destRect.origin.y + j * srcRect.size.height;
                        width = srcRect.size.width;
                        height = srcRect.size.height;
                        right = left + width;
                        bottom = top_1 + height;
                        if (right > destRight) {
                            width = srcRect.size.width - (right - destRight);
                        }
                        if (bottom > destBottom) {
                            height = srcRect.size.height - (bottom - destBottom);
                        }
                        this.context2D.drawImage(img, srcRect.origin.x, srcRect.origin.y, width, height, left, top_1, width, height);
                    }
                }
            }
            return true;
        };
        TestCanvas2DApplication.prototype.getColorCanvas = function (amount) {
            if (amount === void 0) { amount = 32; }
            var step = 4;
            var canvas = document.createElement("canvas");
            canvas.width = amount * step;
            canvas.height = amount * step;
            var ctx = canvas.getContext("2d");
            if (ctx === null) {
                throw new Error("离屏Canvas获取渲染上下文失败！");
            }
            for (var i = 0; i < step; i++) {
                for (var j = 0; j < step; j++) {
                    var idx = step * i + j;
                    ctx.save();
                    ctx.fillStyle = TestCanvas2DApplication.Colors[idx];
                    ctx.fillRect(i * amount, j * amount, amount, amount);
                    ctx.restore();
                }
            }
            return canvas;
        };
        TestCanvas2DApplication.prototype.drawColorCanvas = function () {
            var colorCanvas = this.getColorCanvas();
            this.drawImage(colorCanvas, engine.Rectangle.create(100, 100, colorCanvas.width, colorCanvas.height));
        };
        TestCanvas2DApplication.prototype.testChangePartCanvasImageData = function (rRow, rColum, cRow, cColum, size) {
            if (rRow === void 0) { rRow = 2; }
            if (rColum === void 0) { rColum = 0; }
            if (cRow === void 0) { cRow = 1; }
            if (cColum === void 0) { cColum = 0; }
            if (size === void 0) { size = 32; }
            var colorCanvas = this.getColorCanvas(size);
            var ctx = colorCanvas.getContext("2d");
            if (ctx === null) {
                throw new Error("Canvas获取渲染上下文失败！");
            }
            this.drawImage(colorCanvas, engine.Rectangle.create(100, 100, colorCanvas.width, colorCanvas.height));
            var imgData = ctx.createImageData(size, size);
            var data = imgData.data;
            var rbgaCount = data.length / 4;
            for (var i = 0; i < rbgaCount; i++) {
                data[i * 4 + 0] = 255;
                data[i * 4 + 1] = 0;
                data[i * 4 + 2] = 0;
                data[i * 4 + 3] = 255;
            }
            ctx.putImageData(imgData, size * rColum, size * rRow, 0, 0, size, size);
            imgData = ctx.getImageData(size * cColum, size * cRow, size, size);
            data = imgData.data;
            var component = 0;
            for (var i = 0; i < imgData.width; i++) {
                for (var j = 0; j < imgData.height; j++) {
                    for (var k = 0; k < 4; k++) {
                        var idx = (i * imgData.height + j) * 4 + k;
                        component = data[idx];
                        if (idx % 4 !== 3) {
                            data[idx] = 255 - component;
                        }
                    }
                }
            }
            ctx.putImageData(imgData, size * cColum, size * cRow, 0, 0, size, size);
            this.drawImage(colorCanvas, engine.Rectangle.create(300, 100, colorCanvas.width, colorCanvas.height));
        };
        TestCanvas2DApplication.prototype.printShadowStates = function () {
            if (this.context2D !== null) {
                console.log("======ShadowState======");
                console.log(" shadowBlur : " + this.context2D.shadowBlur);
                console.log(" shadowColor : " + this.context2D.shadowColor);
                console.log(" shadowOffsetX : " + this.context2D.shadowOffsetX);
                console.log(" shadowOffsetY : " + this.context2D.shadowOffsetY);
            }
        };
        TestCanvas2DApplication.prototype.setShadowState = function (shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY) {
            if (shadowBlur === void 0) { shadowBlur = 5; }
            if (shadowColor === void 0) { shadowColor = "rgba( 127 , 127 , 127 , 0.5 )"; }
            if (shadowOffsetX === void 0) { shadowOffsetX = 10; }
            if (shadowOffsetY === void 0) { shadowOffsetY = 10; }
            if (this.context2D !== null) {
                this.context2D.shadowBlur = shadowBlur;
                this.context2D.shadowColor = shadowColor;
                this.context2D.shadowOffsetX = shadowOffsetX;
                this.context2D.shadowOffsetY = shadowOffsetY;
            }
        };
        TestCanvas2DApplication.prototype.printAllRenderStates = function () {
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
        };
        /**
         *
         * TransformApplication
         *
         */
        TestCanvas2DApplication.prototype.drawCanvasCoordCenter = function () {
            if (this.context2D === null) {
                return;
            }
            var halfWidth = this.canvas.width * 0.5;
            var halfHeight = this.canvas.height * 0.5;
            this.context2D.save();
            this.context2D.lineWidth = 2;
            this.context2D.strokeStyle = 'rgba( 255 , 0 , 0 , 0.5 ) ';
            this.strokeLine(0, halfHeight, this.canvas.width, halfHeight);
            this.context2D.strokeStyle = 'rgba( 0 , 0 , 255 , 0.5 )';
            this.strokeLine(halfWidth, 0, halfWidth, this.canvas.height);
            this.context2D.restore();
            this.fillCircle(halfWidth, halfHeight, 5, 'rgba( 0 , 0 , 0 , 0.5 ) ');
        };
        TestCanvas2DApplication.prototype.drawCoordInfo = function (info, x, y) {
            this.fillText(info, x, y, 'black', 'center', 'bottom');
        };
        TestCanvas2DApplication.prototype.distance = function (x0, y0, x1, y1) {
            var diffX = x1 - x0;
            var diffY = y1 - y0;
            return Math.sqrt(diffX * diffX + diffY * diffY);
        };
        TestCanvas2DApplication.prototype.fillLocalRectWithTitle = function (width, height, title, referencePt, layout, color, showCoord) {
            if (title === void 0) { title = ''; }
            if (referencePt === void 0) { referencePt = engine.ELayout.LEFT_TOP; }
            if (layout === void 0) { layout = engine.ELayout.CENTER_MIDDLE; }
            if (color === void 0) { color = 'grey'; }
            if (showCoord === void 0) { showCoord = false; }
            if (this.context2D !== null) {
                var x = 0;
                var y = 0;
                switch (referencePt) {
                    case engine.ELayout.LEFT_TOP:
                        x = 0;
                        y = 0;
                        break;
                    case engine.ELayout.LEFT_MIDDLE:
                        x = 0;
                        y = -height * 0.5;
                        break;
                    case engine.ELayout.LEFT_BOTTOM:
                        x = 0;
                        y = -height;
                        break;
                    case engine.ELayout.RIGHT_TOP:
                        x = -width;
                        y = 0;
                        break;
                    case engine.ELayout.RIGHT_MIDDLE:
                        x = -width;
                        y = -height * 0.5;
                        break;
                    case engine.ELayout.RIGHT_BOTTOM:
                        x = -width;
                        y = -height;
                        break;
                    case engine.ELayout.CENTER_TOP:
                        x = -width * 0.5;
                        y = 0;
                        break;
                    case engine.ELayout.CENTER_MIDDLE:
                        x = -width * 0.5;
                        y = -height * 0.5;
                        break;
                    case engine.ELayout.CENTER_BOTTOM:
                        x = -width * 0.5;
                        y = -height;
                        break;
                }
                this.context2D.save();
                this.context2D.fillStyle = color;
                this.context2D.beginPath();
                this.context2D.rect(x, y, width, height);
                this.context2D.fill();
                if (title.length !== 0) {
                    var rect = this.calcLocalTextRectangle(layout, title, width, height);
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
        };
        TestCanvas2DApplication.prototype.rotateTranslate = function (degree, layout, width, height) {
            if (layout === void 0) { layout = engine.ELayout.LEFT_TOP; }
            if (width === void 0) { width = 40; }
            if (height === void 0) { height = 20; }
            if (this.context2D === null) {
                return;
            }
            var radians = engine.Math2D.toRadian(degree);
            this.context2D.save();
            this.context2D.rotate(radians);
            this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
            this.fillLocalRectWithTitle(width, height, "", layout);
            this.context2D.restore();
        };
        TestCanvas2DApplication.prototype.doTranslate = function () {
            if (this.context2D !== null) {
                var width = 100;
                var height = 60;
                var x = this.canvas.width * 0.5;
                var y = this.canvas.height * 0.5;
                this.context2D.save();
                this.context2D.translate(x, y);
                this.fillRectWithTitle(0, 0, width, height, "平移到中心");
                this.context2D.restore();
            }
        };
        TestCanvas2DApplication.prototype.doTransform = function (degree, rotateFirst) {
            if (rotateFirst === void 0) { rotateFirst = true; }
            if (this.context2D !== null) {
                var radians = engine.Math2D.toRadian(degree);
                this.context2D.save();
                if (rotateFirst) {
                    this.context2D.rotate(radians);
                    this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
                }
                else {
                    this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
                    this.context2D.rotate(radians);
                }
                // this.fillRectWithTitle(0, 0, 100, 60, '+' + degree + '度旋转');
                this.fillLocalRectWithTitle(100, 60, '+' + degree + '度旋转', engine.ELayout.CENTER_MIDDLE);
                this.context2D.restore();
                this.context2D.save();
                if (rotateFirst) {
                    this.context2D.rotate(-radians);
                    this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
                }
                else {
                    this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
                    this.context2D.rotate(-radians);
                }
                // this.fillRectWithTitle(0, 0, 100, 60, '-' + degree + '度旋转');
                this.fillLocalRectWithTitle(100, 60, '-' + degree + '度旋转', engine.ELayout.CENTER_MIDDLE);
                this.context2D.restore();
                var radius = this.distance(0, 0, this.canvas.width * 0.5, this.canvas.height * 0.5);
                this.strokeCircle(0, 0, radius, 'black');
            }
        };
        TestCanvas2DApplication.prototype.doLocalTransform = function () {
            if (this.context2D === null) {
                return;
            }
            var width = 100;
            var height = 60;
            var coordWidth = width * 1.2;
            var coordHeight = height * 1.2;
            var radius = 5;
            this.context2D.save();
            // 
            this.fillLocalRectWithTitle(width, height, '1. 初始状态');
            this.strokeCoord(0, 0, coordWidth, coordHeight);
            this.fillCircle(0, 0, radius);
            this.context2D.translate(this.canvas.width * 0.5, 10);
            this.fillLocalRectWithTitle(width, height, '2. 平移');
            this.strokeCoord(0, 0, coordWidth, coordHeight);
            this.fillCircle(0, 0, radius);
            this.context2D.translate(0, this.canvas.height * 0.5 - 10);
            this.fillLocalRectWithTitle(width, height, '3. 平移到画布中心');
            this.strokeCoord(0, 0, coordWidth, coordHeight);
            this.fillCircle(0, 0, radius);
            this.context2D.rotate(engine.Math2D.toRadian(-120));
            this.fillLocalRectWithTitle(width, height, '4. 旋转-120度');
            this.strokeCoord(0, 0, coordWidth, coordHeight);
            this.fillCircle(0, 0, radius);
            this.context2D.rotate(engine.Math2D.toRadian(-130));
            this.fillLocalRectWithTitle(width, height, '5. 旋转-130度');
            this.strokeCoord(0, 0, coordWidth, coordHeight);
            this.fillCircle(0, 0, radius);
            this.context2D.translate(100, 100);
            this.fillLocalRectWithTitle(width, height, '6. 局部平移100个单位');
            this.strokeCoord(0, 0, coordWidth, coordHeight);
            this.fillCircle(0, 0, radius);
            //this . fillLocalRectWithTitle ( width * 1.5 , height * 2.0 , '' ) ;
            this.context2D.scale(1.5, 2.0);
            // this.fillLocalRectWithTitle(width, height, '7. 缩放局部坐标系');
            this.fillLocalRectWithTitle(width, height, '7. 缩放局部坐标系', engine.ELayout.LEFT_MIDDLE);
            // this . fillLocalRectWithTitle ( width * 1.5 , height * 2.0 , '7. 放大物体尺寸' ) ;
            this.strokeCoord(0, 0, coordWidth, coordHeight);
            this.fillCircle(0, 0, radius);
            /*
            this . context2D . rotate ( Math2D . toRadian ( 70 ) ) ;
            this . fillLocalRectWithTitle ( width , height , '4. 继续旋转70度' ) ;
        
            this . context2D . translate ( 0 , 100 ) ;
            this . fillLocalRectWithTitle ( width , height , '5. y轴局部平移100像素' ) ;
        
            this . context2D .scale ( 1.5 , 1.0 ) ;
            this . fillLocalRectWithTitle (width , height , '6. x轴局部放大1.5倍' ) ;
            */
            this.context2D.restore();
        };
        TestCanvas2DApplication.prototype.fillLocalRectWithTitleUV = function (width, height, title, u, v, layout, color, showCoord) {
            if (u === void 0) { u = 0; }
            if (v === void 0) { v = 0; }
            if (layout === void 0) { layout = engine.ELayout.CENTER_MIDDLE; }
            if (color === void 0) { color = "grey"; }
            if (showCoord === void 0) { showCoord = true; }
            if (this.context2D !== null) {
                var x = -width * u;
                var y = -height * v;
                this.context2D.save();
                this.context2D.fillStyle = color;
                this.context2D.beginPath();
                this.context2D.rect(x, y, width, height);
                this.context2D.fill();
                if (title.length !== 0) {
                    var rect = this.calcLocalTextRectangle(layout, title, width, height);
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
        };
        TestCanvas2DApplication.prototype.testFillLocalRectWithTitle = function () {
            if (this.context2D !== null) {
                this.rotateTranslate(0, engine.ELayout.LEFT_TOP);
                this.rotateTranslate(8, engine.ELayout.LEFT_MIDDLE);
                this.rotateTranslate(16, engine.ELayout.LEFT_BOTTOM);
                this.rotateTranslate(24, engine.ELayout.CENTER_TOP);
                this.rotateTranslate(32, engine.ELayout.CENTER_MIDDLE);
                this.rotateTranslate(-8, engine.ELayout.CENTER_BOTTOM);
                this.rotateTranslate(-16, engine.ELayout.RIGHT_TOP);
                this.rotateTranslate(-24, engine.ELayout.RIGHT_MIDDLE);
                this.rotateTranslate(-32, engine.ELayout.RIGHT_BOTTOM);
                var radius = this.distance(0, 0, this.canvas.width * 0.5, this.canvas.height * 0.5);
                this.strokeCircle(0, 0, radius, 'black');
            }
        };
        TestCanvas2DApplication.prototype.translateRotateTranslateDrawRect = function (degree, u, v, radius, width, height) {
            if (u === void 0) { u = 0; }
            if (v === void 0) { v = 0; }
            if (radius === void 0) { radius = 200; }
            if (width === void 0) { width = 40; }
            if (height === void 0) { height = 20; }
            if (this.context2D === null) {
                return;
            }
            var radians = engine.Math2D.toRadian(degree);
            this.context2D.save();
            this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
            this.context2D.rotate(radians);
            this.context2D.translate(radius, 0);
            this.fillLocalRectWithTitleUV(width, height, "", u, v);
            this.context2D.restore();
        };
        TestCanvas2DApplication.prototype.testFillLocalRectWithTitleUV = function () {
            if (this.context2D === null) {
                return;
            }
            var radius = 200;
            var steps = 18;
            for (var i = 0; i <= steps; i++) {
                var n = i / steps;
                this.translateRotateTranslateDrawRect(i * 10, n, 0, radius);
            }
            for (var i = 0; i < steps; i++) {
                var n = i / steps;
                this.translateRotateTranslateDrawRect(-i * 10, 0, n, radius);
            }
            this.context2D.save();
            this.context2D.translate(this.canvas.width * 0.5 - radius * 0.4, this.canvas.height * 0.5 - radius * 0.4);
            this.fillLocalRectWithTitleUV(100, 60, 'u = 0.5 / v = 0.5', 0.5, 0.5);
            this.context2D.restore();
            this.context2D.save();
            this.context2D.translate(this.canvas.width * 0.5 + radius * 0.2, this.canvas.height * 0.5 - radius * 0.2);
            this.fillLocalRectWithTitleUV(100, 60, 'u = 0 / v = 1', 0, 1);
            this.context2D.restore();
            this.context2D.save();
            this.context2D.translate(this.canvas.width * 0.5 + radius * 0.3, this.canvas.height * 0.5 + radius * 0.4);
            this.fillLocalRectWithTitleUV(100, 60, 'u = 0.3 / v = 0.6', 0.3, 0.6);
            this.context2D.restore();
            this.context2D.save();
            this.context2D.translate(this.canvas.width * 0.5 - radius * 0.1, this.canvas.height * 0.5 + radius * 0.25);
            this.fillLocalRectWithTitleUV(100, 60, 'u = 1 / v = 0.2', 1, 0.2);
            this.context2D.restore();
            this.strokeCircle(this.canvas.width * 0.5, this.canvas.height * 0.5, radius, 'rgba( 0 , 255 , 255 , 0.5 )', 10);
        };
        TestCanvas2DApplication.prototype.update = function (elapsedMsec, intervalSec) {
            this._rotationMoon += this._rotationMoonSpeed * intervalSec;
            this._rotationSun += this._rotationSunSpeed * intervalSec;
            this._revolution += this._revolutionSpeed * intervalSec;
        };
        TestCanvas2DApplication.prototype.rotationAndRevolutionSimulation = function (radius) {
            if (radius === void 0) { radius = 250; }
            if (this.context2D === null) {
                return;
            }
            var rotationMoon = engine.Math2D.toRadian(this._rotationMoon);
            var rotationSun = engine.Math2D.toRadian(this._rotationSun);
            var revolution = engine.Math2D.toRadian(this._revolution);
            this.context2D.save();
            this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
            this.context2D.save();
            this.context2D.rotate(rotationSun);
            // this.fillLocalRectWithTitleUV(100, 100, '自转', 0.5, 0.5);
            this.context2D.translate(-50, -50);
            this.fillLocalRectWithTitleUV(100, 100, '自转', 0, 0);
            this.context2D.restore();
            this.context2D.save();
            this.context2D.rotate(revolution);
            this.context2D.translate(radius, 0);
            this.context2D.rotate(rotationMoon);
            this.fillLocalRectWithTitleUV(80, 80, '自转+公转', 0.5, 0.5);
            this.context2D.restore();
            this.context2D.restore();
        };
        TestCanvas2DApplication.prototype.draw4Quadrant = function () {
            if (this.context2D === null) {
                return;
            }
            this.context2D.save();
            this.fillText("第一象限", this.canvas.width, this.canvas.height, 'rgba( 0 , 0 , 255 , 0.5 )', 'right', 'bottom', "20px sans-serif");
            this.fillText("第二象限", 0, this.canvas.height, 'rgba( 0 , 0 , 255 , 0.5 )', 'left', 'bottom', "20px sans-serif");
            this.fillText("第三象限", 0, 0, 'rgba( 0 , 0 , 255 , 0.5 )', 'left', 'top', "20px sans-serif");
            this.fillText("第四象限", this.canvas.width, 0, 'rgba( 0 , 0 , 255 , 0.5 )', 'right', 'top', "20px sans-serif");
            this.context2D.restore();
        };
        TestCanvas2DApplication.Colors = [
            'aqua',
            'black',
            'blue',
            'fuchsia',
            'gray',
            'green',
            'lime',
            'maroon',
            'navy',
            'olive',
            'orange',
            'purple',
            'red',
            'silver',
            'teal',
            'yellow',
            'white' //白色
        ];
        return TestCanvas2DApplication;
    }(engine.Canvas2DApplication));
    engine.TestCanvas2DApplication = TestCanvas2DApplication;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Timer = /** @class */ (function () {
        function Timer(callback) {
            this.id = -1;
            this.enabled = false;
            this.callbackData = undefined;
            this.countdown = 0;
            this.timeout = 0;
            this.onlyOnce = false;
            this.callback = callback;
        }
        return Timer;
    }());
    engine.Timer = Timer;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var WebGLApplication = /** @class */ (function (_super) {
        __extends(WebGLApplication, _super);
        function WebGLApplication(canvas, contextAttributes) {
            var _this = _super.call(this, canvas) || this;
            _this.context3D = _this.canvas.getContext("webgl", contextAttributes);
            if (_this.context3D === null) {
                _this.context3D = _this.canvas.getContext("experimental-webgl", contextAttributes);
                if (_this.context3D === null) {
                    alert(" 无法创建WebGLRenderingContext上下文对象 ");
                    throw new Error(" 无法创建WebGLRenderingContext上下文对象 ");
                }
            }
            return _this;
        }
        return WebGLApplication;
    }(engine.Application));
    engine.WebGLApplication = WebGLApplication;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Doom3Token = /** @class */ (function () {
        function Doom3Token() {
            this._charArr = [];
            this._charArr = [];
            this._type = engine.ETokenType.NONE;
            this._val = 0.0;
        }
        Doom3Token.prototype.reset = function () {
            this._charArr = [];
            this._type = engine.ETokenType.NONE;
            this._val = 0.0;
        };
        Doom3Token.prototype.isString = function (str) {
            var count = this._charArr.length;
            for (var i = 0; i < count; i++) {
                if (this._charArr[i] !== str[i]) {
                    return false;
                }
            }
            return true;
        };
        Object.defineProperty(Doom3Token.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Doom3Token.prototype.getString = function () {
            return this._charArr.join("");
        };
        Doom3Token.prototype.getFloat = function () {
            return this._val;
        };
        Doom3Token.prototype.getInt = function () {
            return parseInt(this._val.toString(), 10);
        };
        Doom3Token.prototype.addChar = function (c) {
            this._charArr.push(c);
        };
        Doom3Token.prototype.setVal = function (num) {
            this._val = num;
            this._type = engine.ETokenType.NUMBER;
        };
        Doom3Token.prototype.setType = function (type) {
        };
        return Doom3Token;
    }());
    engine.Doom3Token = Doom3Token;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Doom3Tokenizer = /** @class */ (function () {
        function Doom3Tokenizer() {
            this._digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            this._whiteSpaces = [" ", "\t", "\n", "\v"];
            this._source = "Doom3Tokenzer";
            this._currIdx = 0;
            this._current = new engine.Doom3Token();
        }
        Doom3Tokenizer.prototype._isDigit = function (c) {
            for (var i = 0; i < this._digits.length; i++) {
                if (this._digits[i] === c) {
                    return true;
                }
            }
            return false;
        };
        Doom3Tokenizer.prototype._isWhiteSpace = function (c) {
            for (var i = 0; i < this._whiteSpaces.length; i++) {
                if (this._whiteSpaces[i] === c) {
                    return true;
                }
            }
            return false;
        };
        Doom3Tokenizer.prototype.setSource = function (source) {
            this._source = source;
            this._currIdx = 0;
        };
        Doom3Tokenizer.prototype.reset = function () {
            this._currIdx = 0;
        };
        Doom3Tokenizer.prototype._getChar = function () {
            if (this._currIdx >= 0 && this._currIdx < this._source.length) {
                return this._source.charAt(this._currIdx++);
            }
            return "";
        };
        Doom3Tokenizer.prototype._peekChar = function () {
            if (this._currIdx >= 0 && this._currIdx < this._source.length) {
                return this._source.charAt(this._currIdx);
            }
            return "";
        };
        Doom3Tokenizer.prototype._ungetChar = function () {
            if (this._currIdx > 0) {
                --this._currIdx;
            }
        };
        Doom3Tokenizer.prototype._getNextToken = function (tok) {
            var token = tok;
            var c = "";
            token.reset();
            do {
                c = this._skipWhiteSpace(); //skip withespace
                if (c === "/" && this._peekChar() === '/') { //skip new line
                    c = this._skipComments0();
                }
                else if (c === '/' && this._peekChar() === "*") { // skip annotation
                    c = this._skipComments1();
                }
                else if (this._isDigit(c) ||
                    c === "-" ||
                    c === "+" ||
                    (c === "." && this._isDigit(this._peekChar()))) { // skip init number
                    this._ungetChar();
                    this._getNumber(token);
                    return true;
                }
                else if (c === "\'" || c === '\"') {
                    this._getsubstring(token, c);
                    return true;
                }
                else if (c.length > 0) {
                    this._ungetChar();
                    this._getString(token);
                    return true;
                }
            } while (c.length > 0);
            return false;
        };
        Doom3Tokenizer.prototype._skipWhiteSpace = function () {
            var c = "";
            do {
                c = this._getChar();
            } while (c.length > 0 && this._isWhiteSpace(c));
            return c;
        };
        Doom3Tokenizer.prototype._skipComments0 = function () {
            var c = "";
            do {
                c = this._getChar();
            } while (c.length > 0 && c !== '\n');
            return c;
        };
        Doom3Tokenizer.prototype._skipComments1 = function () {
            var c = "";
            c = this._getChar();
            do {
                c = this._getChar();
            } while (c.length > 0 && (c !== '*' || this._peekChar() !== '/'));
            c = this._getChar();
            return c;
        };
        Doom3Tokenizer.prototype._getNumber = function (token) {
            var val = 0.0;
            var isFloat = false;
            var scaleValue = 0.1;
            var c = this._getChar();
            var isNegate = (c === '-');
            var consumed = false;
            var ascii0 = "0".charCodeAt(0);
            do {
                token.addChar(c);
                if (c === '.') {
                    isFloat = true;
                }
                else if (c !== '-' && c !== '+') {
                    var ascii = c.charCodeAt(0);
                    var vc = (ascii - ascii0);
                    if (!isFloat)
                        val = 10 * val + vc;
                    else {
                        val = val + scaleValue * vc;
                        scaleValue *= 0.1;
                    }
                }
                if (consumed === true)
                    this._getChar();
                c = this._peekChar();
                consumed = true;
            } while (c.length > 0 && (this._isDigit(c) || (!isFloat && c === '.')));
            if (isNegate) {
                val = -val;
            }
            //设置数字值和NUMBER类型
            token.setVal(val);
        };
        Doom3Tokenizer.prototype._getsubstring = function (token, endChar) {
            var end = false;
            var c = "";
            token.setType(engine.ETokenType.STRING);
            do {
                c = this._getChar();
                if (c === endChar) {
                    end = true;
                }
                else {
                    token.addChar(c);
                }
            } while (c.length > 0 && c !== '\n' && !end);
        };
        Doom3Tokenizer.prototype._getString = function (token) {
            var c = this._getChar();
            token.setType(engine.ETokenType.STRING);
            do {
                token.addChar(c);
                if (!this._isSpecialChar(c)) {
                    c = this._getChar();
                }
            } while (c.length > 0 && !this._isWhiteSpace(c) && !this._isSpecialChar(c));
        };
        Doom3Tokenizer.prototype._isSpecialChar = function (c) {
            switch (c) {
                case '(':
                    return true;
                case ')':
                    return true;
                case '[':
                    return true;
                case ']':
                    return true;
                case '{':
                    return true;
                case '}':
                    return true;
                case ',':
                    return true;
                case '.':
                    return true;
                case '`':
                    return true;
            }
            return false;
        };
        Doom3Tokenizer.prototype.createIDoom3Token = function () {
            return new engine.Doom3Token();
        };
        Doom3Tokenizer.prototype.moveNext = function () {
            return this._getNextToken(this._current);
        };
        Object.defineProperty(Doom3Tokenizer.prototype, "current", {
            get: function () {
                return this._current;
            },
            enumerable: true,
            configurable: true
        });
        return Doom3Tokenizer;
    }());
    engine.Doom3Tokenizer = Doom3Tokenizer;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Doom3Factory = /** @class */ (function () {
        function Doom3Factory() {
        }
        Doom3Factory.createDoom3Tokenizer = function () {
            var ret = new engine.Doom3Tokenizer();
            return ret;
        };
        return Doom3Factory;
    }());
    engine.Doom3Factory = Doom3Factory;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var EImageFillType;
    (function (EImageFillType) {
        EImageFillType[EImageFillType["STRETCH"] = 0] = "STRETCH";
        EImageFillType[EImageFillType["REPEAT"] = 1] = "REPEAT";
        EImageFillType[EImageFillType["REPEAT_X"] = 2] = "REPEAT_X";
        EImageFillType[EImageFillType["REPEAT_Y"] = 3] = "REPEAT_Y";
    })(EImageFillType = engine.EImageFillType || (engine.EImageFillType = {}));
})(engine || (engine = {}));
var engine;
(function (engine) {
    var EInputEventType;
    (function (EInputEventType) {
        EInputEventType[EInputEventType["MOUSEEVENT"] = 0] = "MOUSEEVENT";
        EInputEventType[EInputEventType["MOUSEDOWN"] = 1] = "MOUSEDOWN";
        EInputEventType[EInputEventType["MOUSEUP"] = 2] = "MOUSEUP";
        EInputEventType[EInputEventType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
        EInputEventType[EInputEventType["MOUSEDRAG"] = 4] = "MOUSEDRAG";
        EInputEventType[EInputEventType["KEYBOARDEVENT"] = 5] = "KEYBOARDEVENT";
        EInputEventType[EInputEventType["KEYUP"] = 6] = "KEYUP";
        EInputEventType[EInputEventType["KEYDOWN"] = 7] = "KEYDOWN";
        EInputEventType[EInputEventType["KEYPRESS"] = 8] = "KEYPRESS";
    })(EInputEventType = engine.EInputEventType || (engine.EInputEventType = {}));
})(engine || (engine = {}));
var engine;
(function (engine) {
    var ELayout;
    (function (ELayout) {
        ELayout[ELayout["LEFT_TOP"] = 0] = "LEFT_TOP";
        ELayout[ELayout["RIGHT_TOP"] = 1] = "RIGHT_TOP";
        ELayout[ELayout["RIGHT_BOTTOM"] = 2] = "RIGHT_BOTTOM";
        ELayout[ELayout["LEFT_BOTTOM"] = 3] = "LEFT_BOTTOM";
        ELayout[ELayout["CENTER_MIDDLE"] = 4] = "CENTER_MIDDLE";
        ELayout[ELayout["CENTER_TOP"] = 5] = "CENTER_TOP";
        ELayout[ELayout["RIGHT_MIDDLE"] = 6] = "RIGHT_MIDDLE";
        ELayout[ELayout["CENTER_BOTTOM"] = 7] = "CENTER_BOTTOM";
        ELayout[ELayout["LEFT_MIDDLE"] = 8] = "LEFT_MIDDLE";
    })(ELayout = engine.ELayout || (engine.ELayout = {}));
})(engine || (engine = {}));
var engine;
(function (engine) {
    var ETextLayout;
    (function (ETextLayout) {
        ETextLayout[ETextLayout["LEFT_TOP"] = 0] = "LEFT_TOP";
        ETextLayout[ETextLayout["RIGHT_TOP"] = 1] = "RIGHT_TOP";
        ETextLayout[ETextLayout["RIGHT_BOTTOM"] = 2] = "RIGHT_BOTTOM";
        ETextLayout[ETextLayout["LEFT_BOTTOM"] = 3] = "LEFT_BOTTOM";
        ETextLayout[ETextLayout["CENTER_MIDDLE"] = 4] = "CENTER_MIDDLE";
        ETextLayout[ETextLayout["CENTER_TOP"] = 5] = "CENTER_TOP";
        ETextLayout[ETextLayout["CENTER_BOTTOM"] = 6] = "CENTER_BOTTOM";
        ETextLayout[ETextLayout["LETT_MIDDLE"] = 7] = "LETT_MIDDLE";
    })(ETextLayout = engine.ETextLayout || (engine.ETextLayout = {}));
})(engine || (engine = {}));
var engine;
(function (engine) {
    var ETokenType;
    (function (ETokenType) {
        ETokenType[ETokenType["NONE"] = 0] = "NONE";
        ETokenType[ETokenType["STRING"] = 1] = "STRING";
        ETokenType[ETokenType["NUMBER"] = 2] = "NUMBER";
    })(ETokenType = engine.ETokenType || (engine.ETokenType = {}));
})(engine || (engine = {}));
var engine;
(function (engine) {
    var CanvasInputEvent = /** @class */ (function () {
        function CanvasInputEvent(altKey, ctrlKey, shiftKey, type) {
            if (altKey === void 0) { altKey = false; }
            if (ctrlKey === void 0) { ctrlKey = false; }
            if (shiftKey === void 0) { shiftKey = false; }
            if (type === void 0) { type = engine.EInputEventType.MOUSEEVENT; }
            this.altKey = altKey;
            this.ctrlKey = ctrlKey;
            this.shiftKey = shiftKey;
            this.type = type;
        }
        return CanvasInputEvent;
    }());
    engine.CanvasInputEvent = CanvasInputEvent;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var CanvasKeyBoardEvent = /** @class */ (function (_super) {
        __extends(CanvasKeyBoardEvent, _super);
        function CanvasKeyBoardEvent(key, keyCode, repeat, altKey, ctrlKey, shiftKey) {
            if (repeat === void 0) { repeat = false; }
            if (altKey === void 0) { altKey = false; }
            if (ctrlKey === void 0) { ctrlKey = false; }
            if (shiftKey === void 0) { shiftKey = false; }
            var _this = _super.call(this, altKey, ctrlKey, shiftKey, engine.EInputEventType.KEYBOARDEVENT) || this;
            _this.key = key;
            _this.keyCode = keyCode;
            _this.repeat = repeat;
            return _this;
        }
        return CanvasKeyBoardEvent;
    }(engine.CanvasInputEvent));
    engine.CanvasKeyBoardEvent = CanvasKeyBoardEvent;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var CanvasMouseEvent = /** @class */ (function (_super) {
        __extends(CanvasMouseEvent, _super);
        function CanvasMouseEvent(canvasPos, button, altKey, ctrlKey, shiftKey) {
            if (altKey === void 0) { altKey = false; }
            if (ctrlKey === void 0) { ctrlKey = false; }
            if (shiftKey === void 0) { shiftKey = false; }
            var _this = _super.call(this, altKey, ctrlKey, shiftKey) || this;
            _this.canvasPosition = canvasPos;
            _this.button = button;
            _this.localPosition = engine.vec2.create();
            return _this;
        }
        return CanvasMouseEvent;
    }(engine.CanvasInputEvent));
    engine.CanvasMouseEvent = CanvasMouseEvent;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var EPSILON = 0.00001;
    var PiBy180 = 0.0175; //Math.pI / 180.0
    var Math2D = /** @class */ (function () {
        function Math2D() {
        }
        Math2D.isEquals = function (left, right, espilon) {
            if (espilon === void 0) { espilon = EPSILON; }
            if (Math.abs(left - right) >= EPSILON) {
                return false;
            }
            return true;
        };
        Math2D.toRadian = function (degree) {
            return degree * PiBy180;
        };
        Math2D.toDegree = function (radian) {
            return radian / PiBy180;
        };
        return Math2D;
    }());
    engine.Math2D = Math2D;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Rectangle = /** @class */ (function () {
        function Rectangle(orign, size) {
            if (orign === void 0) { orign = new engine.vec2(); }
            if (size === void 0) { size = new engine.Size(1, 1); }
            this.origin = orign;
            this.size = size;
        }
        Rectangle.prototype.isEmpty = function () {
            var area = this.size.width * this.size.height;
            if (engine.Math2D.isEquals(area, 0) === true) {
                return true;
            }
            else {
                return false;
            }
        };
        Rectangle.create = function (x, y, w, h) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (w === void 0) { w = 1; }
            if (h === void 0) { h = 1; }
            var origin = new engine.vec2(x, y);
            var size = new engine.Size(w, h);
            return new Rectangle(origin, size);
        };
        return Rectangle;
    }());
    engine.Rectangle = Rectangle;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Size = /** @class */ (function () {
        function Size(w, h) {
            if (w === void 0) { w = 1; }
            if (h === void 0) { h = 1; }
            this.values = new Float32Array([w, h]);
        }
        Object.defineProperty(Size.prototype, "width", {
            get: function () { return this.values[0]; },
            set: function (value) { this.values[0] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Size.prototype, "height", {
            get: function () { return this.values[1]; },
            set: function (value) { this.values[1] = value; },
            enumerable: true,
            configurable: true
        });
        Size.create = function (w, h) {
            if (w === void 0) { w = 1; }
            if (h === void 0) { h = 1; }
            return new Size(w, h);
        };
        return Size;
    }());
    engine.Size = Size;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var vec2 = /** @class */ (function () {
        function vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.values = new Float32Array([x, y]);
        }
        vec2.prototype.toString = function () {
            return " [ " + this.values[0] + " , " + this.values[1] + " ] ";
        };
        Object.defineProperty(vec2.prototype, "x", {
            get: function () { return this.values[0]; },
            set: function (x) { this.values[0] = x; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(vec2.prototype, "y", {
            get: function () { return this.values[1]; },
            set: function (y) { this.values[1] = y; },
            enumerable: true,
            configurable: true
        });
        vec2.prototype.reset = function (x, y) {
            if (x === void 0) { x = 0; }
            this.values[0] = x;
            this.values[1] = y;
            return this;
        };
        vec2.create = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return new vec2(x, y);
        };
        return vec2;
    }());
    engine.vec2 = vec2;
})(engine || (engine = {}));
System.register("utils/HttpRequset", [], function (exports_1, context_1) {
    "use strict";
    var HttpRequset;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            HttpRequset = /** @class */ (function () {
                function HttpRequset() {
                }
                HttpRequset.doGet = function (url) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("get", url, false, null, null);
                    xhr.send();
                    if (xhr.status === 200) {
                        return {
                            success: true,
                            responseType: "text",
                            response: xhr.response
                        };
                    }
                    else {
                        return {
                            success: false,
                            responseType: "text",
                            response: xhr.response
                        };
                    }
                };
                return HttpRequset;
            }());
            exports_1("HttpRequset", HttpRequset);
        }
    };
});
//# sourceMappingURL=engine.js.map