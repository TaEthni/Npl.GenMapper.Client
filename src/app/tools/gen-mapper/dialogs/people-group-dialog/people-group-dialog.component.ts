import { Component, OnInit, ViewChild } from '@angular/core';
import { PeopleGroupService, PeopleGroupModel, PeopleGroupConfig } from '../../people-group.service';
import { MatSelectChange, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';



@Component({
    selector: 'app-people-group-dialog',
    templateUrl: './people-group-dialog.component.html',
    styleUrls: ['./people-group-dialog.component.scss']
})
export class PeopleGroupDialogComponent implements OnInit {
    public peopleGroupConfig: PeopleGroupConfig;
    public peopleGroups: PeopleGroupModel[];
    public countries: string[];
    public isLoading: boolean;

    constructor(
        private peopleGroupService: PeopleGroupService
    ) { }

    public ngOnInit(): void {
        this.isLoading = true;
        this.peopleGroupService.getPeopleGroups()
            .subscribe(result => {
                this.isLoading = false;
                this.peopleGroupConfig = result;
                this.countries = Object.keys(result.byCountry);
            });
    }

    public onCountrySelected(country: { name: string }): void {
        this.peopleGroups = this.peopleGroupConfig.byCountry[country.name];
        console.log(this.peopleGroups.length)
    }

    public onSelectionChange(event: MatSelectChange): void {
        console.log(event);
    }
}
