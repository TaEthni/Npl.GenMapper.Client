import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseUrl, EntityService } from '@core/entity.service';
import { EntityType } from '@shared/entity/entity.model';
import { User } from '@shared/entity/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TokenService } from './token.service';



export interface LoginConfig {
    email: string;
    password: string;
}

interface ResponseData {
    data: any;
    status: string;
}

@Injectable()
export class AuthenticationService {
    private _user: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor(
        private entityService: EntityService,
        private tokenService: TokenService,
        private http: HttpClient,
        private router: Router
    ) {

    }

    public isAuthenticated(): boolean {
        return this.tokenService.getValue().isAuthenticated;
    }

    public getUser(): Observable<User> {
        return this._user.asObservable();
    }

    public signup(value: User): Observable<User> {
        const data = {
            entityType: EntityType.Users,
            username: value.username || null,
            password: value.password,
            email: value.email
        } as User;

        return this.entityService.create<User>(data);
    }

    public authenticate(config: LoginConfig): Observable<any> {
        // const options = { headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8') };
        return this.http
            .post<ResponseData>(BaseUrl + 'auth', config)
            .pipe(tap((responseData) => {
                this.tokenService.set(responseData.data);
                this.refreshUser();
            }));
    }

    public refreshUser(): void {
        const token = this.tokenService.getValue();

        if (!token.isAuthenticated) {
            return;
        }

        this.http.get<ResponseData>(BaseUrl + 'auth')
            .subscribe(
                response => {
                    this._user.next(response.data);
                },
                error => {
                    this.tokenService.set('');
                }
            );
    }

    public logout(): void {
        this.tokenService.clear();
        this.router.navigate(['login']);
    }

    public resetPassword(key: string, password: string): Observable<ResponseData> {
        return this.http.post<ResponseData>(BaseUrl + 'users:reset-password', { key, password });
    }

    public checkResetPasswordToken(key: string): Observable<boolean> {
        return this.http.post<any>(BaseUrl + 'users:verify-password-reset', { key });
    }

    public recoverPassword(options: { email: string }): Observable<ResponseData> {
        return this.http.post<ResponseData>(BaseUrl + 'users:forgot-password', options);
    }

    public acceptEmailConfirmation(key: string): Observable<ResponseData> {
        return this.http.post<ResponseData>(BaseUrl + 'users:confirm-email', { key });
    }
}
