module engine{
    interface EventListenerObject {
        handlerEvent(evt: Event): void;
    }
}