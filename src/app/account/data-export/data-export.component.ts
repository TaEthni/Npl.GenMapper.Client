import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { DocumentService } from '@core/document.service';
import { DownloadService } from '@core/download.service';
import { EntityService } from '@core/entity.service';
import { TemplateService } from '@core/template.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@models/document.model';
import { Template } from '@models/template.model';
import { map, takeUntil } from 'rxjs/operators';
import { DataExportDialogComponent } from '../data-export-dialog/data-export-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-data-export',
    templateUrl: './data-export.component.html',
    styleUrls: ['./data-export.component.scss']
})
export class DataExportComponent extends Unsubscribable implements OnInit {

    public displayedColumns: string[] = ['select', 'title', 'type', 'updatedAt', 'actions'];
    public dataSource = new MatTableDataSource<DocumentDto>();
    public selection = new SelectionModel<DocumentDto>(true, []);
    public templateNames: { [id: string]: string } = {};
    public templates: Template[];
    public textFilter = new FormControl();
    public typeFilter = new FormControl();
    public isLoading: boolean;
    public timeoutError: boolean;

    private docs: DocumentDto[];

    @ViewChild(MatPaginator, { static: false })
    public set matPaginator(paginator: MatPaginator) {
        this.dataSource.paginator = paginator;
    }

    @ViewChild(MatSort, { static: false })
    public set matSort(sort: MatSort) {
        this.dataSource.sort = sort;
    }

    constructor(
        private documentService: DocumentService,
        private downloadService: DownloadService,
        private entityService: EntityService,
        private templateService: TemplateService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router,
    ) { super(); }

    public ngOnInit(): void {
        this.templates = this.templateService.getTemplates().filter(t => !!t.getField('latitude') && !!t.getField('longitude'));
        this.templates.forEach(template => this.templateNames[template.id] = template.name);

        this.documentService.getAll()
            .pipe(map(docs => docs.filter(d => !!this.templateNames[d.type])))
            .subscribe(docs => {
                this.docs = docs;
                this.dataSource.data = docs;
            });

        this.textFilter.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(text => {
            this.dataSource.filter = text ? text.toLowerCase() : null;
        });

        this.typeFilter.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            if (!result || result.length === 0) {
                this.dataSource.data = this.docs;
            } else {
                this.dataSource.data = this.docs.filter(d => result.indexOf(d.type) > -1);
            }

            this.dataSource.paginator.firstPage();
        });
    }

    /** Whether the number of selected elements matches the total number of rows. */
    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    public masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    public checkboxLabel(row?: DocumentDto): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.title + 1}`;
    }

    public clearField(event: Event, control: FormControl): void {
        event.preventDefault();
        event.stopPropagation();
        control.setValue(null);
    }

    public export(): void {
        this.dialog
            .open(DataExportDialogComponent, {
                data: this.selection.selected
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getExportData(result);
                }
            });
    }

    private getExportData(request: { adminLevel: string }): void {
        this.isLoading = true;

        const payload = {
            adminLevel: request.adminLevel,
            documentIds: this.selection.selected.map(d => d.id)
        };

        this.entityService.customPost<any[]>('export/cotw', payload)
            .subscribe(
                result => {
                    this.isLoading = false;

                    if (result.length) {
                        this.downloadService.downloadJsonToCSV(result);
                    } else {
                        this.snackBar.open('No valid location data found from the selected documents', 'Ok', { duration: 10000 });
                    }
                },
                error => {
                    this.isLoading = false;
                    if (error.error.errorCode === 40106) {
                        this.router.navigate(['/account', 'data-export-unauthorized']);
                    } else {
                        this.router.navigate(['/account', 'data-export-pending']);
                    }
                }
            );
    }
}
