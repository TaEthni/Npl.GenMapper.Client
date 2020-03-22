import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material';
import { Unsubscribable } from '@core/Unsubscribable';
import { GMFieldSelection, GMFieldSelectionValueSelection } from '@templates';
import { startWith, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-people-group-selection',
    templateUrl: './people-group-selection.component.html',
    styleUrls: ['./people-group-selection.component.scss']
})
export class PeopleGroupSelectionComponent extends Unsubscribable implements OnInit {

    @Input()
    public fieldSelection: GMFieldSelection;

    @Input()
    public formArray: FormArray;

    @Input()
    public maxValue: number;

    @Input()
    public countryName: string;

    private lastTouchedControl: FormGroup;

    constructor() { super(); }

    public selectionValue: number = 0;

    public ngOnInit() {
        this.formArray.valueChanges.pipe(
            startWith(this.formArray.value),
            takeUntil(this.unsubscribe)
        ).subscribe(options => {
            this.selectionValue = this.collectValue(options);

            if (this.selectionValue > this.maxValue) {
                this.reduceUntilEqual(this.lastTouchedControl);
            }
        });
    }

    public onSliderInput(e: MatSliderChange, control: FormGroup): void {
        this.lastTouchedControl = control;
        let selectionValue = e.value;
        this.reduceFromControl(control, selectionValue);
    }

    public deletePg(control: FormGroup): void {
        const index = this.formArray.controls.indexOf(control);
        this.formArray.removeAt(index);
    }

    private reduceFromControl(control: FormGroup, selectionValue: number = null): void {
        if (selectionValue === null) {
            selectionValue = control.get('value').get(this.fieldSelection.id).value;
        }

        const controls = this.formArray.controls.filter(c => c !== control);

        controls.forEach(c => {
            if (c !== control) {
                selectionValue += c.get('value').get(this.fieldSelection.id).value;
            }
        });

        if (selectionValue > this.maxValue) {
            controls.forEach(c => {
                if (c !== control) {
                    const v = c.get('value').get(this.fieldSelection.id).value;
                    if (v) {
                        c.get('value').get(this.fieldSelection.id).setValue(v - 1, { emitEvent: false });
                    }
                }
            });
        }
    }

    private reduceUntilEqual(control: FormGroup): void {
        const fieldSelectionId = this.fieldSelection.id;

        this.formArray.controls.forEach(c => {
            if (c !== control) {
                const cc = c.get('value').get(fieldSelectionId);
                if (cc.value) {
                    cc.patchValue(cc.value - 1, { emitEvent: false });
                }
            }
        });

        this.selectionValue = this.collectValue(this.formArray.value);

        if (this.selectionValue > this.maxValue) {
            this.reduceUntilEqual(control);
        }
    }

    private collectValue(options: GMFieldSelectionValueSelection[]): number {
        let value: number = 0;
        options.forEach(o => {
            const number = o.value[this.fieldSelection.id];
            value += number;
        });
        return value;
    }
}
