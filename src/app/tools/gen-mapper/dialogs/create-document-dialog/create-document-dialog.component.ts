import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@npl-auth';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState, TeamSelectors } from '@npl-data-access';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-create-document-dialog',
    templateUrl: './create-document-dialog.component.html',
    styleUrls: ['./create-document-dialog.component.scss']
})
export class CreateDocumentDialogComponent extends Unsubscribable implements OnInit {

    public readonly teams$ = this.store.select(TeamSelectors.getEntities);
    public form: UntypedFormGroup;
    public showTeams: boolean;

    constructor(
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<CreateDocumentDialogComponent>
    ) {
        super();

        this.store.select(isAuthenticated)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(authenticated => {
                this.showTeams = authenticated;
            });
    }

    public ngOnInit(): void {
        this.form = new UntypedFormGroup({
            title: new UntypedFormControl('',
                [Validators.minLength(2), Validators.required]
            ),
            teamId: new UntypedFormControl()
        });
    }

    public onSubmit(): void {
        this.dialogRef.close(this.form.value);
    }
}
