import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { WindowRefService } from '@core/windowref.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        @Inject(WindowRefService) private windowRef: WindowRefService,
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
