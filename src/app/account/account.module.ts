import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { DetailFormComponent } from './detail-form/detail-form.component';
import { DetailComponent } from './detail/detail.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [DetailComponent, DetailFormComponent, UserAgreementComponent],
    exports: [DetailFormComponent],
})
export class AccountModule { }
