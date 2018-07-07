import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DocumentDto } from '@shared/document.model';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-tool-nav-list',
    templateUrl: './tool-nav-list.component.html',
    styleUrls: ['./tool-nav-list.component.scss']
})
export class ToolNavListComponent {

    public form: FormGroup;

    @Input()
    public documents: DocumentDto;

    @Input()
    public documentId: string;

    @Output()
    public select: EventEmitter<DocumentDto> = new EventEmitter<DocumentDto>();

    public onSelectDocument(doc: DocumentDto): void {
        this.select.emit(doc);
    }
}
