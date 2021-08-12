// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiKey: '',
    // apiBase: 'https://localhost:44320/api/',
    // apiBase: 'https://localhost:7001/api/',
    apiBase: 'https://npl-api-qa.genmapper.com/api/',
    ipGeoUrl: 'https://ipgeolocation.abstractapi.com/v1/',
    ipGeoApiKey: 'c5bb07e6f04a42c680356656041a722b',
    authConfig: {
        authority: 'https://idp-qa.taethni.com',
        // authority: 'http://localhost:5000',
        clientId: 'angular_spa_local',
        responseType: 'code',
        scope: 'profile openid IdentityServerApi npl_api web_api roles offline_access',
        logLevel: 'Debug',
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
