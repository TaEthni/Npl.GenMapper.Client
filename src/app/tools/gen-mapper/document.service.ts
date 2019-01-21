import { Injectable } from '@angular/core';
import { EntityService } from '@core/entity.service';
import { DocumentDto } from '@shared/entity/document.model';
import { EntityType } from '@shared/entity/entity.model';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GMTemplate } from './gen-mapper.interface';
import { TemplateUtils } from './template-utils';

@Injectable()
export class DocumentService {

    constructor(
        private entityService: EntityService
    ) { }

    public getDocumentsByType(type: string): Observable<DocumentDto[]> {
        return this.entityService
            .getAll<DocumentDto>(EntityType.Documents)
            .pipe(map(docs => {
                return docs.filter(doc => doc.type === type);
            }));
    }

    public create(props: any = {}, template: GMTemplate): Observable<DocumentDto> {
        const doc = new DocumentDto({
            title: props.title || 'No name',
            type: template.format,
            content: props.content || TemplateUtils.createInitialCSV(template)
        });

        return this.entityService.create(doc);
    }

    public update(doc: DocumentDto): Observable<DocumentDto> {
        const data = cloneDeep(doc);
        delete data.createdAt;
        delete data.updatedAt;
        return this.entityService.update(data);
    }

    public remove(document: DocumentDto): Observable<DocumentDto> {
        return this.entityService.delete(document);
    }
}
