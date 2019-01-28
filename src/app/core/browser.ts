
const IE8 = '8-or-lt-8-not-compatible';
const IE9 = 'IE9';
const IE10 = 'IE10';
const IERegexp = /(MSIE|IEMobile|Trident)/ig;
const userAgent = window.navigator.userAgent;

const isWindowAtob = ('atob' in window);
const isDocumentAll = ('all' in document);

// Fallback support tests if feature detection does not work;
const isEdge = !!window['MSInputMethodContext'] && !document['documentMode'];
const isIE11 = !!window['MSInputMethodContext'] && !!document['documentMode'];
const isIE10 = isDocumentAll && isWindowAtob;
const isIE9 = !isIE10 && isDocumentAll && window.addEventListener && !isWindowAtob;


let VERSION;
const isChrome = (function (): boolean {
    const value = /Chrome\//i.test(window.navigator.userAgent);
    if (value) { VERSION = window.navigator.userAgent.match(/Chrome\/([\d*]+)/i)[1]; }
    return value;
})();

const isFirefox = (function (): boolean {
    const value = 'mozApps' in window.navigator
        || 'mozContacts' in window.navigator
        || 'mozTCPSocket' in window.navigator
        || 'mozPay' in window.navigator
        || /Firefox\/\d+/.test(window.navigator.userAgent);
    if (value) { VERSION = window.navigator.userAgent.match(/Firefox\/([\d*]+)/i)[1]; }
    return value;
})();

const isSafari = (function (): boolean {
    const value = !isChrome
        && /Safari/i.test(window.navigator.userAgent)
        && /Version/i.test(window.navigator.userAgent);
    if (value) { VERSION = window.navigator.userAgent.match(/Version\/([\d*]+)/i)[1]; }
    return value;
})();

const isIE = (function (): boolean {
    const value = IERegexp.test(window.navigator.userAgent);
    if (value) { VERSION = isEdge ? '12' : isIE11 ? '11' : isIE10 ? '10' : isIE9 ? '9' : IE8; }
    return value;
})();

const NAME = isChrome ? 'chrome' : isFirefox ? 'firefox' : isSafari ? 'safari' : isIE ? 'ie' : 'unknown';

export const Browser = {
    isChrome: isChrome,
    isFirefox: isFirefox,
    isSafari: isSafari,
    isIE: isIE,
    version: VERSION,
    name: NAME,

    setClassList(element: Element): void {
        if (this.name) { element.classList.add(`browser-${this.name}`); }
        if (this.version) { element.classList.add(`browser-${this.name}-${this.version}`); }
    }
};

