import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    constructor() { }

    public downloadDocument(doc: { title: string, content: string }): void {
        const blob = new Blob([doc.content], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, doc.title);
    }
}
