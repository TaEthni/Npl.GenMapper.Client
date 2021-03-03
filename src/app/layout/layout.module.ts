import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@npl-core/core.module';
import { SharedModule } from '@npl-shared/shared.module';

import { LayoutUnauthenticatedComponent } from './layout-unauthenticated/layout-unauthenticated.component';
import { LayoutComponent } from './layout/layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SupportDialogV1Component } from './support-dialog-v1/support-dialog-v1.component';
import { SupportDialogComponent } from './support-dialog/support-dialog.component';
import { UserAgreementNotificationComponent } from './user-agreement-notification/user-agreement-notification.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CoreModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        LayoutUnauthenticatedComponent,
        NavigationComponent,
        SupportDialogV1Component,
        UserAgreementNotificationComponent,
        SupportDialogComponent
    ],
    exports: [
        NavigationComponent,
        UserAgreementNotificationComponent
    ],
    entryComponents: [
        SupportDialogComponent,
        SupportDialogV1Component
    ]
})
export class LayoutModule { }
