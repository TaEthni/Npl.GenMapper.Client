const userAgent = window.navigator.userAgent;
const DEVICE_EXPRESSIONS = {
    // tslint:disable-next-line:max-line-length
    HandHeld: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i,
    Tablet: /(tablet|Tablet|iPad|Playbook|Silk)|(Android(?!.*Mobile))/i
};


const isHandHeld = DEVICE_EXPRESSIONS.HandHeld.test(userAgent);
const isTablet = DEVICE_EXPRESSIONS.HandHeld.test(userAgent);
const isMobile = isHandHeld && !isTablet;
const isDesktop = !isHandHeld && !isTablet;
const NAME = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';


export const Device = {
    isHandHeld,
    isTablet,
    isMobile,
    isDesktop,
    name: NAME,

    setClassList(element: Element): void {
        if (this.name) { element.classList.add(`device-${this.name}`); }
        if (isHandHeld) {
            element.classList.add(`device-handheld`);
        }
    }
};

