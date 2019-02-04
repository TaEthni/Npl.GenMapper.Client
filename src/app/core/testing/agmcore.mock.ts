
// @agm/core MapsAPILoader has a bug that doesn't work in jest environment.
// This is a mocked module used by package.json.jest.moduleNameMapper
export class MapsAPILoader {
    public load(): Promise<void> { return Promise.resolve(); }
}
