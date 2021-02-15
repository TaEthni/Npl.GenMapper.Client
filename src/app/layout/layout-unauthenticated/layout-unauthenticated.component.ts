import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-layout-unauthenticated',
    templateUrl: './layout-unauthenticated.component.html',
    styleUrls: ['./layout-unauthenticated.component.scss']
})
export class LayoutUnauthenticatedComponent extends Unsubscribable implements OnInit {

    @ViewChild(MatSidenav, { static: true })
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
