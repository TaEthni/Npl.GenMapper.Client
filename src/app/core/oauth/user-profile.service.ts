import { Injectable } from '@angular/core';
import { UserProfile } from '@npl-data-access';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private userSource = new ReplaySubject<UserProfile>();
    public user$ = this.userSource.asObservable();

    constructor(private oathService: OAuthService) { }

    public load(): Observable<UserProfile> {
        this._load().then(profile => {
            this.userSource.next(profile);
        });

        return this.user$;
    }

    private _load(): Promise<UserProfile> {
        return this.oathService.loadUserProfile().then((obj) => obj as UserProfile);
    }
}
