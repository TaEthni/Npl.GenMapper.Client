import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState, Team, TeamUiActions, TeamUpdateDto } from '@npl-data-access';

@Component({
    selector: 'app-team-detail-dialog',
    templateUrl: './team-detail-dialog.component.html',
    styleUrls: ['./team-detail-dialog.component.scss']
})
export class TeamDetailDialogComponent {

    public readonly form = new FormGroup({
        name: new FormControl(null, [Validators.required])
    });

    public isUpdating: boolean;

    constructor(
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<TeamDetailDialogComponent>,

        @Inject(MAT_DIALOG_DATA) public config: { team: Team }
    ) {
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
        this.store.dispatch(TeamUiActions.update({
            id: this.config.team.id,
            dto,
            onComplete: () => {
                this.dialogRef.close();
            }
        }));
    }

}
