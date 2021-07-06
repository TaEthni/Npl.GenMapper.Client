import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@npl-auth';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState, DocumentDto, TeamSelectors } from '@npl-data-access';
import { takeUntil } from 'rxjs/operators';

import { GenMapperService } from '../../gen-mapper.service';

@Component({
    selector: 'app-edit-document-dialog',
    templateUrl: './edit-document-dialog.component.html',
    styleUrls: ['./edit-document-dialog.component.scss']
})
export class EditDocumentDialogComponent extends Unsubscribable {

    public readonly teams$ = this.store.select(TeamSelectors.getEntities);
    public form: FormGroup;
    public isUpdating: boolean;
    public showTeams: boolean;

    constructor(
        private genMapper: GenMapperService,
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<EditDocumentDialogComponent>,

        @Inject(MAT_DIALOG_DATA) private data: { document: DocumentDto }
    ) {
        super();

        this.store.select(isAuthenticated)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(authenticated => {
                this.showTeams = authenticated;
            });

        this.form = new FormGroup({
            title: new FormControl(this.data.document.title,
                [Validators.minLength(2), Validators.required]
            ),
            teamId: new FormControl(this.data.document.teamId)
        });
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.isUpdating) {
            return;
        }

        this.isUpdating = true;
        const value = this.form.value;
        this.data.document.title = value.title;
        this.data.document.teamId = value.teamId;
        this.genMapper.updateDocument(this.data.document).subscribe(result => {
            this.isUpdating = false;
            this.dialogRef.close(this.form.value);
        });
    }
}
