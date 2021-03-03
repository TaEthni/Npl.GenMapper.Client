import { Component, Input, OnInit } from '@angular/core';
import { GMReportValue } from '@npl-template';

import { GraphColors } from '../reports-view.interface';


@Component({
    selector: 'app-gm-pie-grid',
    templateUrl: './gm-pie-grid.component.html',
    styleUrls: ['./gm-pie-grid.component.scss']
})
export class GmPieGridComponent implements OnInit {
    @Input()
    public label: string;

    @Input()
    public designatedTotal: number;

    @Input()
    public data: GMReportValue[];

    public colors = GraphColors;

    constructor() { }

    public ngOnInit(): void {
    }

    public onSelect(): void { }
}
