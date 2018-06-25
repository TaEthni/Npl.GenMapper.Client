import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntityService } from '@core/entity.service';
import { DocumentDto } from '@shared/document.model';
import { EntityType } from '@shared/entity.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GMTemplate } from '../../gen-mapper/gen-mapper.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '@core/Unsubscribable';
import { Subscription } from 'rxjs';
import { TokenService } from '@core/token.service';
import { ToolService } from '../tool.service';
import { MatDialog } from '@angular/material';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { ConfirmDialogComponent } from '../../gen-mapper/dialogs/confirm-dialog/confirm-dialog.component';

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

    private formSub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _toolService: ToolService,
        private _tokenService: TokenService,
        private _matDialog: MatDialog
    ) { super(); }

    public ngOnInit(): void {
        this.template = this._route.snapshot.data.template;

        this._tokenService.get()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((token) => {
                this.isAuthenticated = token.isAuthenticated;
            });

        this._route.data
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((data) => {
                this.documents = data.tool.documents;
                this.document = data.tool.document;
                this._createForm(this.document);
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
        this._router.navigate([this.template.name, doc.id]);
    }

    public onCreateDocument(value: { content?: string, title?: string } = {}): void {
        const doc = DocumentDto.create({
            title: value.title || 'No name',
            descrciption: 'No description',
            format: this.template.format,
            content: value.content || ''
        });

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

    private _deleteDocument(): void {
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
