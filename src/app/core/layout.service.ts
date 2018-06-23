import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    private matSidenav: MatSidenav;

    public setSidenav(sidenav: MatSidenav): void {
        this.matSidenav = sidenav;
    }

    public getSidenav(): MatSidenav {
        return this.matSidenav;
    }
}
