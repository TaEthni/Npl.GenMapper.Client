import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState, Member, SelfSelectors, SelfUIActions } from '@npl-data-access';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-user-agreement',
    templateUrl: './user-agreement.component.html',
    styleUrls: ['./user-agreement.component.scss']
})
export class UserAgreementComponent extends Unsubscribable implements OnInit {
    public self: Member;
    public checkbox = new UntypedFormControl(null, [Validators.required]);
    public isSaving: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>
    ) { super(); }

    public ngOnInit(): void {
        this.store.select(SelfSelectors.getSelf).pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.self = result;
            if (this.self && this.self.agreementDate) {
                this.checkbox.setValue(true);
            }
        });

        this.store.select(SelfSelectors.isUpdating).pipe(takeUntil(this.unsubscribe)).subscribe(isUpdating => {
            this.isSaving = isUpdating;
        });
    }

    public save(): void {
        this.store.dispatch(SelfUIActions.acceptAgreement());
    }
}
