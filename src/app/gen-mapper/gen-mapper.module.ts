import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material/material.module';
import { ChurchCirclesComponent } from './church-circles/church-circles.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { GenMapperContainerComponent } from './gen-mapper-container/gen-mapper-container.component';
import { GenMapperGraphComponent } from './gen-mapper-graph/gen-mapper-graph.component';
import { GenMapperRoutingModule } from './gen-mapper-routing.module';

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
        ConfirmDialogComponent
    ],
    exports: [
        GenMapperGraphComponent,
        ConfirmDialogComponent
    ],
    entryComponents: [
        ConfirmDialogComponent,
    ]
})
export class GenMapperModule { }
