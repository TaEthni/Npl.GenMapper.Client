import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PeopleGroupModel } from '../people-group.service';
import { MatPaginator, MatTableDataSource, MatSelectChange } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-country-picker',
    templateUrl: './country-picker.component.html',
    styleUrls: ['./country-picker.component.scss']
})
export class CountryPickerComponent implements OnInit {
    @Input()
    public countries: string[];

    @Output()
    public onChange = new EventEmitter<string>();

    public displayedColumns: string[] = ['name'];
    public dataSource = new MatTableDataSource<{ name: string }>();

    constructor() { }

    public ngOnInit(): void {
        this.dataSource.data = this.countries.map(name => ({ name }));
    }

    public applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public onSelectionChange(event: string): void {
        this.onChange.emit(event);
    }
}
