import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@npl-auth';
import { AppState, SelfUIActions } from '@npl-data-access';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private store: Store<AppState>,
        private oAuthService: OAuthService,
    ) { }

    public ngOnInit(): void {
        this.store.dispatch(SelfUIActions.loadSelf());

        this.oAuthService.setupAutomaticSilentRefresh();
        this.store.select(isAuthenticated).subscribe(isAuthenticated => {
            console.log({ isAuthenticated });
        });
    }
}
