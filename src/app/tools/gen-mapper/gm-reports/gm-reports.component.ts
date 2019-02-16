import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LocaleService } from '@core/locale.service';
import { DocumentDto } from '@shared/entity/document.model';
import { keyBy } from 'lodash';

import { GMReport, GMTemplate } from '../gen-mapper.interface';

@Component({
    selector: 'app-gm-reports',
    templateUrl: './gm-reports.component.html',
    styleUrls: ['./gm-reports.component.scss']
})
export class GmReportsComponent implements OnInit, OnChanges {
    @Input()
    public document: DocumentDto;

    @Input()
    public template: GMTemplate;

    public reports: GMReport[];
    public generations: GMReport[];

    public nodeCount: number;
    public activeNodeCount: number;
    public viewNodeCount: number;
    public includeInactive: boolean;

    public churchTypes: any[];

    constructor(
        private locale: LocaleService
    ) { }

    public ngOnInit(): void {
    }

    public ngOnChanges(): void {
        if (this.document) {
            this.nodeCount = this.document.nodes.length;
            this.activeNodeCount = this.document.nodes.filter(d => d.active).length;

            if (!this.reports) {
                this.createReports();
            }

            this.updateReports();
        }
    }

    public toggleIncludeInactive(): void {
        this.includeInactive = !this.includeInactive;
        this.updateReports();
    }

    private createReports(): void {
        this.reports = [];
        const byFieldName = keyBy(this.template.fields, 'header');

        this.template.templateReports.forEach(treport => {
            const report = {
                name: treport.name,
                order: treport.order,
            } as GMReport;

            if (treport.field) {
                const field = byFieldName[treport.field];
                if (treport.graph === 'pieChart' && field.type === 'radio') {
                    report.type = 'radio';
                    report.values = [];
                    field.values.forEach(v => {
                        report.values.push({
                            key: v.header,
                            name: this.locale.t(this.template.format + '.' + v.header),
                            value: 0,
                        });
                    });
                }

                if (treport.graph === 'pieGrid' && field.type === 'multiSelect') {
                    report.type = 'multiSelect';
                    report.values = [];
                    field.values.forEach(v => {
                        report.values.push({
                            name: this.locale.t(this.template.format + '.' + v.header),
                            key: v.header,
                            option: v.value,
                            value: 0,
                        });
                    });
                }
            }

            if (treport.fields) {
                report.type = 'multiField';
                report.values = [];
                treport.fields.forEach(fieldName => {
                    const field = byFieldName[fieldName];
                    const value = {
                        name: this.locale.t(this.template.format + '.' + field.header),
                        key: field.header,
                        value: 0,
                    };

                    report.values.push(value);
                });
            }

            this.reports.push(report);
        });

        this.reports.sort((a, b) => {
            return a.order - b.order;
        });
    }

    private updateReports(): void {
        this.reports.forEach(r => {
            if (r.value) {
                r.value = 0;
            }

            if (r.values) {
                const vs = r.values.slice();
                r.values = null;
                r.values = vs;
                r.values.forEach(rv => {
                    rv.value = 0;
                });
            }
        });

        this.generations = [];
        this.churchTypes = [];
        const churchTypes = {};
        const generations = {};

        let nodes = this.document.nodes;

        if (!this.includeInactive) {
            nodes = nodes.filter(n => n.active);
        }

        nodes.forEach(node => {

            if (node.gen) {
                generations[node.gen] = generations[node.gen] || 0;
                generations[node.gen]++;
            }

            if (node['churchType']) {
                churchTypes[node['churchType']] = churchTypes[node['churchType']] || 0;
                churchTypes[node['churchType']]++;
            }

            this.reports.forEach(report => {
                if (report.type === 'radio') {
                    const v = node[report.name];
                    const found = report.values.find(rv => rv.key === v);
                    if (found) {
                        found.value++;
                    }
                }

                if (report.type === 'multiSelect') {
                    const v = node[report.name];
                    report.values.forEach(rv => {
                        if (v.indexOf(rv.option) > -1) {
                            rv.value++;
                        }
                    });
                }

                if (report.type === 'multiField') {
                    report.values.forEach(rv => {
                        const v = node[rv.key];
                        if (v) {
                            rv.value++;
                        }
                    });
                }

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

        Object.keys(churchTypes).forEach(churchType => {
            this.churchTypes.push({
                name: churchType,
                value: churchTypes[churchType]
            });
        });

        Object.keys(generations).forEach(gen => {
            const name = 'G' + gen;
            const value = generations[gen];
            this.generations.push({ name, value, type: 'number' });
        });
    }
}
