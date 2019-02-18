import { Component, Input, OnInit } from '@angular/core';

import { GMReportValue } from '../../gen-mapper.interface';
import { GraphColors } from '../gm-report.interface';

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
