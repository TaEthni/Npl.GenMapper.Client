import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthenticationGuard } from '@core/authentication.guard';
import { AuthenticationService } from '@core/authentication.service';
import { AuthorizationInterceptor } from '@core/authorization.interceptor';
import { TokenService } from '@core/token.service';
import { WindowRefService } from '@core/windowref.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
        AuthenticationGuard,
        AuthenticationService,
        TokenService,
        WindowRefService
    ]
})
export class CoreModule { }
