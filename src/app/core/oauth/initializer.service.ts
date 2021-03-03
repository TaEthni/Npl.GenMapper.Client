import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './oauth.config';

@Injectable()
export class OAuthInitializerService {
    constructor(
        private authService: OAuthService
    ) { }

    public load(): Promise<void> {
        this.authService.configure(authConfig);

        let discoverDoc = authConfig.issuer;
        if (!discoverDoc.endsWith('/')) {
            discoverDoc += '/';
        }

        discoverDoc += '.well-known/openid-configuration';

        return this.authService.loadDiscoveryDocument(discoverDoc).then(() => this.authService.tryLoginCodeFlow());
    }
}
