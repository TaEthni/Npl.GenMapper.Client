import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@npl-shared/shared.module';
import { SortModule } from '@npl-shared/sort/sort.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { environment } from '../../../environments/environment';
import { DocumentService } from '../../core/document.service';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { CreateDocumentDialogComponent } from './dialogs/create-document-dialog/create-document-dialog.component';
import { EditDocumentDialogComponent } from './dialogs/edit-document-dialog/edit-document-dialog.component';
import { InvalidCsvDialogComponent } from './dialogs/invalid-csv-dialog/invalid-csv-dialog.component';
import { PeopleDialogComponent } from './dialogs/people-dialog/people-dialog.component';
import { CountryPickerComponent } from './dialogs/people-group-dialog/country-picker/country-picker.component';
import { PeopleGroupDialogComponent } from './dialogs/people-group-dialog/people-group-dialog.component';
import { PeopleGroupPickerComponent } from './dialogs/people-group-dialog/people-group-picker/people-group-picker.component';
import { SelectPeopleGroupDialogComponent } from './dialogs/select-people-group-dialog/select-people-group-dialog.component';
import { DocumentNameControlComponent } from './document-name-control/document-name-control.component';
import { DocumentsSidenavComponent } from './documents-sidenav/documents-sidenav.component';
import { GenMapperContainerResolver } from './gen-mapper-container.resolver';
import { GenMapperContainerComponent } from './gen-mapper-container/gen-mapper-container.component';
import { GenMapperResolver } from './gen-mapper.resolver';
import { GenMapperService } from './gen-mapper.service';
import { GenMapperComponent } from './gen-mapper/gen-mapper.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { NodeDrawerComponent } from './node-drawer/node-drawer.component';
import { NodeFormComponent } from './node-form/node-form.component';
import { ReportLegendComponent } from './report-legend/report-legend.component';
import { SavingErrorSnackbarComponent } from './snackbars/saving-error-snackbar/saving-error-snackbar.component';
import { SavingSnackbarComponent } from './snackbars/saving-snackbar/saving-snackbar.component';
import { GenMapperGraphComponent } from './views/gen-mapper-graph/gen-mapper-graph.component';
import { NoDocumentViewComponent } from './views/no-document-view/no-document-view.component';
import { GmBarChartComponent } from './views/reports-view/gm-bar-chart/gm-bar-chart.component';
import { GmPieChartComponent } from './views/reports-view/gm-pie-chart/gm-pie-chart.component';
import { GmPieGridComponent } from './views/reports-view/gm-pie-grid/gm-pie-grid.component';
import { ReportsToggleComponent } from './views/reports-view/reports-toggle/reports-toggle.component';
import { ReportsViewComponent } from './views/reports-view/reports-view.component';
import { WorldMapToggleComponent } from './views/world-map-view/world-map-toggle/world-map-toggle.component';
import { WorldMapViewComponent } from './views/world-map-view/world-map-view.component';
import { GeolocationConfirmDialog } from './dialogs/geolocation-confirm-dialog/geolocation-confirm-dialog.component';
import { LocationMapDialogComponent } from './dialogs/location-map-dialog/location-map-dialog.component';
import { OikosModule } from '../../oikos/oikos.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SortModule,
        ReactiveFormsModule,
        RouterModule,
        NgxChartsModule,
        TranslateModule,
        OikosModule,
    ],
    declarations: [
        ConfirmDialogComponent,
        NodeFormComponent,
        GenMapperGraphComponent,
        GenMapperComponent,
        GenMapperContainerComponent,
        MenuButtonComponent,
        DocumentNameControlComponent,
        DocumentsSidenavComponent,
        CreateDocumentDialogComponent,
        NodeDrawerComponent,
        PeopleGroupDialogComponent,
        CountryPickerComponent,
        PeopleGroupPickerComponent,
        WorldMapViewComponent,
        ReportLegendComponent,
        ReportsViewComponent,
        GmPieChartComponent,
        GmBarChartComponent,
        GmPieGridComponent,
        ReportsToggleComponent,
        WorldMapToggleComponent,
        InvalidCsvDialogComponent,
        SavingSnackbarComponent,
        SavingErrorSnackbarComponent,
        NoDocumentViewComponent,
        PeopleDialogComponent,
        SelectPeopleGroupDialogComponent,
        EditDocumentDialogComponent,
        GeolocationConfirmDialog,
        LocationMapDialogComponent,
    ],
    exports: [
        ConfirmDialogComponent,
        NodeFormComponent,
        GenMapperGraphComponent,
        MenuButtonComponent,
        DocumentNameControlComponent,
        DocumentsSidenavComponent,
        NodeDrawerComponent,
        CountryPickerComponent,
        PeopleGroupPickerComponent,
        WorldMapViewComponent,
        ReportLegendComponent,
        ReportsViewComponent,
        GmPieChartComponent,
        GmBarChartComponent,
        GmPieGridComponent,
        ReportsToggleComponent,
        WorldMapToggleComponent,
    ],
    providers: [DocumentService, GenMapperService, GenMapperContainerResolver, GenMapperResolver]
})
export class GenMapperModule {}
