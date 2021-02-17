import { Component, OnInit } from '@angular/core';
import { LocaleService } from '@npl-core/locale.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { NodeDto, Template } from '@npl-data-access';
import { ControlType, GMReport, ReportType } from '@npl-template';
import { takeUntil } from 'rxjs/operators';

import { GenMapperService } from '../../gen-mapper.service';

@Component({
    selector: 'app-reports-view',
    templateUrl: './reports-view.component.html',
    styleUrls: ['./reports-view.component.scss']
})
export class ReportsViewComponent extends Unsubscribable implements OnInit {
    public stats = {
        attenders: 0,
        believers: 0,
        unbaptized: 0,
        baptized: 0,
        newlyBaptized: 0,
        bigChurches: 0,
        smallChurches: 0,
        totalNodes: 0,
        activeNodes: 0,
        inactiveNodes: 0,
        averageNodeSize: 0,

        nodesWithLeaders: 0,
        nodesWithoutLeaders: 0,

        nodesWithBaptized: 0,
        nodesWithoutBaptized: 0,

        newBelieversLeading: 0,
        existingBelieversLeading: 0,
    };

    public nodes: NodeDto[];
    public template: Template;
    public reports: GMReport[];
    public baptismsReport: GMReport[];
    public churchFunctionsReport: GMReport[];
    public generations: GMReport[];
    public nodeCount: number;
    public activeNodeCount: number;
    public viewNodeCount: number;
    public includeInactive: boolean;
    public churchTypes: any[];

    constructor(
        private locale: LocaleService,
        private genMapper: GenMapperService
    ) { super(); }

    public ngOnInit(): void {
        this.genMapper.template$.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.template = result;
            this.createReports();
        });

        this.genMapper.nodes$.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.nodes = result;
            this.updateReports();
        });
    }

    public toggleIncludeInactive(): void {
        this.includeInactive = !this.includeInactive;
        this.updateReports();
    }

    private createReports(): void {
        this.reports = [];

        this.template.templateReports.forEach(treport => {
            const report = {
                name: treport.name,
                order: treport.order,
                i18nRef: treport.i18nRef
            } as GMReport;

            if (treport.field) {
                const field = this.template.getField(treport.field);
                if (treport.graph === 'pieChart' && field.type === ControlType.radio) {
                    report.type = ReportType.enum;
                    report.values = [];
                    field.options.forEach(v => {
                        report.values.push({
                            key: v.value,
                            name: this.locale.t(v.i18nRef),
                            value: 0,
                        });
                    });
                }

                if (treport.graph === 'pieGrid' && field.type === ControlType.multiSelect) {
                    report.type = ReportType.multiEnum;
                    report.values = [];
                    field.options.forEach(v => {
                        report.values.push({
                            name: this.locale.t(v.i18nRef),
                            key: v.value,
                            option: v.value,
                            value: 0,
                        });
                    });
                }
            }

            if (treport.fields && treport.graph === 'verticalBarChart') {
                report.type = ReportType.multiField;
                report.values = [];
                treport.fields.forEach(fieldName => {
                    const field = this.template.getField(fieldName);
                    const value = {
                        name: this.locale.t(field.i18nRef),
                        key: field.id,
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

        this.reports.forEach(rep => {
            rep.values.forEach(v => {
                v.name = v.name.replace(/.+\:/, '');
            });
        });
    }

    private updateReports(): void {
        this.nodeCount = this.nodes.length;
        this.activeNodeCount = this.nodes.filter(d => d.attributes.active).length;

        Object.keys(this.stats).forEach(key => {
            this.stats[key] = 0;
        });

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
        const generations = {};

        const nodes = this.nodes;
        const activeNodes = nodes.filter(n => n.attributes.active);

        this.stats.totalNodes = nodes.length;
        this.stats.activeNodes = activeNodes.length;
        this.stats.inactiveNodes = this.stats.totalNodes - this.stats.activeNodes;

        let ns = nodes;

        if (!this.includeInactive) {
            ns = activeNodes;
        }

        ns.forEach((node: NodeDto) => {
            if (node.attributes.gen) {
                generations[node.attributes.gen] = generations[node.attributes.gen] || 0;
                generations[node.attributes.gen]++;
            }

            this.stats.attenders += parseFloat(node.attributes.attenders as any) || 0;
            this.stats.believers += parseFloat(node.attributes.believers as any) || 0;
            this.stats.baptized += parseFloat(node.attributes.baptized as any) || 0;
            this.stats.unbaptized = this.stats.attenders - this.stats.baptized;
            this.stats.newlyBaptized += parseFloat(node.attributes.newlyBaptized as any) || 0;

            this.reports.forEach(report => {
                if (report.type === ReportType.enum) {
                    const v = node.attributes[report.name];
                    const found = report.values.find(rv => rv.key === v);
                    if (found) {
                        found.value++;
                    }
                }

                if (report.type === ReportType.multiEnum) {
                    const value = node.attributes[report.name];
                    if (value) {
                        report.values.forEach(rv => {
                            if (value.indexOf(rv.option) > -1) {
                                rv.value++;
                            }
                        });
                    }
                }

                if (report.type === ReportType.multiField) {
                    report.values.forEach(rv => {
                        const v = node.attributes[rv.key];
                        if (v) {
                            rv.value++;
                        }
                    });
                }

                if (report.type === ReportType.multiNumber) {
                    report.values.forEach(rv => {
                        const v = node.attributes[rv.key];
                        if (v) {
                            rv.value += parseFloat(v) || 0;
                        }
                    });
                }

                if (report.type === ReportType.number) {
                    const v = parseFloat(node.attributes[report.name]) || 0;
                    report.value += v;
                }

                if (report.type === ReportType.boolean) {
                    if (node.attributes[report.name]) {
                        report.value += 1;
                    }
                }
            });
        });

        this.baptismsReport = [
            {
                name: 'Attenders',
                value: this.stats.attenders,
            },
            {
                name: 'Believers',
                value: this.stats.believers,
            },
            {
                name: 'Unbaptized',
                value: this.stats.unbaptized,
            },
            {
                name: 'Baptized',
                value: this.stats.baptized,
            },
            {
                name: 'Newly Baptized',
                value: this.stats.newlyBaptized,
            }
        ];

        Object.keys(generations).forEach(gen => {
            const name = 'G' + gen;
            const value = generations[gen];
            this.generations.push({ name, value, type: ReportType.number });
        });
    }
}
