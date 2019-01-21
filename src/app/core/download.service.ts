import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { EntityService } from './entity.service';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    constructor(
        private entityService: EntityService
    ) { }

    public downloadDocument(doc: { title: string, content: string }): void {
        const blob = new Blob([doc.content], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, doc.title);
    }
}
