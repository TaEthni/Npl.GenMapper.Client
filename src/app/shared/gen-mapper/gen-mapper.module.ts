import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { EditNodeDialogComponent } from './dialogs/edit-node-dialog/edit-node-dialog.component';
import { EditNodeFormComponent } from './edit-node-form/edit-node-form.component';
import { SharedModule } from '@shared/shared.module';
import { GenMapperGraphComponent } from './gen-mapper-graph/gen-mapper-graph.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        ConfirmDialogComponent,
        EditNodeDialogComponent,
        EditNodeFormComponent,
        GenMapperGraphComponent
    ],
    exports: [
        ConfirmDialogComponent,
        EditNodeDialogComponent,
        EditNodeFormComponent,
        GenMapperGraphComponent
    ],
    entryComponents: [
        ConfirmDialogComponent,
        EditNodeDialogComponent
    ]
})
export class GenMapperModule { }
