export namespace Utils {
    export function timeout(callback: () => void, time: number = 0): any {
        const timeoutId = setTimeout(() => {
            callback();
            clearTimeout(timeoutId);
        }, time);
        return timeoutId;
    }
}
