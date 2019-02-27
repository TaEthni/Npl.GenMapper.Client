import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LocaleService } from '@core/locale.service';
import { DocumentDto } from '@shared/entity/document.model';
import { keyBy } from 'lodash';
import { GMTemplate, GMReport } from '@templates';


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

        this.template.templateReports.forEach(treport => {
            const report = {
                name: treport.name,
                order: treport.order,
            } as GMReport;

            if (treport.field) {
                const field = this.template.fieldsByKey[treport.field];
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

            if (treport.fields && treport.graph === 'verticalBarChart') {
                report.type = 'multiField';
                report.values = [];
                treport.fields.forEach(fieldName => {
                    const field = this.template.fieldsByKey[fieldName];
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

        this.reports.forEach(rep => {
            rep.values.forEach(v => {
                v.name = v.name.replace(/.+\:/, '');
            });
        });
    }

    private updateReports(): void {
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

        const nodes = this.document.nodes;
        const activeNodes = nodes.filter(n => n.active);

        this.stats.totalNodes = nodes.length;
        this.stats.activeNodes = activeNodes.length;
        this.stats.inactiveNodes = this.stats.totalNodes - this.stats.activeNodes;

        let ns = nodes;

        if (!this.includeInactive) {
            ns = activeNodes;
        }

        ns.forEach((node: any) => {
            if (node.gen) {
                generations[node.gen] = generations[node.gen] || 0;
                generations[node.gen]++;
            }

            this.stats.attenders += parseFloat(node.attenders) || 0;
            this.stats.believers += parseFloat(node.believers) || 0;
            this.stats.baptized += parseFloat(node.baptized) || 0;
            this.stats.unbaptized = this.stats.attenders - this.stats.baptized;
            this.stats.newlyBaptized += parseFloat(node.newlyBaptized) || 0;

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

                if (report.type === 'multiNumber') {
                    report.values.forEach(rv => {
                        const v = node[rv.key];
                        if (v) {
                            rv.value += parseFloat(v) || 0;
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

        // debugger;

        Object.keys(generations).forEach(gen => {
            const name = 'G' + gen;
            const value = generations[gen];
            this.generations.push({ name, value, type: 'number' });
        });
    }
}
