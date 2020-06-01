import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication.service';
import { TokenService } from '@core/token.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { User } from '@models/user.model';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-user-agreement-notification',
    templateUrl: './user-agreement-notification.component.html',
    styleUrls: ['./user-agreement-notification.component.scss']
})
export class UserAgreementNotificationComponent extends Unsubscribable implements OnInit {

    private ignoredKey: 'user_agreement_ignored';

    public isIgnored: boolean;
    public isAuthenticated: boolean;
    public user: User;

    constructor(
        private tokenService: TokenService,
        private authService: AuthenticationService
    ) {
        super();
        const ignored = localStorage.getItem(this.ignoredKey);
        this.isIgnored = ignored ? JSON.parse(ignored) : false;
    }

    public ngOnInit(): void {
        this.tokenService.get()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(token => {
                this.isAuthenticated = token.isAuthenticated;
            });

        this.authService.getUser()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(user => {
                this.user = user;
            });
    }

    public ignore(): void {
        this.isIgnored = true;
        localStorage.setItem(this.ignoredKey, 'true');
    }
}
