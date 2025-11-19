import { Component, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState, Team, TeamUiActions, TeamUpdateDto } from '@npl-data-access';
import uuid from 'uuid/v4';

@Component({
    selector: 'app-team-detail-dialog',
    templateUrl: './team-detail-dialog.component.html',
    styleUrls: ['./team-detail-dialog.component.scss']
})
export class TeamDetailDialogComponent {

    public readonly form = new UntypedFormGroup({
        name: new UntypedFormControl(null, [Validators.required]),
        clearIShareApiKey: new UntypedFormControl(false),
        iShareApiKey: new UntypedFormControl(null)
    });

    public isUpdating: boolean;
    public hasIShareApiKey: boolean;
    public iShareApiKeyInputVisible: boolean;
    public keyName = uuid();

    constructor(
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<TeamDetailDialogComponent>,

        @Inject(MAT_DIALOG_DATA) public config: { team: Team }
    ) {
        this.hasIShareApiKey = config.team.hasIShareApiKey;
        this.form.patchValue(config.team);
    }

    public update(): void {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.isUpdating) {
            return;
        }

        this.isUpdating = true;
        const dto: TeamUpdateDto = this.form.value;

        if (!this.hasIShareApiKey && this.iShareApiKeyInputVisible && dto.iShareApiKey) {
            dto.clearIShareApiKey = false;
        }

        this.store.dispatch(TeamUiActions.update({
            id: this.config.team.id,
            dto,
            onComplete: () => {
                this.dialogRef.close();
            }
        }));
    }

    public showIShareKeyInput(): void {
        this.iShareApiKeyInputVisible = true;
    }

    public removeApiKey(): void {
        this.form.patchValue({ clearIShareApiKey: true });
        this.hasIShareApiKey = false;
    }
}
