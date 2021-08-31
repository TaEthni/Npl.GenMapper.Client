import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseUrl, EntityService } from '@npl-core/entity.service';
import { EntityType, User, UserProfile } from '@npl-data-access';
import { OAuthService } from 'angular-oauth2-oidc';
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
    private _user: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(
        public oauthService: OAuthService,
        private entityService: EntityService,
        private tokenService: TokenService,
        private http: HttpClient,
        private router: Router
    ) {
    }

    public isAuthenticated(): boolean {
        return this.oauthService.hasValidAccessToken();
    }

    public getUser(): Observable<UserProfile> {
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
        if (!this.isAuthenticated()) {
            this._user.next(null);
            return;
        }

        this.oauthService.loadUserProfile().then((profile: UserProfile) => {
            // TODO use different user model
            profile.username = profile.name;
            this._user.next(profile as any);
        });

        // const token = this.tokenService.getValue();

        // if (!token.isAuthenticated) {
        //     this._user.next(null);
        //     return;
        // }

        // this.http.get<ResponseData>(BaseUrl + 'auth')
        //     .subscribe(
        //         response => {
        //             this._user.next(response.data);
        //         },
        //         error => {
        //             this.tokenService.set('');
        //         }
        //     );
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
