import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication.service';
import { TokenService } from '@core/token.service';
import { User } from '@shared/user.model';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    public user: User;
    public isAuthenticated: boolean;

    constructor(
        private tokenService: TokenService,
        private authService: AuthenticationService
    ) { }

    public ngOnInit(): void {
        this.tokenService.get().subscribe(token => {
            this.isAuthenticated = token.isAuthenticated;
        });

        this.authService.getUser().subscribe(user => {
            this.user = user;
        });

        this.authService.refreshUser();
    }
}
