import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AuthActions, AuthUser, getUserProfile, isAuthenticated } from '@npl-auth';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState } from '@npl-data-access';
import { LANGUAGES } from '@npl-shared/languages.const';
import { take, takeUntil } from 'rxjs/operators';

import { UpdatesService } from '../../updates/updates.service';
import { SupportDialogConfig, SupportDialogV1Component } from '../support-dialog-v1/support-dialog-v1.component';
import { SupportDialogComponent } from '../support-dialog/support-dialog.component';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends Unsubscribable implements OnInit {
    public localeControl: FormControl;
    public isLoggedIn$ = this.store.select(isAuthenticated);
    public userProfile: AuthUser;
    public languages = LANGUAGES;

    constructor(
        private dialog: MatDialog,
        private translate: TranslateService,
        private updatesService: UpdatesService,
        // private authService: AuthenticationService,
        private store: Store<AppState>
    ) { super(); }

    public ngOnInit(): void {
        this.localeControl = new FormControl(this.translate.currentLang);
        this.localeControl.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.translate.use(result);
        });

        this.store.select(getUserProfile).pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.userProfile = result;
        });

        // this.authService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
        //     this.userProfile = result;
        // });
    }

    public login(): void {
        this.store.dispatch(AuthActions.login());
    }

    public logout(): void {
        this.store.dispatch(AuthActions.logout());
    }

    public goto(event: Event, url: string): void {
        event.preventDefault();
        event.stopPropagation();
        window.open(url, '_blank');
    }

    public showUpdates(): void {
        this.updatesService.show();
    }

    public sendFeedback(): void {
        this.isLoggedIn$.pipe(take(1)).subscribe(isLoggedIn => {
            this.dialog.open<SupportDialogV1Component, SupportDialogConfig, void>(SupportDialogV1Component, {
                data: {
                    authenticated: isLoggedIn,
                    user: this.userProfile,
                    isFeedback: true,
                }
            });
        })
    }

    public help(): void {
        this.dialog.open<SupportDialogComponent, void, void>(SupportDialogComponent);

        // this.dialog.open<SupportDialogV1Component, SupportDialogConfig, void>(SupportDialogV1Component, {
        //     data: {
        //         authenticated: this.authenticated,
        //         user: this.user,
        //         isFeedback: false,
        //     }
        // });
    }
}
