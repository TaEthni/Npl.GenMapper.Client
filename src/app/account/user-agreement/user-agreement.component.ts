import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribable } from '@core/Unsubscribable';
import { User } from '@shared/entity/user.model';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-user-agreement',
    templateUrl: './user-agreement.component.html',
    styleUrls: ['./user-agreement.component.scss']
})
export class UserAgreementComponent extends Unsubscribable implements OnInit {
    public user: User;
    public checkbox = new FormControl(null, [Validators.required]);

    constructor(
        private route: ActivatedRoute
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

    }
}
