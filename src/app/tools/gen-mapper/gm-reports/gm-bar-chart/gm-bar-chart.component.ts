import { Component, Input, OnInit } from '@angular/core';
import { GMReport } from '@templates';

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

    @Input()
    public type: 'vertical' | 'horizontal' = 'horizontal';

    public colors = [GraphColors[0]];

    public width = 600;

    public x: any;
    public y: any;
    public svg: any;

    constructor() { }

    public ngOnInit(): void {
        if (window.innerWidth < 768) {
            this.width = 300;
        }
    }

    public onSelect(): void { }
}
