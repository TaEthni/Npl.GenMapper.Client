

export const environment = {
    production: true,
    apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
    apiBase: 'https://npl-api-qa.genmapper.com/api/',
    ipGeoUrl: 'https://ipgeolocation.abstractapi.com/v1/',
    ipGeoApiKey: 'c5bb07e6f04a42c680356656041a722b',
    oikosApi: 'oikos-relay/',
    authConfig: {
        authority: 'https://qa.myidp.io',
        clientId: 'npl_client',
        responseType: 'code',
        scope: 'profile openid IdentityServerApi web_api npl_api roles offline_access',
        logLevel: 'Error'
    },
    arcgisConfig: {
        apiKey: 'AAPKdfa9c8eae1434c1d9e7a1183db7ca355W3MiPHhxhAR_C8iyhuT1jFlBhKemJpbrR2jXQZUxAjR-Om2bnvRprcKrEGTfpyK1',
    }
};
