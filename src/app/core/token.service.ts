import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from './token.model';

@Injectable()
export class TokenService {
    public static readonly storageKey = 'token';
    private readonly _token: BehaviorSubject<Token> = new BehaviorSubject(new Token());

    constructor() {
        const existing = JSON.parse(localStorage.getItem(TokenService.storageKey));

        if (existing) {
            this._token.next(Object.assign(new Token(), existing));
        }
    }

    public get(): Observable<Token> {
        return this._token.asObservable();
    }

    public getValue(): Token {
        return this._token.getValue();
    }

    public set(authToken: string): void {
        const token = new Token();
        token.authToken = authToken;
        token.isAuthenticated = token.authToken && token.authToken.length > 0;
        localStorage.setItem(TokenService.storageKey, JSON.stringify(token));
        this._token.next(token);
    }

    public clear(): void {
        localStorage.setItem(TokenService.storageKey, null);
        this._token.next(new Token());
    }
}
