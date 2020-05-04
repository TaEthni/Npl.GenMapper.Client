import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { LayoutUnauthenticatedComponent } from './layout-unauthenticated/layout-unauthenticated.component';
import { LayoutComponent } from './layout/layout.component';
import { NavigationComponent } from './navigation/navigation.component';
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
        SupportDialogComponent,
        UserAgreementNotificationComponent
    ],
    exports: [
        NavigationComponent,
        UserAgreementNotificationComponent
    ],
    entryComponents: [
        SupportDialogComponent
    ]
})
export class LayoutModule { }
