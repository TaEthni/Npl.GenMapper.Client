import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentDto } from '@models/document.model';

@Component({
    selector: 'app-gen-mapper-documents',
    templateUrl: './gen-mapper-documents.component.html',
    styleUrls: ['./gen-mapper-documents.component.scss']
})
export class GenMapperDocumentsComponent {

    @Input()
    public document: DocumentDto;

    @Input()
    public documents: DocumentDto[];

    @Input()
    public documentId: string;

    @Output()
    public select: EventEmitter<DocumentDto> = new EventEmitter<DocumentDto>();

    public onSelectDocument(doc: DocumentDto): void {
        this.select.emit(doc);
    }
}
