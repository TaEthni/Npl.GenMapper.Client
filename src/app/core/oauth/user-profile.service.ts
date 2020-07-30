import { Injectable } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";
import { UserProfile } from "@models/UserProfile.model";
import { User } from "@models/user.model";

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