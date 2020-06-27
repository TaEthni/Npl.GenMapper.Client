import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Device } from './platform';


@Injectable()
export class DesktopOnlyGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    public canActivate(): boolean | UrlTree {
        if (Device.isDesktop) {
            return true;
        }

        return this.router.parseUrl('/');
    }
}
