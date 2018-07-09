import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GMField } from '../gen-mapper.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Unsubscribable } from '@core/Unsubscribable';
import { takeUntil } from 'rxjs/operators';

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

    @Output()
    public change: EventEmitter<any> = new EventEmitter<any>(null);

    constructor() { super(); }

    public ngOnInit(): void {
        this.form = this._createForm();
        this.form.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((value) => {
                this.change.emit(value);
            });
    }

    private _createForm(): FormGroup {
        const group = {};

        this.fields
            .filter(field => !!field.type)
            .forEach(field => {
                group[field.header] = new FormControl(this.model[field.header]);
            });

        return new FormGroup(group);
    }
}
