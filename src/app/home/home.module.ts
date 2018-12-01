import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@shared/material/material.module';
import { SharedModule } from '@shared/shared.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LayoutUnauthenticatedComponent } from './layout-unauthenticated/layout-unauthenticated.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnverifiedEmailComponent } from './unverified-email/unverified-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordExpiredComponent } from './reset-password-expired/reset-password-expired.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        LayoutUnauthenticatedComponent,
        LoginComponent,
        LogoutComponent,
        NotFoundComponent,
        UnverifiedEmailComponent,
        ForbiddenComponent,
        NavigationComponent,
        ResetPasswordComponent,
        RecoverPasswordComponent,
        SignupComponent,
        ResetPasswordExpiredComponent,
    ],
    exports: [
        NavigationComponent
    ]
})
export class HomeModule { }
