import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { EntityService } from './entity.service';
import { DocumentDto } from '@shared/entity/document.model';
import { TemplateUtils } from '../tools/gen-mapper/template-utils';
import { TemplateService } from '../tools/gen-mapper/template.service';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    constructor(
        private entityService: EntityService,
        private templateService: TemplateService
    ) { }

    public downloadDocument(doc: DocumentDto): void {
        const template = this.templateService.getTemplate(doc.type);
        const content = TemplateUtils.getOutputCsv(doc.nodes, template);
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, doc.title + '.csv');
    }
}
