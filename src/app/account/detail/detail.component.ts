import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication.service';
import { User } from '@shared/user.model';
import { EntityService } from '@core/entity.service';
import { EntityType } from '@shared/entity.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '@core/Unsubscribable';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends Unsubscribable implements OnInit {
    public user: User;

    constructor(
        private route: ActivatedRoute,
        private entityService: EntityService,
        private snackBar: MatSnackBar
    ) { super(); }

    public ngOnInit(): void {
        this.route.data.pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.user = result.user;
            });
    }

    public onSubmit(user: User): void {
        user.entityType = EntityType.Users;
        user.id = this.user.id;
        this.entityService.update(user)
            .subscribe(result => {
                this.snackBar.open('You account has been saved', 'Ok', { duration: 10000 });
            });
    }
}
