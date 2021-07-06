import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { isAuthenticated } from '@npl-auth';
import { AppState, SelfUIActions } from '@npl-data-access';
import { OAuthService } from 'angular-oauth2-oidc';

const localeKey = 'i18nextLng';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private store: Store<AppState>,
        private oAuthService: OAuthService,
        private translate: TranslateService
    ) {
        this.translate.setDefaultLang('en');

        try {
            const lang = localStorage.getItem(localeKey) || 'en';
            this.translate.use(lang);
        } catch {
            this.translate.use('en');
        }

        this.translate.onLangChange.subscribe(event => {
            try {
                localStorage.setItem(localeKey, event.lang);
            } catch { }
        });
    }

    public ngOnInit(): void {
        this.oAuthService.setupAutomaticSilentRefresh();
        this.store.select(isAuthenticated).subscribe(authenticated => {
            console.log({ authenticated });
            if (authenticated) {
                this.store.dispatch(SelfUIActions.loadSelf());
            }
        });
    }
}
