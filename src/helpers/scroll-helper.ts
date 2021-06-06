type MapValue = {throttled: boolean, functions: Function[], listener?: Function};

class _ScrollHelper {
    private static readonly THROTTLE_MS = 250; 
    public map = new Map<HTMLElement, MapValue>();

    private initEventListener(container: HTMLElement, options?: boolean | AddEventListenerOptions): void {
        const eventListener = () => {
            const value = this.map.get(container) as MapValue;

            if (value.throttled === true) return;
            value.throttled = true;

            setTimeout(() => {
                value.functions.forEach(func => {
                    func();
                });

                value.throttled = false;
            }, _ScrollHelper.THROTTLE_MS);
        };

        (this.map.get(container) as MapValue).listener = eventListener;
        container.addEventListener('scroll', eventListener, options);
    }

    private removeEventListener(container: HTMLElement): void {
        container.removeEventListener('scroll', (this.map.get(container) as MapValue).listener as EventListener);
    }

    public addListener(container: HTMLElement, listener: Function, options?: boolean | AddEventListenerOptions): void {
        if(this.map.has(container)){
            const arr = this.map.get(container)?.functions;

            if(!arr?.includes(listener)) {
                arr?.push(listener);
            }
        } else {
            this.map.set(container, {
                throttled: false,
                functions: [listener]
            });
            this.initEventListener(container, options);
        }
    }

    public removeListener(container: HTMLElement, listener: Function): void {
        const value = this.map.get(container);

        if(!value) return;

        if(value.functions.includes(listener)) {
            value.functions = value.functions.filter(f => f !== listener);
        }

        if(value.functions.length === 0) {
            this.removeEventListener(container);
            this.map.delete(container);
        }
    }
}

const ScrollHelper = new _ScrollHelper()

export default ScrollHelper;