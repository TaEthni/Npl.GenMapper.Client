import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@npl-auth';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState, Member, SelfSelectors } from '@npl-data-access';
import { filter, takeUntil } from 'rxjs/operators';

const ignoredKey = 'user_agreement_ignored-v2';

@Component({
    selector: 'app-user-agreement-notification',
    templateUrl: './user-agreement-notification.component.html',
    styleUrls: ['./user-agreement-notification.component.scss']
})
export class UserAgreementNotificationComponent extends Unsubscribable implements OnInit {

    public isIgnored: boolean;
    public isAuthenticated: boolean;
    public self: Member;

    constructor(
        private store: Store<AppState>
    ) {
        super();
        const ignored = sessionStorage.getItem(ignoredKey);
        this.isIgnored = ignored ? JSON.parse(ignored) : false;
    }

    public ngOnInit(): void {
        this.store.select(isAuthenticated)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(isAuthenticated => {
                this.isAuthenticated = isAuthenticated;
            });

        this.store.select(SelfSelectors.getSelf)
            .pipe(
                filter(x => !!x),
                takeUntil(this.unsubscribe)
            )
            .subscribe(member => {
                this.self = member;
            });
    }

    public ignore(): void {
        this.isIgnored = true;
        sessionStorage.setItem(ignoredKey, 'true');
    }
}
