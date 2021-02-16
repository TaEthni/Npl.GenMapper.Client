import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserProfile } from '@npl-auth';
import { AppState } from '@npl-store';
import { filter, map } from 'rxjs/operators';

import { ExternalLandingLinks, LandingLinks } from '../account-links';

@Component({
    selector: 'app-account-landing',
    templateUrl: './account-landing.component.html',
    styleUrls: ['./account-landing.component.scss']
})
export class AccountLandingComponent {

    public readonly links$ = this.store.select(getUserProfile).pipe(
        filter(x => !!x),
        map(user => user.isExternal ? ExternalLandingLinks : LandingLinks)
    );

    public constructor(
        private store: Store<AppState>
    ) { }
}
