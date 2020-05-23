import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { arc, interpolate, pie, scaleOrdinal, select } from 'd3';

import { GraphColors } from '../gm-report.interface';

@Component({
    selector: 'app-gm-pie-chart',
    templateUrl: './gm-pie-chart.component.html',
    styleUrls: ['./gm-pie-chart.component.scss']
})
export class GmPieChartComponent implements OnInit, OnChanges {
    @Input()
    public label: string;

    @Input()
    public data: { name: string, label?: string, value: number }[];

    @Input()
    public fullValue: number;

    @Input()
    public value1: number;

    @Input()
    public value2: number;

    @ViewChild('chart', { static: true })
    public chartRef: ElementRef;

    public svg: any;
    public g: any;
    public colors = GraphColors;
    private color: any;
    private pie: any;
    private arc: any;
    private arclabel: any;

    constructor(
    ) { }

    public ngOnInit(): void {
        const size = 200;
        const height = size;
        const width = size;
        const radius = Math.min(width, height) / 2;
        this.svg = select(this.chartRef.nativeElement).append('svg')
            .attr('height', height)
            .attr('width', width);

        this.g = this.svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        this.color = scaleOrdinal()
            .range(this.colors);

        this.pie = pie()
            .sort(null)
            .value(function (d: any): any { return d.value; });

        this.arc = arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        this.arclabel = arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        this.update();
    }

    public ngOnChanges(): void {
        if (!this.svg) { return; }
        this.update();
    }

    public onSelect(): void { }

    public update(): void {
        let data = this.data;

        if (!data) {
            data = [
                {
                    name: 'fullValue',
                    value: this.fullValue
                }
            ];

            if (this.value1) {
                data.push({
                    name: 'value1',
                    value: this.value1
                });
            }

            if (this.value2) {
                data.push({
                    name: 'value2',
                    value: this.value2
                });
            }
        }

        const key = (d) => d.data.name;

        const arcs = this.g.selectAll('.arc')
            .data(this.pie(data), key);

        const enter = arcs.enter()
            .append('g')
            .attr('class', 'arc');

        enter.append('path')
            .attr('fill', (d: any, i: any) => this.color(i))
            .attr('d', this.arc)
            .each(function (d: any): void { this._current = d; });

        enter.append('text')
            .attr('transform', (d: any): any => {
                return 'translate(' + this.arclabel.centroid(d) + ')';
            })
            .attr('dy', '0.35em')
            .text(function (d: any): any { return d.data.value; });

        arcs.select('path')
            .transition()
            .duration(500)
            .attrTween('d', getArcTween(this.arc));

        arcs.select('text')
            .transition()
            .duration(500)
            .attr('transform', (d: any): any => {
                return 'translate(' + this.arclabel.centroid(d) + ')';
            })
            .text(function (d: any): any { return d.data.value; });
    }
}

function getArcTween(_arc: any): any {
    return function arcTween(d: any): any {
        const i = interpolate(this._current, d);

        this._current = i(0);

        return function (t: any): any {
            return _arc(i(t));
        };
    };
}
