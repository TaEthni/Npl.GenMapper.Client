import { Component, Input, OnInit } from '@angular/core';

import { GMReport } from '../../gen-mapper.interface';
import { GraphColors } from '../gm-report.interface';


@Component({
    selector: 'app-gm-bar-chart',
    templateUrl: './gm-bar-chart.component.html',
    styleUrls: ['./gm-bar-chart.component.scss']
})
export class GmBarChartComponent implements OnInit {
    @Input()
    public data: GMReport[];

    @Input()
    public label: string;

    public colors = GraphColors;

    constructor() { }

    public ngOnInit(): void {
    }

    public onSelect(): void { }
}
