type MapValue = {
  throttled: boolean;
  functions: Function[];
  listener?: Function;
};

export default class ScrollHelper {
  private static readonly THROTTLE_MS = 250;
  public static map = new Map<HTMLElement, MapValue>();

  private static initEventListener(
    container: HTMLElement,
    options?: boolean | AddEventListenerOptions
  ): void {
    const eventListener = () => {
      const value = ScrollHelper.map.get(container) as MapValue;

      if (value.throttled === true) return;
      value.throttled = true;

      setTimeout(() => {
        value.functions.forEach(func => {
          func();
        });

        value.throttled = false;
      }, ScrollHelper.THROTTLE_MS);
    };

    (ScrollHelper.map.get(container) as MapValue).listener = eventListener;
    container.addEventListener('scroll', eventListener, options);
  }

  private static removeEventListener(container: HTMLElement): void {
    container.removeEventListener(
      'scroll',
      (ScrollHelper.map.get(container) as MapValue).listener as EventListener
    );
  }

  public static addListener(
    container: HTMLElement,
    listener: Function,
    options?: boolean | AddEventListenerOptions
  ): void {
    if (ScrollHelper.map.has(container)) {
      const arr = ScrollHelper.map.get(container)?.functions;

      if (!arr?.includes(listener)) {
        arr?.push(listener);
      }
    } else {
      ScrollHelper.map.set(container, {
        throttled: false,
        functions: [listener]
      });
      ScrollHelper.initEventListener(container, options);
    }
  }

  public static removeListener(
    container: HTMLElement,
    listener: Function
  ): void {
    const value = ScrollHelper.map.get(container);

    if (!value) return;

    if (value.functions.includes(listener)) {
      value.functions = value.functions.filter(f => f !== listener);
    }

    if (value.functions.length === 0) {
      ScrollHelper.removeEventListener(container);
      ScrollHelper.map.delete(container);
    }
  }
}
