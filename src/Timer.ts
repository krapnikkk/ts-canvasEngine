module engine {
    export class Timer {
        id: number = -1;
        enabled: boolean = false;
        callback: TimerCallback;
        callbackData: any = undefined;
        countdown: number = 0;
        timeout: number = 0;
        onlyOnce: boolean = false;

        constructor(callback: TimerCallback) {
            this.callback = callback;
        }
    }

    export type TimerCallback = (id: number, data: any) => void;
}