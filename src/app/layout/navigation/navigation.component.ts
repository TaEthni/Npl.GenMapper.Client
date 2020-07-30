import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '@core/authentication.service';
import { LocaleService, TranslationType } from '@core/locale.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { UserProfile } from '@models/UserProfile.model';
import i18next from 'i18next';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UpdatesService } from '../../updates/updates.service';


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
        // private dialog: MatDialog,
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
        // this.dialog.open<SupportDialogComponent, SupportDialogConfig, void>(SupportDialogComponent, {
        //     data: {
        //         authenticated: this.authenticated,
        //         user: this.user,
        //         isFeedback: true,
        //     }
        // });
    }

    public help(): void {
        // this.dialog.open<SupportDialogComponent, SupportDialogConfig, void>(SupportDialogComponent, {
        //     data: {
        //         authenticated: this.authenticated,
        //         user: this.user,
        //         isFeedback: false,
        //     }
        // });
    }
}
