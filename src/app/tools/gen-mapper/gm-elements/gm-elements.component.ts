import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-gm-elements',
    templateUrl: './gm-elements.component.html',
    styleUrls: ['./gm-elements.component.scss']
})
export class GmElementsComponent implements OnInit {
    @Input()
    public elements: FormArray;

    public displayedColumns = ['name', 'value', 'isVisible'];
    public dataSource = new MatTableDataSource<AbstractControl>();

    constructor() { }

    public ngOnInit(): void {
        this.dataSource.data = this.elements.controls;
    }
}
