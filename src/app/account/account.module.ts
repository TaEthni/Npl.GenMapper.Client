import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
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
        SharedModule,
        TranslateModule,
    ]
})
export class AccountModule { }
