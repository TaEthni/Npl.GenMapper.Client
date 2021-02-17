import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@npl-auth';
import { LocaleService } from '@npl-core/locale.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { DocumentDto } from '@npl-models/document.model';
import { Template } from '@npl-models/template.model';
import { AppState } from '@npl-store';
import { takeUntil } from 'rxjs/operators';

import { GenMapperView } from '../gen-mapper-view.enum';
import { GenMapperService } from '../gen-mapper.service';
import { NodeClipboardService } from '../node-clipboard.service';

@Component({
    selector: 'app-gen-mapper-container',
    templateUrl: './gen-mapper-container.component.html',
    styleUrls: ['./gen-mapper-container.component.scss'],
    providers: []
})
export class GenMapperContainerComponent extends Unsubscribable implements OnInit, OnDestroy {
    public documents: DocumentDto[];
    public document: DocumentDto;
    public template: Template;
    public isAuthenticated: boolean;
    public view: GenMapperView;
    public viewType = GenMapperView;
    public isLoading: boolean;

    constructor(
        private genMapper: GenMapperService,
        private store: Store<AppState>,
        private nodeClipboard: NodeClipboardService,
        private localeService: LocaleService,
    ) { super(); }

    public ngOnInit(): void {
        this.store.select(isAuthenticated)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(authenticated => {
                this.isAuthenticated = authenticated;
            });

        this.genMapper.selectedDocument$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(document => {
                this.document = document;
            });

        this.genMapper.template$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(template => {
                this.template = template;
            });

        this.genMapper.documents$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(documents => {
                this.documents = documents;
            });

        let firstCall = false;
        this.localeService.get()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((result) => {
                if (firstCall) {
                    window.location.reload();
                } else {
                    firstCall = true;
                }
            });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.genMapper.setDocument(null);
        this.nodeClipboard.set(null);
    }
}
