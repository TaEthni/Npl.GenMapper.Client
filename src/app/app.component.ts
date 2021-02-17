import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@npl-auth';
import { OAuthService } from 'angular-oauth2-oidc';

import { AppState } from './store/state';

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
        this.oAuthService.setupAutomaticSilentRefresh();
        this.store.select(isAuthenticated).subscribe(isAuthenticated => {
            console.log({ isAuthenticated });
        });
    }
}
