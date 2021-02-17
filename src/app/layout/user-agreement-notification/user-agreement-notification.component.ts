import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthUser, getUserProfile, isAuthenticated } from '@npl-auth';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState } from '@npl-store';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-user-agreement-notification',
    templateUrl: './user-agreement-notification.component.html',
    styleUrls: ['./user-agreement-notification.component.scss']
})
export class UserAgreementNotificationComponent extends Unsubscribable implements OnInit {

    private ignoredKey: 'user_agreement_ignored';

    public isIgnored: boolean;
    public isAuthenticated: boolean;
    public user: AuthUser;

    constructor(
        private store: Store<AppState>
    ) {
        super();
        const ignored = localStorage.getItem(this.ignoredKey);
        this.isIgnored = ignored ? JSON.parse(ignored) : false;
    }

    public ngOnInit(): void {
        this.store.select(isAuthenticated)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(isAuthenticated => {
                this.isAuthenticated = isAuthenticated;
            });

        this.store.select(getUserProfile)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(user => {
                this.user = user;
            });

        // TODO get self
    }

    public ignore(): void {
        this.isIgnored = true;
        localStorage.setItem(this.ignoredKey, 'true');
    }
}
