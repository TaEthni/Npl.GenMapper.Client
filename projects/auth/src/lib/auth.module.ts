import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { OAuthModule, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { CookieService } from 'ngx-cookie-service';

import { AUTH_CONFIG, IAuthConfig } from './auth.config';
import { AuthInitializer } from './auth.initializer';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { AuthorizationGuard } from './authorize.guard';
import { CookieStorageService } from './cookie-storage.service';
import { DeveloperOnlyGuard } from './developer-only.guard';
import { IDPRoles } from './IDPRoles';
import { InternalOnlyGuard } from './internal-only.guard';
import { AuthUser } from './user';

export {
    AuthService,
    AuthUser,
    IDPRoles,
    DeveloperOnlyGuard,
    InternalOnlyGuard,
    AuthorizationGuard
};
@NgModule({
    imports: [
        CommonModule,
        OAuthModule.forRoot()
    ],
    providers: [
        AuthService,
        AuthInitializer,
        CookieService,
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [AuthInitializer, OAuthService, AuthService],
            useFactory: (provider: AuthInitializer) => () => provider.load()
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ],
})
export class AuthModule {
    public static forRoot(authConfig: IAuthConfig): ModuleWithProviders<AuthModule> {
        const providers: Provider[] = [
            {
                provide: AUTH_CONFIG,
                useValue: authConfig
            },
        ];

        if (!authConfig.useSessionStore) {
            providers.push({
                provide: OAuthStorage,
                useClass: CookieStorageService
            });
        }

        return { ngModule: AuthModule, providers }
    }
}
