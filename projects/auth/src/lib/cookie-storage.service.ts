import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CookieStorageService extends OAuthStorage {
    public constructor(private cookieService: CookieService) {
        super();
    }

    public getItem(key: string): string {
        return this.cookieService.get(key)
    }

    public removeItem(key: string): void {
        this.cookieService.delete(key);
    }

    public setItem(key: string, data: string): void {
        this.cookieService.set(key, data, undefined, undefined, undefined, false);
    }
}
