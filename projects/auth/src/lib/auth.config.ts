import { InjectionToken } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';

export const AUTH_CONFIG = new InjectionToken<IAuthConfig>('AuthConfig');

export interface IAuthConfig {
    authority: string;
    clientId: string;
    responseType: string;
    scope: string;
    logLevel?: string;
    useSessionStore?: boolean;
}


export function GetAuthConfig(config: IAuthConfig): AuthConfig {
    return {
        issuer: config.authority,

        // URL of the SPA to redirect the user to after login
        redirectUri: window.location.origin,

        // The SPA's id. The SPA is registerd with this id at the auth-server
        // clientId: 'server.code',
        clientId: config.clientId,

        // Just needed if your auth server demands a secret. In general, this
        // is a sign that the auth server is not configured with SPAs in mind
        // and it might not enforce further best practices vital for security
        // such applications.
        // dummyClientSecret: 'secret',

        responseType: config.responseType,

        // set the scope for the permissions the client should request
        // The first four are defined by OIDC.
        // Important: Request offline_access to get a refresh token
        // The api scope is a usecase specific one
        scope: config.scope,

        showDebugInformation: true,


        // Url of the Identity Provider
        // issuer: config.authority,

        // loginUrl: config.authority + config.loginEndpoint,
        // userinfoEndpoint: config.authority + config.userEndpoint,
        // tokenEndpoint: config.authority + config.tokenEndpoint,

        // // URL of the SPA to redirect the user to after login
        // redirectUri: window.location.origin + '/index.html',

        // useSilentRefresh: true,

        // // The SPA's id. The SPA is registered with this id at the auth-server
        // clientId: config.clientId,
        // responseType: config.responseType,
        // postLogoutRedirectUri: window.location.origin + '/index.html',
        // // set the scope for the permissions the client should request
        // // The first three are defined by OIDC. The 4th is a usecase-specific one
        // scope: config.scope,
        // strictDiscoveryDocumentValidation: false,
        // showDebugInformation: true,
        // // Activate Session Checks:
        // sessionChecksEnabled: true,
    };
}
