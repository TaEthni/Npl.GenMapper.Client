import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication.service';
import { LayoutService } from '@core/layout.service';
import { TokenService } from '@core/token.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { User } from '@shared/entity/user.model';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: [
        LayoutService
    ]
})
export class LayoutComponent extends Unsubscribable implements OnInit {

    public user: User;
    public isAuthenticated: boolean;

    @ViewChild(MatSidenav)
    public matSidenav: MatSidenav;

    constructor(
        private _tokenService: TokenService,
        private _authService: AuthenticationService,
        private _layoutService: LayoutService,
        private _router: Router
    ) {
        super();
    }

    public ngOnInit(): void {

        this._layoutService.setSidenav(this.matSidenav);

        this._tokenService.get()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(token => {
                this.isAuthenticated = token.isAuthenticated;
            });

        this._authService.getUser()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(user => {
                this.user = user;
            });

        this._authService.refreshUser();

        this._router.events
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(event => {
                if (event instanceof NavigationStart) {
                    this.matSidenav.close();
                }
            });
    }
}
