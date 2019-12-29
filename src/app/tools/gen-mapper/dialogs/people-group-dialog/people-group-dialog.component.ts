import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';

import { PeopleGroupConfig, PeopleGroupModel, PeopleGroupService } from './people-group.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { COUNTRIES } from '@templates';

export interface PeopleGroupDialogResponse {
    peids: number[];
    names: string[];
}

@Component({
    selector: 'app-people-group-dialog',
    templateUrl: './people-group-dialog.component.html',
    styleUrls: ['./people-group-dialog.component.scss']
})
export class PeopleGroupDialogComponent extends Unsubscribable implements OnInit {
    public peopleGroupConfig: PeopleGroupConfig;
    public peopleGroups: PeopleGroupModel[];
    public selectedPeopleGroups: PeopleGroupModel[];
    public countries: string[];
    public country: string;
    public isLoading: boolean;

    constructor(
        private dialogRef: MatDialogRef<PeopleGroupDialogComponent, PeopleGroupDialogResponse>,
        private peopleGroupService: PeopleGroupService,
        @Inject(MAT_DIALOG_DATA) private data: { peids: number[] }
    ) {
        super();
    }

    public ngOnInit(): void {
        this.isLoading = true;
        this.peopleGroupService.getPeopleGroups()
            .pipe(
                take(1),
                takeUntil(this.unsubscribe)
            )
            .subscribe(result => {
                this.isLoading = false;
                this.peopleGroupConfig = result;
                this.countries = Object.keys(result.byCountry);
                this.countries.sort();

                console.log(this.countries.length)
                console.log(COUNTRIES)

                if (this.data.peids && this.data.peids.length > 0) {
                    const first = this.peopleGroupService.getByPeid(this.data.peids[0]);
                    this.country = this.countries.find(c => c === first.attributes.Ctry);
                    this.selectedPeopleGroups = result.features.filter(f => {
                        return this.data.peids.includes(f.attributes.PEID);
                    });

                    this.onCountrySelected(this.country);
                }
            });
    }

    public onSave(): void {
        const peids = [];
        const names = [];

        if (this.selectedPeopleGroups) {
            this.selectedPeopleGroups.forEach(p => {
                peids.push(p.attributes.PEID);
                names.push(p.attributes.NmDisp);
            });
        }

        this.dialogRef.close({ peids, names });
    }

    public onCancel(): void {
        this.dialogRef.close();
    }

    public onCountrySelected(country: string): void {
        this.peopleGroups = this.peopleGroupConfig.byCountry[country];
        this.country = country;
    }

    public onPeopleGroupsChange(event: PeopleGroupModel[]): void {
        this.selectedPeopleGroups = event;
    }

    public resetCountry(): void {
        this.selectedPeopleGroups = null;
        this.peopleGroups = null;
        this.country = '';
    }
}
