import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from './token.service';


@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private router: Router
    ) { }

    public canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
        const token = this.tokenService.getValue();

        if (!token || !token.isAuthenticated) {
            return this.router.parseUrl('/');
        }

        if (new Date(token.expires) < new Date()) {
            return this.router.parseUrl('/');
        }

        return true;
    }
}
