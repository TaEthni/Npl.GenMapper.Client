import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthenticationGuard } from '@core/authentication.guard';
import { AuthenticationService } from '@core/authentication.service';
import { AuthorizationInterceptor } from '@core/authorization.interceptor';
import { DownloadService } from '@core/download.service';
import { EntityService } from '@core/entity.service';
import { TokenService } from '@core/token.service';
import { WindowRefService } from '@core/windowref.service';

import { AccountService } from './account.service';
import { LocaleService } from './locale.service';
import { SupportService } from './support.service';
import { UserResolver } from './user.resolver';
import { MapsService } from './maps.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
        AuthenticationGuard,
        AuthenticationService,
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
