import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Unsubscribable } from '@core/Unsubscribable';
import { MatSidenav } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-layout-unauthenticated',
    templateUrl: './layout-unauthenticated.component.html',
    styleUrls: ['./layout-unauthenticated.component.scss']
})
export class LayoutUnauthenticatedComponent extends Unsubscribable implements OnInit {

    @ViewChild(MatSidenav)
    public matSidenav: MatSidenav;

    constructor(private router: Router) { super(); }

    public ngOnInit(): void {
        this.router.events
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(event => {
                if (event instanceof NavigationStart) {
                    this.matSidenav.close();
                }
            });
    }
}
