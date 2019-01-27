export namespace Utils {
    export function timeout(callback: () => void, time: number = 0): any {
        const timeoutId = setTimeout(() => {
            callback();
            clearTimeout(timeoutId);
        }, time);
        return timeoutId;
    }

    export function disableDocumentScroll(): void {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
    }

    export function enableDocumentScroll(): void {
        document.body.style.overflow = '';
        document.body.style.position = '';
    }
}
