

export const environment = {
    production: true,
    apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
    apiBase: 'https://npl-api-qa.genmapper.com/api/',
    ipGeoUrl: 'https://ipgeolocation.abstractapi.com/v1/',
    ipGeoApiKey: 'c5bb07e6f04a42c680356656041a722b',
    oikosApi: 'https://oikos-api-qa.taethni.com/api/',
    authConfig: {
        authority: 'https://qa.myidp.io',
        clientId: 'npl_client',
        responseType: 'code',
        scope: 'profile openid IdentityServerApi npl_api roles offline_access',
        logLevel: 'Error'
    }
};
