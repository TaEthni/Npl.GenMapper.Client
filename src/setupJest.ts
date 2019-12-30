import 'jest-preset-angular';

Object.defineProperty(document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true,
        };
    },
});

Object.defineProperty(window, 'matchMedia', {
    value: jest.fn(() => ({ matches: true }))
});
