import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserProfile } from '@npl-auth';
import { AppState } from '@npl-data-access';
import { filter, map } from 'rxjs/operators';

import { AccountLinks, ExternalLinks } from '../account-links';

@Component({
    selector: 'app-account-layout',
    templateUrl: './account-layout.component.html',
    styleUrls: ['./account-layout.component.scss'],
})
export class AccountLayoutComponent {
    public readonly links$ = this.store.select(getUserProfile).pipe(
        filter(x => !!x),
        map(user => user.isExternal ? ExternalLinks : AccountLinks)
    );

    public constructor(
        private store: Store<AppState>
    ) { }
}
