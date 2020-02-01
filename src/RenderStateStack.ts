module engine {
    export class RenderStateStack {
        private _stack: RenderState[] = [new RenderState()];
        private get _currentState(): RenderState {
            return this._stack[this._stack.length - 1];
        }

        save(): void {
            this._stack.push(this._currentState.clone());
        }

        restore(): void {
            {
                this._stack.pop();
            }
        }

        get lineWidth(): number {
            return this._currentState.lineWidth;
        }

        set lineWidth(value: number) {
            this._currentState.lineWidth = value;
        }

        get strokeStyle(): string {
            return this._currentState.strokeStyle;
        }

        set strokeStyle(value: string) {
            this._currentState.strokeStyle = value;
        }

        get fillStyle(): string {
            return this._currentState.fillStyle;
        }

        set fillStyle(value: string) {
            this._currentState.fillStyle = value;
        }

        printCurrentStateInfo(): void {
            console.log(this._currentState.toString());
        }

    }
}