// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const devUrl = 'https://dev-api.noplaceleft.tools/api/';
const localUrl = 'http://localhost:9000/api/';
// const localUrl = devUrl;

export const environment = {
    production: false,
    // apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
    apiKey: 'AIzaSyD88NJ5XZcN4I7tqvFTgUTHkfDsE_i9pDE',
    apiBase: localUrl
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
