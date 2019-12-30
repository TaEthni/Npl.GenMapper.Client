import { Injectable } from '@angular/core';
import { DocumentDto } from '@shared/entity/document.model';
import { saveAs } from 'file-saver';
import { TemplateUtils } from '../tools/gen-mapper/template-utils';
import { TemplateService } from '../tools/gen-mapper/template.service';
import { JSONToCSV } from '../tools/gen-mapper/resources/json-to-csv';


@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    constructor(
        private templateService: TemplateService
    ) { }

    public downloadDocument(doc: DocumentDto): void {
        const template = this.templateService.getTemplate(doc.type);
        const content = JSONToCSV(doc.nodes, template);
        this.downloadCSV(content, doc.title);
    }

    public downloadCSV(content: string, title: string): void {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, title + '.csv');
    }
}
