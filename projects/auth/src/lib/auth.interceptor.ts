import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // private secureRoutes = ['http://my.route.io/secureapi'];

    public constructor(private authService: AuthService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Ensure we send the token only to routes which are secured
        // if (!this.secureRoutes.find((x) => req.url.startsWith(x))) {
        //     return next.handle(req);
        // }

        const token = this.authService.getToken();

        if (!token) {
            return next.handle(req);
        }

        req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token),
        });

        return next.handle(req);
    }
}
