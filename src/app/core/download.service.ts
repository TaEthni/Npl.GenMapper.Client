import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { GNode } from '../tools/gen-mapper/gen-mapper.interface';
import { TemplateUtils } from '../tools/gen-mapper/template-utils';
import { EntityService } from './entity.service';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    constructor(
        private entityService: EntityService
    ) { }

    public downloadDocument(doc: { title: string, nodes: GNode[], type: string }): void {
        const content = TemplateUtils.getOutputCsv(doc.nodes, doc.type);
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, doc.title);
    }
}
