import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@npl-core/core.module';
import { SharedModule } from '@npl-shared/shared.module';

import { AcceptInviteComponent } from './accept-invite/accept-invite.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ResetPasswordExpiredComponent } from './reset-password-expired/reset-password-expired.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { UnverifiedEmailComponent } from './unverified-email/unverified-email.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        CoreModule,
        SharedModule,
        TranslateModule
    ],
    declarations: [
        LoginComponent,
        LogoutComponent,
        NotFoundComponent,
        UnverifiedEmailComponent,
        ForbiddenComponent,
        ResetPasswordComponent,
        RecoverPasswordComponent,
        SignupComponent,
        ResetPasswordExpiredComponent,
        ConfirmEmailComponent,
        MaintenanceComponent,
        AcceptInviteComponent,
    ],
    exports: [
    ]
})
export class HomeModule { }
