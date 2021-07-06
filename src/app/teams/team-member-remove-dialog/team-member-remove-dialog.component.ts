import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState, TeamMember, TeamMemberUiActions } from '@npl-data-access';

@Component({
    selector: 'app-team-member-remove-dialog',
    templateUrl: './team-member-remove-dialog.component.html',
    styleUrls: ['./team-member-remove-dialog.component.scss']
})
export class TeamMemberRemoveDialogComponent {
    public isDeleting: boolean;
    constructor(
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<TeamMemberRemoveDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public config: { member: TeamMember }
    ) { }

    public continue(): void {
        this.isDeleting = true;
        this.store.dispatch(TeamMemberUiActions.remove({
            teamId: this.config.member.teamId,
            id: this.config.member.id,
            onComplete: () => {
                this.dialogRef.close();
            }
        }));
    }
}
