import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '@npl-core/authentication.service';
import { LocaleService, TranslationType } from '@npl-core/locale.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { UserProfile } from '@npl-models/UserProfile.model';
import i18next from 'i18next';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UpdatesService } from '../../updates/updates.service';
import { SupportDialogConfig, SupportDialogV1Component } from '../support-dialog-v1/support-dialog-v1.component';
import { SupportDialogComponent } from '../support-dialog/support-dialog.component';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends Unsubscribable implements OnInit {
    public translations$: Observable<TranslationType[]>;
    public localeControl: FormControl;
    public isLoggedIn = this.authService.isAuthenticated();
    public userProfile: UserProfile

    constructor(
        private dialog: MatDialog,
        private localeService: LocaleService,
        private updatesService: UpdatesService,
        private authService: AuthenticationService,
    ) { super(); }

    public ngOnInit(): void {
        this.translations$ = this.localeService.getTranslations();
        this.localeControl = new FormControl(i18next.language);

        this.localeControl.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.localeService.set(result);
        });

        this.authService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.userProfile = result;
        });
    }

    public login(): void {
        this.authService.oauthService.initLoginFlow();
    }

    public logout(): void {
        this.authService.oauthService.logOut();
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
        this.dialog.open<SupportDialogV1Component, SupportDialogConfig, void>(SupportDialogV1Component, {
            data: {
                authenticated: this.isLoggedIn,
                user: this.userProfile,
                isFeedback: true,
            }
        });
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
