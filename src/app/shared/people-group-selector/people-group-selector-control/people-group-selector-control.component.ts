import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Unsubscribable } from '@core/Unsubscribable';
import { Template } from '@models/template.model';
import { GMField } from '@templates';
import { startWith, takeUntil } from 'rxjs/operators';
import { CreatePeopleGroupSelectionForm } from '../form';
import { PeopleGroupSelectorDialogComponent } from '../people-group-selector-dialog/people-group-selector-dialog.component';

@Component({
    selector: 'app-people-group-selector-control',
    templateUrl: './people-group-selector-control.component.html',
    styleUrls: ['./people-group-selector-control.component.scss']
})
export class PeopleGroupSelectorControlComponent extends Unsubscribable implements OnInit {

    @Input()
    public template: Template;

    @Input()
    public country: string;

    @Input()
    public group: FormGroup;

    @Input()
    public form: FormGroup;

    @Input()
    public label: string;

    public namesControl = new FormControl();

    constructor(
        private dialog: MatDialog
    ) { super(); }

    public ngOnInit() {
        this.group.valueChanges.pipe(
            startWith(this.group.value),
            takeUntil(this.unsubscribe)
        ).subscribe(result => {
            if (result.hasOwnProperty('peopleGroupsV2') && result.peopleGroupsV2) {
                const names = result.peopleGroupsV2.selection.map(s => s.name).join(', ');
                this.namesControl.patchValue(names);
            }
        });
    }

    public formFieldClick(event: Event): void {
        event.preventDefault();

        console.log(this.group.value);

        this.dialog
            .open(PeopleGroupSelectorDialogComponent, {
                data: {
                    country: this.country,
                    value: this.group.value,
                    template: this.template,
                    maxValues: this.collectMaxValues()
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.group.setControl('selection', CreatePeopleGroupSelectionForm(result, this.template).get('selection') as FormArray);
                    this.group.markAsDirty();
                }
            });
    }

    public clearFieldClick(event: Event, field: GMField): void {
        event.preventDefault();
        event.stopPropagation();
        this.group.setValue(null);
        this.group.markAsDirty();
    }

    private collectMaxValues(): { [key: string]: number } {
        const field = this.template.getField('peopleGroupsV2');
        const result = {};

        field.selection.forEach(s => {
            const f = this.template.getField(s.fieldRef);
            result[f.id] = parseFloat(this.form.get(f.id).value);
        });

        return result;
    }
}
