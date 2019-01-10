import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const value = this.tokenService.getValue();

        if (value && value.authToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${value.authToken}`)
            });

            return next.handle(authReq);
        }

        return next.handle(req);
    }
}
