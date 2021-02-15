import { Injectable } from '@angular/core';
import { DocumentDto } from '@npl-models/document.model';
import { NodeDto } from '@npl-models/node.model';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

import { JSONToCSV, TemplateJSONToCSV } from './json-to-csv';
import { TemplateService } from './template.service';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    constructor(
        private templateService: TemplateService
    ) { }

    public downloadDocument(doc: DocumentDto, nodes: NodeDto[]): void {
        const template = this.templateService.getTemplate(doc.type);
        const content = TemplateJSONToCSV(nodes, template);
        this.downloadCSV(content, doc.title);
    }

    public downloadCSV(content: string, title: string): void {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, title + '.csv');
    }

    public downloadJsonToCSV(data: any[]): void {
        const content = JSONToCSV(data);
        this.downloadCSV(content, 'COTW-EXPORT-' + moment().format())
    }
}
