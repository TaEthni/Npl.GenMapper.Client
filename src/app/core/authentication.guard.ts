import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenService } from './token.service';
import { WindowRefService } from '@core/windowref.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private tokenService: TokenService,
        @Inject(WindowRefService) private windowRef: WindowRefService,
        private router: Router) {
    }

    public canActivate(): boolean {
        const token = this.tokenService.get().value;

        if (!token || !token.isAuthenticated) {
            this.windowRef.location.assign('/authenticate');
            return false;
        }

        if (new Date(token.expires) < new Date()) {
            this.windowRef.location.assign('/authenticate');
            return false;
        }

        if (!token.isEmailVerified) {
            this.router.navigate(['unverified']);
            return false;
        }

        return true;
    }
}
