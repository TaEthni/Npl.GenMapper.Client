import { AuthConfig } from 'angular-oauth2-oidc';

import { environment } from '../../../environments/environment';

const config = {
    authority: environment.authConfig.authority,
    clientId: environment.authConfig.clientId,
    loginEndpoint: '/connect/authorize',
    userEndpoint: '/connect/userinfo',
    tokenEndpoint: '/connect/token',
    responseType: 'code',
    scope: 'profile openid IdentityServerApi web_api roles npl_api',
}

export const authConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: config.authority,

    loginUrl: config.authority + config.loginEndpoint,
    userinfoEndpoint: config.authority + config.userEndpoint,
    tokenEndpoint: config.authority + config.tokenEndpoint,

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/index.html',

    // The SPA's id. The SPA is registered with this id at the auth-server
    clientId: config.clientId,
    responseType: config.responseType,
    postLogoutRedirectUri: window.location.origin + '/index.html',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: config.scope,
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
}
