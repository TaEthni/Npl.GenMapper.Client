import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { DocumentDto } from '@npl-data-access';
import { Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { GenMapperService } from '../gen-mapper.service';


@Component({
    selector: 'app-document-name-control',
    templateUrl: './document-name-control.component.html',
    styleUrls: ['./document-name-control.component.scss']
})
export class DocumentNameControlComponent extends Unsubscribable implements OnInit {
    public document: DocumentDto;
    public control: UntypedFormControl;
    public subscription: Subscription;

    @Input()
    public showErrors: boolean;

    constructor(
        private genMapper: GenMapperService,
    ) { super(); }

    public ngOnInit(): void {
        this.control = new UntypedFormControl(null);

        if (this.showErrors) {
            this.control.setValidators([Validators.minLength(2), Validators.required]);
        }

        this.genMapper.selectedDocument$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(document => {
                this.document = document;

                if (this.document) {
                    this.control.patchValue(document.title, { emitEvent: false });
                }
            });

        this.control.valueChanges
            .pipe(
                debounceTime(300),
                takeUntil(this.unsubscribe)
            )
            .subscribe(result => {
                this.document.title = result;
                this.genMapper.updateDocument(this.document)
                    .subscribe(result => { });
            });
    }

    @HostListener('keyup')
    public onKeyUp(): void {
    }
}
