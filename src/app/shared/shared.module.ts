import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { SidenavToggleComponent } from './sidenav-toggle/sidenav-toggle.component';
import { SortByDatePipe } from './sort-by-date.pipe';
import { FileInputDialogComponent } from './file-input-dialog/file-input-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    declarations: [
        SidenavToggleComponent,
        SortByDatePipe,
        FileInputDialogComponent
    ],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        SidenavToggleComponent,
        SortByDatePipe,
        FileInputDialogComponent
    ],
    entryComponents: [
        FileInputDialogComponent
    ]
})
export class SharedModule { }
