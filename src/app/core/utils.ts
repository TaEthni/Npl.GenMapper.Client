export namespace Utils {
    export function timeout(callback: () => void, time: number = 0): any {
        const timeoutId = setTimeout(() => {
            callback();
            clearTimeout(timeoutId);
        }, time);
        return timeoutId;
    }

    export function disableDocumentScroll(): void {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    export function enableDocumentScroll(): void {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }
}
