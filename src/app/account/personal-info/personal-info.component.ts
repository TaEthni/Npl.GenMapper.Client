import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AuthActions, AuthUser, getUserProfile } from '@npl-auth';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { AppState } from '@npl-data-access';
import { IdentityError, IdentityService } from '@npl-idp';
import { AlphaNumericPattern } from '@npl-shared/utils';
import { takeUntil } from 'rxjs/operators';

// import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent extends Unsubscribable implements OnInit, OnDestroy {
    public isLoading: boolean = false;
    public isSavingUserName: boolean = false;
    public isSavingEmail: boolean = false;
    public user: AuthUser;
    public readonly userName = new UntypedFormControl(null, [Validators.minLength(4), Validators.pattern(AlphaNumericPattern)]);
    public readonly email = new UntypedFormControl(null, [Validators.email]);

    public constructor(
        private identityService: IdentityService,
        // private translate: TranslateService,
        private snackBar: MatSnackBar,
        private store: Store<AppState>
    ) { super(); }

    public ngOnInit(): void {
        this.store.select(getUserProfile)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(user => {
                this.user = user;
                this.userName.reset(user.name);
                this.email.reset(user.email);
            });
    }

    public updateUserName(): void {
        if (this.userName.invalid || this.isSavingUserName) {
            return;
        }

        this.isSavingUserName = true;

        const dto = {
            userName: this.userName.value
        };

        this.identityService.changeUserName(dto).subscribe(
            success => {
                this.isSavingUserName = false;
                // const message = this.translate.instant('Message_UserNameChanged');
                // const button = this.translate.instant('Common_Ok');
                // this.snackBar.open(message, button);
                // this.authService.refreshUser();
                this.store.dispatch(AuthActions.loadUserProfile());
            },
            error => {
                this.isSavingUserName = false;
                this.handleErrors(error.error);
            }
        );
    }

    public updateEmail(): void {
        if (this.email.invalid || this.isSavingEmail) {
            return;
        }

        this.isSavingEmail = true;

        const dto = {
            email: this.email.value
        };

        this.identityService.changeEmail(dto).subscribe(
            success => {
                this.isSavingEmail = false;
                // const message = this.translate.instant('Message_EmailChanged');
                // const button = this.translate.instant('Common_Ok');
                // this.snackBar.open(message, button);
                // this.authService.refreshUser();
                this.store.dispatch(AuthActions.loadUserProfile());
            },
            error => {
                this.isSavingEmail = false;
                this.handleErrors(error.error);
            }
        );
    }

    private handleErrors(errors: IdentityError[]): void {
        errors.forEach(error => {
            switch (error.code) {
                case 'DuplicateEmail':
                    this.email.setErrors({ duplicateEmail: true });
                    break;
                case 'DuplicateUserName':
                    this.userName.setErrors({ duplicateUserName: true });
                    break;
                default:
                    break;
            }
        });
    }
}
