import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';


@Injectable({
    providedIn: 'root'
})
export class OAuthGuard implements CanActivate, CanActivateChild {
    private initialRouteKey = 'initial_route';

    constructor(
        private authService: OAuthService,
        private router: Router
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.tryActivate(state);
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.tryActivate(state);
    }

    private tryActivate(state: RouterStateSnapshot): boolean {
        if (this.authService.hasValidAccessToken()) {
            const route = sessionStorage.getItem(this.initialRouteKey);

            if (route) {
                sessionStorage.removeItem(this.initialRouteKey);
                this.router.navigateByUrl(route);
            }

            return true;
        }

        sessionStorage.setItem(this.initialRouteKey, state.url);
        this.authService.initLoginFlow();
    }
}
