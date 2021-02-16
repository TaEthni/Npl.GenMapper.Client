import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '@npl-core/authentication.service';
import { LayoutService } from '@npl-core/layout.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
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

    @ViewChild(MatSidenav, { static: true })
    public matSidenav: MatSidenav;

    constructor(
        private authService: AuthenticationService,
        private layoutService: LayoutService,
        private router: Router
    ) {
        super();
    }

    public ngOnInit(): void {

        this.layoutService.setSidenav(this.matSidenav);

        // this.authService.refreshUser();

        this.router.events
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(event => {
                if (event instanceof NavigationStart) {
                    this.matSidenav.close();
                }
            });
    }
}
