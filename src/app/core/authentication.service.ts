import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseUrl } from '@core/entity.service';
import { WindowRefService } from '@core/windowref.service';
import { User } from '@shared/user.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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
        private tokenService: TokenService,
        private http: HttpClient,
        private windowRef: WindowRefService,
        private router: Router
    ) {

    }

    public getUser(): Observable<User> {
        return this._user.asObservable();
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
        this.http.get<ResponseData>(BaseUrl + 'auth')
            .subscribe(response => {
                this._user.next(response.data);
            });
    }

    public logout(): void {
        this.tokenService.clear();
        this.router.navigate(['login']);
    }
}
