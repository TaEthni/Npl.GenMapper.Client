import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatLegacyChipInputEvent as MatChipInputEvent } from '@angular/material/legacy-chips';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState, InvitesCreateDto, InviteSelectors, InviteUiActions, Team } from '@npl-data-access';
import { take, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-team-invites-create-dialog',
    templateUrl: './team-invites-create-dialog.component.html',
    styleUrls: ['./team-invites-create-dialog.component.scss']
})
export class TeamInvitesCreateDialogComponent extends Unsubscribable {

    public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    public readonly emailControl = new UntypedFormControl(null, [Validators.email]);

    public get errorState(): boolean {
        return this.emailControl.invalid && this.emailControl.touched && this.emailControl.dirty && !this.emailControl.pristine;
    }

    public isSending: boolean;
    public emails: string[] = [];
    public team: Team;

    public showCreateResponse: boolean;
    public unsentInvites: string[];
    public sentInvites: string[];

    public constructor(
        @Inject(MAT_DIALOG_DATA) private config: { team: Team },
        private dialogRef: MatDialogRef<TeamInvitesCreateDialogComponent>,
        private store: Store<AppState>
    ) {
        super();
        this.dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
            this.store.dispatch(InviteUiActions.clearInviteSendingState());
        });

        this.store.select(InviteSelectors.getInvitesSendingState).pipe(takeUntil(this.unsubscribe)).subscribe(state => {
            if (this.isSending && !state.isCreating && !state.error) {
                this.dialogRef.close(true);
            }
            this.isSending = state.isCreating;

            this.unsentInvites = state.unsentInvites;
            this.sentInvites = state.sentInvites ? state.sentInvites.map(x => x.email) : null;
            if (state.error && state.unsentInvites && state.unsentInvites.length > 0) {
                this.showCreateResponse = true;
            }
        });
    }

    public send(): void {
        if (!this.emails.length) {
            this.emailControl.setErrors({ required: true });
            this.emailControl.markAsTouched();
            return;
        }

        console.log(this.config.team)
        const dto: InvitesCreateDto = {
            emails: this.emails,
            teamId: this.config.team.id
        };

        if (this.team) {
            dto.teamId = this.config.team.id;
        }

        this.store.dispatch(InviteUiActions.sendInvites({ dto }));
    }

    public add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = (event.value || '').trim();

        if (this.emailControl.invalid) {
            this.emailControl.markAsTouched();
            return;
        }

        if (value) {
            this.emails.push(value);
        }

        if (input) {
            input.value = '';
        }
    }

    public remove(email: string): void {
        const index = this.emails.indexOf(email);

        if (index >= 0) {
            this.emails.splice(index, 1);
        }
    }

}
