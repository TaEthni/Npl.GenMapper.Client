
export const environment = {
    production: true,
    apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
    apiBase: 'https://npl-api.genmapper.com/api/',
    authConfig: {
        authority: 'https://idp.taethni.com',
        clientId: 'npl_client',
        responseType: 'code',
        scope: 'profile openid IdentityServerApi npl_api roles offline_access',
        logLevel: 'Error'
    }
};
