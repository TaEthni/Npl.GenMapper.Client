// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
    // apiBase: 'https://localhost:44320/api/',
    apiBase: 'https://localhost:7001/api/',
    // apiBase: 'https://npl-api-qa.genmapper.com/api/',
    gmMigration: 'https://localhost:7001/api/oikos-relay/',
    oikosApi: 'https://oikos-api-qa.internal.taethni.com/api/',
    authConfig: {
        authority: 'https://qa.myidp.io',
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
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
