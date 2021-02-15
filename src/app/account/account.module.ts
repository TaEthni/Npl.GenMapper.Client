import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@npl-shared/shared.module';

import { DataExportDialogComponent } from './data-export-dialog/data-export-dialog.component';
import { DataExportDownloadComponent } from './data-export-download/data-export-download.component';
import { DataExportPendingComponent } from './data-export-pending/data-export-pending.component';
import { DataExportUnauthorizedComponent } from './data-export-unauthorized/data-export-unauthorized.component';
import { DataExportComponent } from './data-export/data-export.component';
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
    declarations: [
        DetailComponent,
        DetailFormComponent,
        UserAgreementComponent,
        DataExportComponent,
        DataExportDialogComponent,
        DataExportDownloadComponent,
        DataExportPendingComponent,
        DataExportUnauthorizedComponent
    ],
    entryComponents: [DataExportDialogComponent],
    exports: [DetailFormComponent],
})
export class AccountModule { }
