import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
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

    @ViewChild('donate')
    public donateButton: ElementRef;

    public tools = [
        {
            name: 'Church Circles',
            route: '/church-circles'
        },
        {
            name: 'Four Fields',
            route: '/four-fields'
        }
    ];

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

        this.donateButton.nativeElement.innerHTML = getPayPalButton();
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


function getPayPalButton(): string {
    return `
    <form action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top">
        <input type="hidden"
               name="cmd"
               value="_donations" />
        <input type="hidden"
               name="business"
               value="WR657KF67GLC2" />
        <input type="hidden"
               name="currency_code"
               value="USD" />
        <input type="image"
               src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
               border="0"
               name="submit"
               title="PayPal - The safer, easier way to pay online!"
               alt="Donate with PayPal button" />
        <img alt=""
             border="0"
             src="https://www.paypal.com/en_US/i/scr/pixel.gif"
             width="1"
             height="1" />
    </form>
    `;
}
