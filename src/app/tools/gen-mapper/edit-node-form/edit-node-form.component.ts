import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Unsubscribable } from '@core/Unsubscribable';
import { takeUntil } from 'rxjs/operators';

import { GMField } from '../gen-mapper.interface';

@Component({
    selector: 'app-edit-node-form',
    templateUrl: './edit-node-form.component.html',
    styleUrls: ['./edit-node-form.component.scss']
})
export class EditNodeFormComponent extends Unsubscribable implements OnInit {
    public form: FormGroup;

    @Input()
    public model: any;

    @Input()
    public fields: GMField[];

    @Input()
    public nodes: any[];

    @Output()
    public change: EventEmitter<any> = new EventEmitter<any>(null);

    constructor() { super(); }

    public ngOnInit(): void {
        this.form = this._createForm();

        if (this.form.get('generation')) {
            this.form.get('generation').valueChanges
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(result => {
                    if (result < 0) {
                        this.form.get('generation').patchValue(0);
                    }
                });
        }

        this.form.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((value) => {
                this.change.emit(value);
            });
    }

    private _createForm(): FormGroup {
        const group: any = {};

        this.fields
            .filter(field => !!field.type)
            .forEach(field => {
                group[field.header] = new FormControl(this.model[field.header]);
            });

        // Add custom control for parentId
        group.parentId = new FormControl(this.model.parentId);

        return new FormGroup(group);
    }
}