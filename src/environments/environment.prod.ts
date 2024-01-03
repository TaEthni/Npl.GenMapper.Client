
export const environment = {
    production: true,
    apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
    apiBase: 'https://npl-api.genmapper.com/api/',
    ipGeoUrl: 'https://ipgeolocation.abstractapi.com/v1/',
    ipGeoApiKey: 'c5bb07e6f04a42c680356656041a722b',
    oikosApi: 'oikos-relay/',
    authConfig: {
        authority: 'https://myidp.io',
        clientId: 'npl_client',
        responseType: 'code',
        scope: 'profile openid IdentityServerApi web_api npl_api roles offline_access',
        logLevel: 'Error'
    },
    arcgisConfig: {
        apiKey: 'AAPK446c002ba36b4e0691150b99f756399bpA79o3hrLFURBDSHiTCGDfBMbLxo0cLl8B4T1gv6NQbk4i1xTgWoqxDQiy-08bfj',
    }
};
