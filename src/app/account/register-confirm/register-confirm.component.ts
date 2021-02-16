import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '@npl-auth';
import { AppState } from '@npl-store';

@Component({
    selector: 'app-register-confirm',
    templateUrl: './register-confirm.component.html',
    styleUrls: ['./register-confirm.component.scss']
})
export class RegisterConfirmComponent {

    public constructor(
        private store: Store<AppState>
    ) { }

    public login(): void {
        this.store.dispatch(AuthActions.login());
    }
}
