import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AuthenticationGuard } from '@core/authentication.guard';
import { AuthenticationService } from '@core/authentication.service';
import { AuthorizationInterceptor } from '@core/authorization.interceptor';
import { DownloadService } from '@core/download.service';
import { EntityService } from '@core/entity.service';
import { TokenService } from '@core/token.service';
import { WindowRefService } from '@core/windowref.service';
import { AccountService } from './account.service';
import { DesktopOnlyGuard } from './desktop-only.quard';
import { LocaleService } from './locale.service';
import { MapsService } from './maps.service';
import { SupportService } from './support.service';
import { UserResolver } from './user.resolver';
import { OAuthInitializerService } from './oauth/initializer.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthInterceptor } from './oauth/oauth.interceptor';
import { OAuthGuard } from './oauth/oauth.guard';


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
