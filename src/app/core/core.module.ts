import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthenticationService } from '@npl-core/authentication.service';
import { DownloadService } from '@npl-core/download.service';
import { EntityService } from '@npl-core/entity.service';
import { TokenService } from '@npl-core/token.service';
import { WindowRefService } from '@npl-core/windowref.service';
import { OAuthService } from 'angular-oauth2-oidc';

import { AccountService } from './account.service';
import { DesktopOnlyGuard } from './desktop-only.quard';
import { LocaleService } from './locale.service';
import { MapsService } from './maps.service';
import { OAuthInitializerService } from './oauth/initializer.service';
import { OAuthGuard } from './oauth/oauth.guard';
import { OAuthInterceptor } from './oauth/oauth.interceptor';
import { SupportService } from './support.service';
import { UserResolver } from './user.resolver';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        OAuthInitializerService,
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [OAuthInitializerService, OAuthService],
            useFactory: (provider: OAuthInitializerService) => () => provider.load()
        },
        {
            provide: HTTP_INTERCEPTORS, useClass: OAuthInterceptor, multi: true
        },
        OAuthGuard,
        // { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
        // AuthenticationGuard,
        AuthenticationService,
        DesktopOnlyGuard,
        TokenService,
        WindowRefService,
        EntityService,
        DownloadService,
        UserResolver,
        SupportService,
        LocaleService,
        AccountService,
        MapsService
    ]
})
export class CoreModule { }
