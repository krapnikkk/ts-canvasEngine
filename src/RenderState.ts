module engine {
    export class RenderState {
        lineWidth: number = 1;
        strokeStyle: string = "red";
        fillStyle: string = "green";
        clone(): RenderState {
            let state: RenderState = new RenderState();
            state.lineWidth = this.lineWidth;
            state.fillStyle = this.fillStyle;
            state.strokeStyle = this.strokeStyle;
            return state;
        }

        toString(): string {
            return JSON.stringify(this, null, '');
        }

    }
}