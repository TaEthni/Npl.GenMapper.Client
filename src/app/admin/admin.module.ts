import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { AdminContainerComponent } from './admin-container/admin-container.component';
import { EditUserDialogComponent } from './dialogs/edit-user-dialog/edit-user-dialog.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [
        AdminContainerComponent,
        UserListComponent,
        EditUserDialogComponent
    ],
    exports: [],
    entryComponents: [
        EditUserDialogComponent
    ]
})
export class AdminModule { }
