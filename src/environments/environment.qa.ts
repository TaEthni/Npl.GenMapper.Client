

export const environment = {
    production: true,
    apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
    apiBase: 'https://npl-api-qa.genmapper.com/api/',
    ipGeoUrl: 'https://ipgeolocation.abstractapi.com/v1/',
    ipGeoApiKey: '',
    authConfig: {
        authority: 'https://idp-qa.taethni.com',
        clientId: 'npl_client',
        responseType: 'code',
        scope: 'profile openid IdentityServerApi npl_api roles offline_access',
        logLevel: 'Error'
    }
};
