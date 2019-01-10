import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DocumentDto } from '@shared/entity/document.model';

@Component({
    selector: 'app-tool-nav-list',
    templateUrl: './tool-nav-list.component.html',
    styleUrls: ['./tool-nav-list.component.scss']
})
export class ToolNavListComponent implements OnInit {

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

    public ngOnInit(): void {
    }
}
