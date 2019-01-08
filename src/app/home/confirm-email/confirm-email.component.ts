import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication.service';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
    private key: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService
    ) { }

    public ngOnInit(): void {
        this.key = this.route.snapshot.queryParams.key;
        this.authService.acceptEmailConfirmation(this.key)
            .subscribe(
                success => { },
                error => {
                    this.router.navigate(['/notfound']);
                }
            );
    }
}
