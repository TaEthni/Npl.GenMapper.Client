import { AgmCoreModule } from '@agm/core/core.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { CreateDocumentDialogComponent } from './dialogs/create-document-dialog/create-document-dialog.component';
import { EditNodeDialogComponent } from './dialogs/edit-node-dialog/edit-node-dialog.component';
import { LocationDialogComponent } from './dialogs/location-dialog/location-dialog.component';
import { DocumentService } from './document.service';
import { EditNodeFormComponent } from './edit-node-form/edit-node-form.component';
import { GenMapperContainerResolver } from './gen-mapper-container.resolver';
import { GenMapperContainerComponent } from './gen-mapper-container/gen-mapper-container.component';
import { GenMapperDocumentsComponent } from './gen-mapper-documents/gen-mapper-documents.component';
import { GenMapperGraphComponent } from './gen-mapper-graph/gen-mapper-graph.component';
import { GenMapperMapComponent } from './gen-mapper-map/gen-mapper-map.component';
import { GenMapperViewTabsComponent } from './gen-mapper-view-tabs/gen-mapper-view-tabs.component';
import { GenMapperResolver } from './gen-mapper.resolver';
import { GenMapperService } from './gen-mapper.service';
import { GenMapperComponent } from './gen-mapper/gen-mapper.component';
import { MapMenuButtonComponent } from './map-menu-button/map-menu-button.component';
import { MapNameControlComponent } from './map-name-control/map-name-control.component';
import { MapSidenavComponent } from './map-sidenav/map-sidenav.component';
import { NodeDrawerComponent } from './node-drawer/node-drawer.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
            libraries: ['places']
        })
    ],
    declarations: [
        ConfirmDialogComponent,
        EditNodeDialogComponent,
        EditNodeFormComponent,
        GenMapperGraphComponent,
        GenMapperDocumentsComponent,
        GenMapperComponent,
        GenMapperContainerComponent,
        MapMenuButtonComponent,
        MapNameControlComponent,
        MapSidenavComponent,
        CreateDocumentDialogComponent,
        LocationDialogComponent,
        NodeDrawerComponent,
        GenMapperMapComponent,
        GenMapperViewTabsComponent,
    ],
    exports: [
        ConfirmDialogComponent,
        EditNodeDialogComponent,
        EditNodeFormComponent,
        GenMapperGraphComponent,
        GenMapperDocumentsComponent,
        MapMenuButtonComponent,
        MapNameControlComponent,
        MapSidenavComponent,
        NodeDrawerComponent,
        GenMapperMapComponent,
        GenMapperViewTabsComponent
    ],
    entryComponents: [
        ConfirmDialogComponent,
        EditNodeDialogComponent,
        CreateDocumentDialogComponent,
        LocationDialogComponent
    ],
    providers: [
        DocumentService,
        GenMapperService,
        GenMapperContainerResolver,
        GenMapperResolver,
    ]
})
export class GenMapperModule { }
