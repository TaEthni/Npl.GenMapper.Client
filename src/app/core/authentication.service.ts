import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseUrl, EntityService } from '@core/entity.service';
import { WindowRefService } from '@core/windowref.service';
import { User } from '@shared/user.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TokenService } from './token.service';
import { EntityType } from '@shared/entity.model';
import { map } from 'rxjs/operators';



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
        private windowRef: WindowRefService,
        private router: Router
    ) {

    }

    public getUser(): Observable<User> {
        return this._user.asObservable();
    }

    public signup(value: User): Observable<User> {
        value.entityType = EntityType.Users;
        return this.entityService.create<User>(value);
    }

    public authenticate(config: LoginConfig): void {
        const options = { headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8') };
        this.http
            .post<ResponseData>(BaseUrl + 'auth', config)
            .subscribe((responseData) => {
                this.tokenService.set(responseData.data);
                this.refreshUser();
                this.router.navigate(['']);
            });
    }

    public refreshUser(): void {
        const token = this.tokenService.getValue();

        if (!token.isAuthenticated) {
            return;
        }

        this.http.get<ResponseData>(BaseUrl + 'auth')
            .subscribe(response => {
                this._user.next(response.data);
            });
    }

    public logout(): void {
        this.tokenService.clear();
        this.router.navigate(['login']);
    }

    public resetPassword(token: string, options: { password: string }): Observable<ResponseData> {
        return this.http
            .post<ResponseData>(BaseUrl + 'reset/' + token, options);
    }

    public checkResetPasswordToken(token: string): Observable<boolean> {
        return this.http.get<any>(BaseUrl + 'reset/' + token);
    }

    public recoverPassword(options: { email: string }): Observable<ResponseData> {
        return this.http
            .post<ResponseData>(BaseUrl + 'recover', options);
    }
}
