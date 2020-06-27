import { Component, OnInit } from '@angular/core';
import { Device } from '@core/platform';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@models/document.model';
import { NodeDto } from '@models/node.model';
import { Template } from '@models/template.model';
import { GMReport, ReportType, ValueType } from '@templates';
import { takeUntil } from 'rxjs/operators';
import { GenMapperService } from '../gen-mapper.service';

@Component({
    selector: 'app-report-legend',
    templateUrl: './report-legend.component.html',
    styleUrls: ['./report-legend.component.scss']
})
export class ReportLegendComponent extends Unsubscribable implements OnInit {
    public template: Template;
    public document: DocumentDto;
    public nodes: NodeDto[];
    public reports: GMReport[];
    public generations: GMReport[];
    public readonly isDesktop = Device.isDesktop;
    public readonly valueTypes = ValueType;

    constructor(private genMapper: GenMapperService) {
        super();
    }

    public ngOnInit(): void {
        this.genMapper.template$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(template => {
                this.template = template;
                this.createReports();
            })

        this.genMapper.nodes$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(nodes => {
                this.nodes = nodes;
                this.updateReports();
            });
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

        if (!this.nodes) {
            return;
        }

        this.nodes.forEach(node => {
            if (node.attributes.gen) {
                generations[node.attributes.gen] = generations[node.attributes.gen] || 0;
                generations[node.attributes.gen]++;
            }

            this.reports.forEach(report => {
                if (report.type === ReportType.number) {
                    if (typeof node.attributes[report.name] === 'string') {
                        report.value += parseFloat(node.attributes[report.name]) || 0;
                    } else {
                        report.value += node.attributes[report.name]
                    }
                }

                if (report.type === ReportType.boolean) {
                    if (node.attributes[report.name]) {
                        report.value += 1;
                    }
                }
            });
        });

        Object.keys(generations).forEach(gen => {
            const name = 'G' + gen;
            const value = generations[gen];
            this.generations.push({ name, value, type: ReportType.number });
        });
    }
}
