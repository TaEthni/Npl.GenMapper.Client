import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PeopleGroupModelItem, PeopleGroupService } from '@core/people-group.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { Template } from '@shared/models/template.model';
import { COUNTRIES, COUNTRY_CODE, GMField, GMFieldSelectionValue } from '@templates';
import { take } from 'rxjs/operators';
import { CreatePeopleGroupSelectionForm, CreateSelectionGroup } from '../form';

export interface PeopleGroupSelectorDialogConfig {
    country: string;
    template: Template;
    value: GMFieldSelectionValue;
    maxValues: { [key: string]: number };
}

export type Total = { [key: string]: number }

@Component({
    selector: 'app-people-group-selector-dialog',
    templateUrl: './people-group-selector-dialog.component.html',
    styleUrls: ['./people-group-selector-dialog.component.scss']
})
export class PeopleGroupSelectorDialogComponent extends Unsubscribable implements OnInit {

    public isLoading: boolean = true;
    public peopleGroups: PeopleGroupModelItem[];
    public pgControl = new FormControl(null);
    public formGroup: FormGroup;
    public field: GMField;
    public totals: Total = {};
    public countryName: string;
    public get selection(): FormArray { return this.formGroup.get('selection') as FormArray; }

    constructor(
        private peopleGroupService: PeopleGroupService,
        private dialogRef: MatDialogRef<PeopleGroupSelectorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PeopleGroupSelectorDialogConfig
    ) {
        super();
        this.formGroup = CreatePeopleGroupSelectionForm(this.data.value, this.data.template);
        this.field = this.data.template.getField('peopleGroupsV2');
        if (this.data.country) {
            this.countryName = COUNTRIES.find(c => c[COUNTRY_CODE] = this.data.country).name;
        }
    }

    public ngOnInit() {
        this.isLoading = true;
        this.peopleGroupService.getPeopleGroups()
            .pipe(
                take(1),
            )
            .subscribe(config => {
                this.isLoading = false;
                this.peopleGroups = config.byCountry[this.data.country];

                console.log(config);
            });
    }

    public continue(): void {
        this.dialogRef.close(this.formGroup.value);
    }

    public addPeopleGroup(event: { value: PeopleGroupModelItem }): void {
        const pg = event.value;
        const peid = pg.PEID;
        const name = pg.NmDisp;
        this.selection.push(
            CreateSelectionGroup(
                {
                    peid: peid,
                    name: name,
                    value: null
                },
                this.data.template
            )
        );

        this.pgControl.setValue(null);
    }
}
