import { AgmCoreModule } from '@agm/core/core.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { CreateDocumentDialogComponent } from './dialogs/create-document-dialog/create-document-dialog.component';
import { LocationDialogComponent } from './dialogs/location-dialog/location-dialog.component';
import { CountryPickerComponent } from './dialogs/people-group-dialog/country-picker/country-picker.component';
import { PeopleGroupDialogComponent } from './dialogs/people-group-dialog/people-group-dialog.component';
import { PeopleGroupPickerComponent } from './dialogs/people-group-dialog/people-group-picker/people-group-picker.component';
import { DocumentService } from './document.service';
import { EditNodeFormComponent } from './edit-node-form/edit-node-form.component';
import { GenMapperContainerResolver } from './gen-mapper-container.resolver';
import { GenMapperContainerComponent } from './gen-mapper-container/gen-mapper-container.component';
import { GenMapperDocumentsComponent } from './gen-mapper-documents/gen-mapper-documents.component';
import { GenMapperGraphComponent } from './gen-mapper-graph/gen-mapper-graph.component';
import { GenMapperMapComponent } from './gen-mapper-map/gen-mapper-map.component';
import { GenMapperResolver } from './gen-mapper.resolver';
import { GenMapperService } from './gen-mapper.service';
import { GenMapperComponent } from './gen-mapper/gen-mapper.component';
import { GmBarChartComponent } from './gm-reports/gm-bar-chart/gm-bar-chart.component';
import { GmPieChartComponent } from './gm-reports/gm-pie-chart/gm-pie-chart.component';
import { GmPieGridComponent } from './gm-reports/gm-pie-grid/gm-pie-grid.component';
import { GmReportsToggleComponent } from './gm-reports/gm-reports-toggle/gm-reports-toggle.component';
import { GmReportsComponent } from './gm-reports/gm-reports.component';
import { GmWorldMapToggleComponent } from './gm-world-map/gm-world-map-toggle/gm-world-map-toggle.component';
import { MapMenuButtonComponent } from './map-menu-button/map-menu-button.component';
import { MapNameControlComponent } from './map-name-control/map-name-control.component';
import { MapReportLegendComponent } from './map-report-legend/map-report-legend.component';
import { MapSidenavComponent } from './map-sidenav/map-sidenav.component';
import { NodeDrawerComponent } from './node-drawer/node-drawer.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCzMNmQPVY9uivoKSzoj0ACwKr-LxxcHko',
            libraries: ['places']
        })
    ],
    declarations: [
        ConfirmDialogComponent,
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
        PeopleGroupDialogComponent,
        CountryPickerComponent,
        PeopleGroupPickerComponent,
        GenMapperMapComponent,
        MapReportLegendComponent,
        GmReportsComponent,
        GmPieChartComponent,
        GmBarChartComponent,
        GmPieGridComponent,
        GmReportsToggleComponent,
        GmWorldMapToggleComponent,
    ],
    exports: [
        ConfirmDialogComponent,
        EditNodeFormComponent,
        GenMapperGraphComponent,
        GenMapperDocumentsComponent,
        MapMenuButtonComponent,
        MapNameControlComponent,
        MapSidenavComponent,
        NodeDrawerComponent,
        CountryPickerComponent,
        PeopleGroupPickerComponent,
        GenMapperMapComponent,
        MapReportLegendComponent,
        GmReportsComponent,
        GmPieChartComponent,
        GmBarChartComponent,
        GmPieGridComponent,
        GmReportsToggleComponent,
        GmWorldMapToggleComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
        CreateDocumentDialogComponent,
        LocationDialogComponent,
        PeopleGroupDialogComponent
    ],
    providers: [
        DocumentService,
        GenMapperService,
        GenMapperContainerResolver,
        GenMapperResolver,
    ]
})
export class GenMapperModule { }
