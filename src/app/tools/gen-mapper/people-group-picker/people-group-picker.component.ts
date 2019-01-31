import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSelectChange } from '@angular/material';
import { PeopleGroupModel, PeopleGroupService } from '../people-group.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-people-group-picker',
    templateUrl: './people-group-picker.component.html',
    styleUrls: ['./people-group-picker.component.scss']
})
export class PeopleGroupPickerComponent implements OnInit {
    @Input()
    public peopleGroups: PeopleGroupModel[];

    @ViewChild(MatPaginator)
    public paginator: MatPaginator;

    public displayedColumns: string[] = ['select', 'name', 'country', 'peid'];
    public dataSource = new MatTableDataSource<PeopleGroupModel>();
    public selection = new SelectionModel<PeopleGroupModel>(true, []);

    constructor(
    ) { }

    public ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (d: PeopleGroupModel, f: string) => {
            f = f.trim().toLowerCase();
            return d.attributes.NmDisp.toLowerCase().indexOf(f) > -1
                || d.attributes.Ctry.toLowerCase().indexOf(f) > -1;
        };

        this.dataSource.data = this.peopleGroups;
        // this.selection.selected
    }

    public applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public onSelectionChange(event: MatSelectChange): void {
        console.log(event);
    }
}
