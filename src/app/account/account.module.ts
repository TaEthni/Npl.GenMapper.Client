import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard, InternalOnlyGuard } from '@npl-auth';
import { SharedModule } from '@npl-shared/shared.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AccountLandingComponent } from './account-landing/account-landing.component';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { PasswordRequirementsComponent } from './password-requirements/password-requirements.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';
import { RegisterComponent } from './register/register.component';
import { SecurityComponent } from './security/security.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';

// import { TranslateModule } from '@ngx-translate/core';
// import { FiltersModule, MaterialModule, SelectFilterModule } from '@taethni/shared/ui';
const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'register-confirm',
        component: RegisterConfirmComponent
    },
    {
        path: '',
        canActivate: [AuthorizationGuard],
        component: AccountLayoutComponent,
        children: [
            {
                path: 'home',
                component: AccountLandingComponent
            },
            {
                path: 'security',
                canActivate: [InternalOnlyGuard],
                component: SecurityComponent
            },
            {
                path: 'personal-info',
                canActivate: [InternalOnlyGuard],
                component: PersonalInfoComponent
            },
            {
                path: 'user-agreement',
                component: UserAgreementComponent
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    declarations: [
        AccountLayoutComponent,
        AccountLandingComponent,
        RegisterComponent,
        RegisterConfirmComponent,
        PersonalInfoComponent,
        SecurityComponent,
        PasswordRequirementsComponent,
        ChangePasswordFormComponent,
        UserAgreementComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        // TranslateModule,
        // SelectFilterModule,
        // FiltersModule,
        NgxQRCodeModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatDialogModule,
        MatMenuModule,
        SharedModule
    ]
})
export class AccountModule { }
