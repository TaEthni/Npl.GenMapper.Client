import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';


@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
    constructor(
        @Optional() private authService: OAuthService
    ) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService && this.authService.hasValidAccessToken()) {
            const token = this.authService.getAccessToken();
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });

            return next.handle(authReq);
        }

        return next.handle(req);
    }
}