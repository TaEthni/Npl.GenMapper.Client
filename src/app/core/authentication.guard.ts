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
        const template = route.data.template;

        if (!token || !token.isAuthenticated) {

            if (template) {
                this.router.navigate([template.name, 'offline']);
            }

            return false;
        }

        if (new Date(token.expires) < new Date()) {

            if (template) {
                this.router.navigate([template.name, 'offline']);
            }
            return false;
        }

        // if (!token.isEmailVerified) {
        //     this.router.navigate(['unverified']);
        //     return false;
        // }

        return true;
    }
}
