import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DocumentDto } from '@shared/document.model';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'app-tool-nav-list',
    templateUrl: './tool-nav-list.component.html',
    styleUrls: ['./tool-nav-list.component.scss']
})
export class ToolNavListComponent implements OnChanges {

    public form: FormGroup;

    @Input()
    public documents: DocumentDto;

    @Output()
    public selectDocument: EventEmitter<DocumentDto> = new EventEmitter<DocumentDto>();

    constructor() { }

    public ngOnChanges(): void {

    }

    public onCreate(): void {

    }

    public onSelectDocument(doc: DocumentDto): void {
        this.selectDocument.emit(doc);
    }
}
