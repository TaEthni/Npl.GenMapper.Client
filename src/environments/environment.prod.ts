
export const environment = {
    production: true,
    apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
    apiBase: 'https://npl-api.genmapper.com/api/',
    ipGeoUrl: 'https://ipgeolocation.abstractapi.com/v1/',
    ipGeoApiKey: 'c5bb07e6f04a42c680356656041a722b',
    oikosApi: 'https://api.thegapp.app/api/',
    authConfig: {
        authority: 'https://myidp.io',
        clientId: 'npl_client',
        responseType: 'code',
        scope: 'profile openid IdentityServerApi web_api npl_api roles offline_access',
        logLevel: 'Error'
    }
};
