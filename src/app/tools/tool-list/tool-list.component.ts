import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unsubscribable } from '@core/Unsubscribable';
import { takeUntil } from 'rxjs/operators';
import { EntityService } from '@core/entity.service';
import { TokenService } from '@core/token.service';
import { EntityType } from '@shared/entity.model';
import { GMTemplate } from '../../gen-mapper/gen-mapper.interface';
import { DocumentDto } from '@shared/document.model';

@Component({
    selector: 'app-tool-list',
    templateUrl: './tool-list.component.html',
    styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent extends Unsubscribable implements OnInit {

    public documents: DocumentDto[];
    public template: GMTemplate;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _entityService: EntityService
    ) { super(); }

    public ngOnInit(): void {
        this.template = this._route.snapshot.data.template;
        this._loadDocuments();
    }

    public selectDocument(doc: DocumentDto): void {
        this._router.navigate([doc.id], { relativeTo: this._route });
    }

    private _loadDocuments(): void {
        this._entityService
            .getAll<DocumentDto>(EntityType.Documents)
            .subscribe(documents => {
                this.documents = documents.filter(doc => doc.format === this.template.format);
            });
    }
}
