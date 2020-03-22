import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Device } from '@core/platform';
import { Template } from '@models/template.model';
import { DocumentDto } from '@shared/entity/document.model';
import { GMReport } from '@templates';

@Component({
    selector: 'app-map-report-legend',
    templateUrl: './map-report-legend.component.html',
    styleUrls: ['./map-report-legend.component.scss']
})
export class MapReportLegendComponent implements OnChanges {
    @Input()
    public template: Template;

    @Input()
    public document: DocumentDto;

    public reports: GMReport[];
    public generations: GMReport[];
    public isDesktop = Device.isDesktop;

    public ngOnChanges(change: SimpleChanges): void {
        if (change.template && change.template.firstChange) {
            this.createReports();
        }

        if (change.document) {
            this.updateReports();
        }
    }

    private createReports(): void {
        this.reports = [];
        this.template.reports.forEach(rep => {
            const field = this.template.getField(rep.name);
            const report = {} as GMReport;
            report.value = 0;
            report.name = rep.name;
            report.type = rep.type;
            report.i18nRef = field.i18nRef;
            this.reports.push(report);
        });
    }

    private updateReports(): void {
        this.reports.forEach(r => r.value = 0);
        this.generations = [];
        const generations = {};

        this.document.nodes.forEach(node => {
            if (node.gen) {
                generations[node.gen] = generations[node.gen] || 0;
                generations[node.gen]++;
            }

            this.reports.forEach(report => {
                if (report.type === 'number') {
                    const v = parseFloat(node[report.name]) || 0;
                    report.value += v;
                }

                if (report.type === 'boolean') {
                    if (node[report.name]) {
                        report.value += 1;
                    }
                }
            });
        });

        Object.keys(generations).forEach(gen => {
            const name = 'G' + gen;
            const value = generations[gen];
            this.generations.push({ name, value, type: 'number' });
        });
    }
}
