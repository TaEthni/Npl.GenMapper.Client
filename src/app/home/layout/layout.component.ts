import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@core/authentication.service';
import { TokenService } from '@core/token.service';
import { User } from '@shared/user.model';
import { LayoutService } from '@core/layout.service';
import { MatSidenav } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
import { Unsubscribable } from '@core/Unsubscribable';
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

        this._tokenService.get().subscribe(token => {
            this.isAuthenticated = token.isAuthenticated;
        });

        this._authService.getUser().subscribe(user => {
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
