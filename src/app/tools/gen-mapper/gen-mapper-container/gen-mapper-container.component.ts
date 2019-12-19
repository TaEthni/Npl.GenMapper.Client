import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/authentication.service';
import { LocaleService } from '@core/locale.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@shared/entity/document.model';
import { takeUntil } from 'rxjs/operators';
import { GenMapperView } from '../gen-mapper-view.enum';
import { GNode } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';
import { NodeClipboardService } from '../node-clipboard.service';
import { Template } from '../template.model';

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
    public node: GNode;
    public view: GenMapperView;
    public viewType = GenMapperView;

    constructor(
        private genMapper: GenMapperService,
        private authService: AuthenticationService,
        private nodeClipboard: NodeClipboardService,
        private localeService: LocaleService,
    ) { super(); }

    public ngOnInit(): void {
        this.isAuthenticated = this.authService.isAuthenticated();

        this.genMapper.getDocument()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(document => {
                this.document = document;
            });

        this.genMapper.getConfig()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(config => {
                this.template = config.template;
                this.documents = config.documents;
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

    public reloadGenMapper(): void {
        const doc = this.document;
        this.genMapper.load(this.template).subscribe(result => {
            const newDoc = result.find(d => d.id === doc.id);
            this.genMapper.setDocument(newDoc);
        });
    }
}
