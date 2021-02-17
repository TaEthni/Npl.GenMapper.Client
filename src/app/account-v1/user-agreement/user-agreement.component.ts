import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@npl-core/authentication.service';
import { EntityService } from '@npl-core/entity.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { EntityType, User } from '@npl-data-access';
import { cloneDeep } from 'lodash';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-user-agreement',
    templateUrl: './user-agreement.component.html',
    styleUrls: ['./user-agreement.component.scss']
})
export class UserAgreementComponent extends Unsubscribable implements OnInit {
    public user: User;
    public checkbox = new FormControl(null, [Validators.required]);
    public isSaving: boolean;

    constructor(
        private route: ActivatedRoute,
        private entityService: EntityService,
        private router: Router,
        private authService: AuthenticationService,
    ) { super(); }

    public ngOnInit(): void {
        this.route.data.pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.user = result.user;
                if (this.user.agreementDate) {
                    this.checkbox.setValue(true);
                }
            });
    }

    public save(): void {
        const update = cloneDeep(this.user);
        update.entityType = EntityType.Users;
        update.agreementDate = new Date();
        delete update.status;
        delete update.role;

        this.entityService.update(update)
            .subscribe(
                success => {
                    this.authService.refreshUser();
                    this.isSaving = false;
                    this.router.navigate(['/']);
                },
                error => {
                    this.isSaving = false;
                    this.router.navigate(['/']);
                }
            );
    }
}
