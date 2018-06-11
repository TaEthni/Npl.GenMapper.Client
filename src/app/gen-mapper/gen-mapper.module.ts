import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { ChurchCirclesComponent } from './church-circles/church-circles.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { GenMapperContainerComponent } from './gen-mapper-container/gen-mapper-container.component';
import { GenMapperGraphComponent } from './gen-mapper-graph/gen-mapper-graph.component';
import { GenMapperRoutingModule } from './gen-mapper-routing.module';
import { EditNodeDialogComponent } from './dialogs/edit-node-dialog/edit-node-dialog.component';
import { EditNodeFormComponent } from './edit-node-form/edit-node-form.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        GenMapperRoutingModule
    ],
    declarations: [
        GenMapperGraphComponent,
        GenMapperContainerComponent,
        ChurchCirclesComponent,
        ConfirmDialogComponent,
        EditNodeDialogComponent,
        EditNodeFormComponent
    ],
    exports: [
        GenMapperGraphComponent,
        ConfirmDialogComponent,
        EditNodeDialogComponent,
        EditNodeFormComponent
    ],
    entryComponents: [
        ConfirmDialogComponent,
        EditNodeDialogComponent
    ]
})
export class GenMapperModule { }
