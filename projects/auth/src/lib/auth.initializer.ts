import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

import { AUTH_CONFIG, GetAuthConfig, IAuthConfig } from './auth.config';
import { AuthService } from './auth.service';
import { AuthActions } from './store';

@Injectable()
export class AuthInitializer {
    private config: AuthConfig;

    public constructor(
        private authService: AuthService,
        private oAuthService: OAuthService,
        private store: Store<any>,
        @Inject(AUTH_CONFIG) private authConfig: IAuthConfig
    ) {
        this.config = GetAuthConfig(authConfig);
    }

    public load(): Promise<void> {
        this.oAuthService.configure(this.config);
        return this.oAuthService
            .loadDiscoveryDocumentAndTryLogin()
            .then(() => {
                const isLoggedIn =
                    this.oAuthService.hasValidAccessToken() &&
                    this.oAuthService.hasValidIdToken();
                if (isLoggedIn) {
                    this.store.dispatch(
                        AuthActions.initAuthorization({
                            authorized: isLoggedIn,
                        })
                    );
                }
                return;
            })
            .catch((e) => {
                console.log({ e });
                return;
            });
    }
}
