import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@npl-core/authentication.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { User } from '@npl-data-access';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends Unsubscribable implements OnInit {
    public user: User;

    constructor(
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { super(); }

    public ngOnInit(): void {
        this.authService.getUser().pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.user = result;
                console.log(this.user);
            });
    }

    public onSubmit(): void {
        this.snackBar.open('You account has been saved', 'Ok', { duration: 10000 });
        this.authService.refreshUser();
    }
}
