class ViewportHelper {
    public static isInViewport(ref: React.RefObject<HTMLDivElement>): boolean {
        const bounding = ref.current?.getBoundingClientRect();

        if(bounding === undefined) return false;

        return bounding.top >= 0 && bounding.bottom <= window.innerHeight;
    }

    public static isVisibleInParent(ref: React.RefObject<HTMLDivElement>): boolean {
        const parent = ref.current?.offsetParent;

        if(!parent || !ref.current) return false;

        const ot = ref.current.offsetTop,
            oh = ref.current.offsetHeight,
            st = parent.scrollTop,
            ph = parent.clientHeight;
            
        return (ot - st) < ph && (ot + oh) > st;
    }
}

export default ViewportHelper;