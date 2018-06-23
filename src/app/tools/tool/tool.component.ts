import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntityService } from '@core/entity.service';
import { DocumentDto } from '@shared/document.model';
import { EntityType } from '@shared/entity.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GMTemplate } from '../../gen-mapper/gen-mapper.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Unsubscribable } from '@core/Unsubscribable';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-tool',
    templateUrl: './tool.component.html',
    styleUrls: ['./tool.component.scss']
})
export class ToolComponent extends Unsubscribable implements OnInit, OnDestroy {

    public template: GMTemplate;
    public documents: DocumentDto[];
    public document: DocumentDto;
    public documentId: string;
    public form: FormGroup;

    private formSub: Subject<any> = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _entitySerivce: EntityService
    ) { super(); }

    public ngOnInit(): void {
        this.template = this._route.snapshot.data.template;
        this._route.params
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((params) => {
                this.documentId = params.id;
                if (params.id) {
                    this._load();
                } else {
                    this._loadDefault();
                }
            });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.formSub.next();
        this.formSub.complete();
    }

    public back(): void {
        this._router.navigate([this.template.name]);
    }

    public onGraphChange(content: string): void {
        this.form.patchValue({ content });
        this.form.markAsTouched();
        this.form.markAsDirty();
    }

    public onSelectDocument(doc: DocumentDto): void {
        this._router.navigate([this.template.name, doc.id]);
    }

    private _loadDefault(): void {
        this.document = new DocumentDto();
        this._createForm(this.document);
    }

    private _load(): void {
        this._entitySerivce
            .getAll<DocumentDto>(EntityType.Documents)
            .subscribe(documents => {
                this.documents = documents.filter(d => d.format === this.template.format);
                this.document = this.documents.find(d => '' + d.id === this.documentId);
                this._createForm(this.document);
            });
    }

    private _update(value: { title: string, content: string }): void {
        this.document.title = value.title;
        this.document.content = value.content;

        this._entitySerivce
            .update(this.document)
            .subscribe(() => {
                console.log('updated');
            });
    }

    private _createForm(model: DocumentDto): void {
        this.formSub.next();

        this.form = new FormGroup({
            title: new FormControl(model.title),
            content: new FormControl(model.content)
        });

        this.form.valueChanges
            .pipe(takeUntil(this.formSub))
            .subscribe(value => {
                this._update(value);
            });
    }
}
