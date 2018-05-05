import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRefService } from '@core/windowref.service';
import { Observable, Subscription, timer } from 'rxjs';
import { Token } from './token.model';
import { TokenService } from './token.service';
import { switchMap, take, tap, filter } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    private refreshTimer: Subscription;

    constructor(
        private tokenService: TokenService,
        private http: HttpClient,
        private windowRef: WindowRefService,
        private router: Router
    ) {
        this.tokenService.get()
            .pipe(
                filter(token => token !== null)
            )
            .subscribe(token => {
                if (this.refreshTimer) {
                    this.stopTimer();
                }

                const ex = new Date(token.expires);
                const now = new Date();
                const ms = (<any>ex - <any>now) / 2;

                this.refreshTimer = timer(ms)
                    .pipe(
                        take(1),
                        switchMap(() => this.refreshToken())
                    )
                    .subscribe(
                        t => this.tokenService.set(t),
                        error => {
                            this.stopTimer();
                            this.tokenService.clear();
                            this.windowRef.location.assign('/authenticate');
                            return Observable.throw(error);
                        });
            });
    }

    private stopTimer(): void {
        this.refreshTimer.unsubscribe();
        this.refreshTimer = null;
    }

    public authenticate(code: string): Observable<Token> {
        const options = { headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8') };
        return this.http
            .post<Token>('/api/login/authenticate', JSON.stringify({
                code: code,
                redirect: `https://${this.windowRef.location.host}/login`
            }), options)
            .pipe(tap(token => {
                this.tokenService.set(token);
                this.router.navigate(['']);
            }));
    }

    public refreshToken(): Observable<Token> {
        const token = this.tokenService.get().value;
        const options = { headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8') };
        return this.http
            .post<Token>('/api/login/refresh', JSON.stringify(token.refreshToken), options);
    }

    public logout(): void {
        this.tokenService.clear();
        window.location.assign(`/logout?ref=https://${this.windowRef.location.host}/`);
    }
}
