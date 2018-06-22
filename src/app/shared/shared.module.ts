import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { DocumentsDialogComponent } from './documents-dialog/documents-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations: [DocumentsDialogComponent],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        DocumentsDialogComponent
    ],
    entryComponents: [
        DocumentsDialogComponent,
    ]
})
export class SharedModule { }
