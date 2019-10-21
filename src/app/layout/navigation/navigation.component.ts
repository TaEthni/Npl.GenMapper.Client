import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LocaleService, TranslationType } from '@core/locale.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { User } from '@shared/entity/user.model';
import i18next from 'i18next';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SupportDialogComponent, SupportDialogConfig } from '../support-dialog/support-dialog.component';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends Unsubscribable implements OnInit {
    public translations$: Observable<TranslationType[]>;
    public localeControl: FormControl;

    @Input()
    public authenticated: boolean;

    @Input()
    public user: User = null;

    constructor(
        private dialog: MatDialog,
        private localeService: LocaleService
    ) { super(); }

    public ngOnInit(): void {
        this.translations$ = this.localeService.getTranslations();
        this.localeControl = new FormControl(i18next.language);

        this.localeControl.valueChanges.pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.localeService.set(result);
            });
    }

    public goto(event: Event, url: string): void {
        event.preventDefault();
        event.stopPropagation();
        window.open(url, '_blank');
    }

    public sendFeedback(): void {
        this.dialog.open<SupportDialogComponent, SupportDialogConfig, void>(SupportDialogComponent, {
            data: {
                authenticated: this.authenticated,
                user: this.user,
                isFeedback: true,
            }
        });
    }

    public help(): void {
        this.dialog.open<SupportDialogComponent, SupportDialogConfig, void>(SupportDialogComponent, {
            data: {
                authenticated: this.authenticated,
                user: this.user,
                isFeedback: false,
            }
        });
    }
}
