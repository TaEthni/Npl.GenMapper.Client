import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@models/document.model';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenMapperService } from '../gen-mapper.service';


@Component({
    selector: 'app-map-name-control',
    templateUrl: './map-name-control.component.html',
    styleUrls: ['./map-name-control.component.scss']
})
export class MapNameControlComponent extends Unsubscribable implements OnInit {
    public document: DocumentDto;
    public control: FormControl;
    public subscription: Subscription;

    @Input()
    public showErrors: boolean;

    constructor(
        private genMapper: GenMapperService,
    ) { super(); }

    public ngOnInit(): void {
        this.control = new FormControl(null);

        if (this.showErrors) {
            this.control.setValidators([Validators.minLength(2), Validators.required]);
        }

        this.genMapper.getDocument()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(document => {
                this.document = document;

                if (this.document) {
                    this.control.patchValue(document.title);
                }
            });
    }

    @HostListener('keyup')
    public onKeyUp(): void {
        this.document.title = this.control.value;
        this.genMapper.updateDocument(this.document)
            .subscribe(result => { });
    }
}
