import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Unsubscribable } from '@core/Unsubscribable';

@Component({
    selector: 'app-gm-attributes',
    templateUrl: './gm-attributes.component.html',
    styleUrls: ['./gm-attributes.component.scss']
})
export class GmAttributesComponent extends Unsubscribable implements OnInit {
    @Input()
    public attributes: FormArray;

    @Input()
    public columns = ['propertyName', 'value', 'isVisible'];

    public dataSource = new MatTableDataSource<AbstractControl>();
    public ngOnInit(): void {
        this.dataSource.data = this.attributes.controls;
    }
}
