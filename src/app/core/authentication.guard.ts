import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenService } from './token.service';


@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private router: Router
    ) { }

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        const token = this.tokenService.getValue();

        if (!token || !token.isAuthenticated) {

            this.router.navigate(['/']);
            return false;
        }

        if (new Date(token.expires) < new Date()) {

            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}
