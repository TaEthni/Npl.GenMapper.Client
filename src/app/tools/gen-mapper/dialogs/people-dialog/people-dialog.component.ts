import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { UnknownPeopleGroup } from '@npl-core/people-group.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { ActionType } from '@npl-models/action-type';
import { PeopleAttributes } from '@npl-models/node.model';
import { Template } from '@npl-models/template.model';
import { GMField } from '@npl-template';
import { takeUntil } from 'rxjs/operators';

export interface PeopleDialogResponse {
    people?: PeopleAttributes;
    actionType: ActionType;
}

export interface PeopleDialogConfig {
    people: PeopleAttributes;
    template: Template;
}

@Component({
    selector: 'app-people-dialog',
    templateUrl: './people-dialog.component.html',
    styleUrls: ['./people-dialog.component.scss']
})
export class PeopleDialogComponent extends Unsubscribable implements OnInit {

    public form: FormGroup;
    public fields: GMField[];
    public readonly unknownPeopleGroup = UnknownPeopleGroup;

    constructor(
        private dialogRef: MatDialogRef<PeopleDialogComponent, PeopleDialogResponse>,
        @Inject(MAT_DIALOG_DATA) public data: PeopleDialogConfig,
    ) {
        super();
        this.fields = this.data.template.getField('peoples').fields;
        this.createForm();
    }

    public ngOnInit() {
        this.form.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.fields.forEach(field => {
                if (field.validation) {
                    if (field.validation.maxFieldRef) {
                        const ref = this.form.get(field.validation.maxFieldRef).value;
                        let value = result[field.id];

                        if (ref < 0) { value = 0; }

                        else if (result[field.id] > ref) { value = ref; }

                        if (result[field.id] < 0) { value = 0 }

                        if (value !== result[field.id]) {
                            this.form.get(field.id).patchValue(value, { emitEvent: false });
                        }
                    }
                }
            });
        });
    }

    public onNumberChange(field: GMField): void {
        const value = this.form.get(field.id).value;
        if (value < 0) {
            this.form.get(field.id).patchValue(0);
        }
    }

    public sliderInput(event: MatSliderChange, field: GMField): void {
        if (field.validation) {
            if (field.validation.maxFieldRef) {
                const ref = this.form.get(field.validation.maxFieldRef).value;
                if (event.value > ref) {
                    this.form.get(field.id).patchValue(ref, { emitEvent: false });
                }
            }
        }
    }

    public createForm(): void {
        const group = {};

        this.fields.forEach((field, i) => {
            const value = this.data.people[field.id];
            if (i === 0) {
                group[field.id] = new FormControl(value, { updateOn: 'blur' });
            } else {
                group[field.id] = new FormControl(value);
            }
        });
        this.form = new FormGroup(group);
    }

    public continue(): void {
        const people = this.form.getRawValue() as PeopleAttributes;
        this.dialogRef.close({
            people,
            actionType: ActionType.Success
        });
    }

    public changePeopleGroup(): void {
        this.dialogRef.close({
            actionType: ActionType.Update,
            people: this.data.people,
        })
    }

    public cancel(): void {
        this.dialogRef.close({
            actionType: ActionType.Cancel
        });
    }

    public remove(): void {
        this.dialogRef.close({
            actionType: ActionType.Delete,
            people: this.data.people
        });
    }
}
