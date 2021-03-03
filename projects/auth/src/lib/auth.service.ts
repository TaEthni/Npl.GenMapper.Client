import { Injectable } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

import { AuthUser } from './user';

interface InitAuthConfig {
    continueRouting: boolean;
};

@Injectable()
export class AuthService {
    public constructor(
        private oAuthService: OAuthService,
    ) {
    }

    public checkValidSession(): boolean {
        return this.oAuthService.hasValidAccessToken() && this.oAuthService.hasValidIdToken();
    }

    public getToken(): string {
        return this.oAuthService.getAccessToken();
    }

    public login(): void {
        this.oAuthService.initLoginFlow();
    }

    public logout(): void {
        this.oAuthService.logOut();
    }

    public loadUser(): Observable<AuthUser> {
        return new Observable((observer) => {
            if (!this.checkValidSession()) {
                observer.next();
                return;
            }

            this.oAuthService.loadUserProfile()
                .then(user => {
                    this.processClaims(user);
                    observer.next(user as AuthUser);
                })
                .catch((error) => {
                    observer.error(error);
                });
        });
    }

    public setPostAuthorizeUrl(url: string): void {
        sessionStorage.setItem('POST_AUTHORIZE_REDIRECT', url);
    }

    public getPostAuthorizeUrl(): string {
        return sessionStorage.getItem('POST_AUTHORIZE_REDIRECT')!;
    }

    public clearPostAuthorizeUrl(): void {
        sessionStorage.removeItem('POST_AUTHORIZE_REDIRECT')!;
    }

    private processClaims(user: UserInfo): void {
        Object.keys(user).forEach(key => {
            const value = user[key];
            if (value === 'False' || value === 'True') {
                user[key] = value === 'False' ? false : true;
            }
        });

        user.isExternal = user.idp !== 'local';
    }
}
