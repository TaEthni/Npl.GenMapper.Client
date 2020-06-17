import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(
        private tokenService: TokenService,
        private router: Router
    ) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const value = this.tokenService.getValue();

        if (value && value.authToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${value.authToken}`)
            });

            return next.handle(authReq).pipe(catchError(error => {
                console.log(error);
                if (error.status === 401) {
                    this.tokenService.clear();
                    this.router.navigate(['/']);
                }
                return throwError(error);
            }))
        }

        return next.handle(req).pipe(
            catchError(error => {
                console.log(error);
                if (error.status === 401) {
                    this.tokenService.clear();
                    this.router.navigate(['/']);
                }

                return throwError(error);
            })
        );
    }
}
