import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadService } from '@core/download.service';
import { TokenService } from '@core/token.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@shared/entity/document.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ConfirmDialogComponent } from '../../gen-mapper/dialogs/confirm-dialog/confirm-dialog.component';
import { GMTemplate } from '../../gen-mapper/gen-mapper.interface';
import { ToolService } from '../tool.service';

@Component({
    selector: 'app-tool',
    templateUrl: './tool.component.html',
    styleUrls: ['./tool.component.scss']
})
export class ToolComponent extends Unsubscribable implements OnInit, OnDestroy {
    public files;
    public template: GMTemplate;
    public documents: DocumentDto[];
    public document: DocumentDto;
    public documentId: string;
    public form: FormGroup;
    public isAuthenticated: boolean;
    public isLoading: boolean;
    private formSub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _toolService: ToolService,
        private _tokenService: TokenService,
        private _matDialog: MatDialog,
        private _downloadService: DownloadService
    ) { super(); }

    public ngOnInit(): void {
        this.isLoading = true;
        this.template = this._route.snapshot.data.template;

        this._tokenService.get()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((token) => {
                this.isAuthenticated = token.isAuthenticated;
            });

        this._route.data
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((data) => {
                this.isLoading = false;
                this.documents = data.tool.documents;
                this.document = data.tool.document;
                this._createForm(this.document);

                const id = this._route.snapshot.params['id'];
                if (!id && this.document) {
                    this._router.navigate([this.document.id], { relativeTo: this._route, skipLocationChange: true });
                } else if (id && !this.document) {
                    this._router.navigate([this.template.name]);
                }
            });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.formSub) {
            this.formSub.unsubscribe();
        }
    }

    public onGraphChange(content: string): void {
        this.form.patchValue({ content });
        this.form.markAsTouched();
        this.form.markAsDirty();
    }

    public onSelectDocument(doc: DocumentDto): void {
        if (doc.id !== this.document.id) {
            this.isLoading = true;
            this._router.navigate([this.template.name, doc.id]);
        }
    }

    public onCreateDocument(value: { content?: string, title?: string } = {}): void {
        const doc = DocumentDto.create({
            title: value.title || 'No name',
            descrciption: 'No description',
            format: this.template.format,
            content: value.content || ''
        });

        this.isLoading = true;

        this._toolService
            .create(doc)
            .subscribe(result => {
                this._router.navigate([this.template.name, result.id]);
            });
    }

    public onImport(): void {
        this._matDialog
            .open(FileInputDialogComponent, { minWidth: '400px' })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.onCreateDocument(result);
                }
            });
    }

    public onDelete(): void {
        this._matDialog
            .open(ConfirmDialogComponent, {
                data: { title: 'Delete ' + this.document.title }
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this._deleteDocument();
                }
            });
    }

    public onExport(): void {
        this._downloadService.downloadDocument(this.form.value);
    }

    private _deleteDocument(): void {
        this.isLoading = true;
        this._toolService
            .remove(this.document)
            .subscribe(() => {
                this._router.navigate([this.template.name]);
            });
    }

    private _update(value: { title: string, content: string }): void {
        this.document.title = value.title;
        this.document.content = value.content;

        this._toolService
            .update(this.document)
            .subscribe(() => console.log('updated'));
    }

    private _createForm(model: DocumentDto): void {
        if (this.formSub) {
            this.formSub.unsubscribe();
        }

        if (!model) {
            this.form = null;
            return;
        }

        this.form = new FormGroup({
            title: new FormControl(model.title),
            content: new FormControl(model.content)
        });

        this.formSub = this.form.valueChanges.subscribe(value => {
            this._update(value);
        });
    }
}
