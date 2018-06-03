import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WindowRefService } from '@core/windowref.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private tokenService: TokenService,
        @Inject(WindowRefService) private windowRef: WindowRefService,
        private router: Router) {
    }

    public canActivate(): boolean {
        const token = this.tokenService.get().value;

        if (!token || !token.isAuthenticated) {
            // this.windowRef.location.assign('/authenticate');
            return false;
        }

        if (new Date(token.expires) < new Date()) {
            // this.windowRef.location.assign('/authenticate');
            return false;
        }

        // if (!token.isEmailVerified) {
        //     this.router.navigate(['unverified']);
        //     return false;
        // }

        return true;
    }
}
