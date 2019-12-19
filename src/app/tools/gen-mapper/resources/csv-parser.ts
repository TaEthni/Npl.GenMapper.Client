import { ControlType } from "@templates";
import { csvParse } from "d3";
import { GNode } from "../gen-mapper.interface";
import { Template } from "../template.model";
const isNumberReg = /\d/;

export function parseCSVData(csvData: string, template: Template): GNode[] {
    return csvParse<GNode, any>(csvData, (row) => {

        const node: any = {};

        node.id = row.id;
        node.parentId = row.parentId;

        Object.keys(row).forEach(column => {
            const field = template.getField(column);
            if (field) {
                if (field.type === ControlType.checkbox) {
                    if (row[column]) {
                        const fieldValue = row[column].toUpperCase();
                        node[column] = !!['TRUE', '1'].includes(
                            fieldValue
                        );
                    } else {
                        node[column] = false;
                    }
                    return;
                }

                if (field.type === ControlType.date) {
                    if (row[column]) {
                        node[column] = new Date(row[column]);
                    }
                    return;
                }

                if (field.parseValueAsInt) {
                    node[column] = parseInt(row[column]) || null;
                    return;
                }

                if (field.parseValueAsFloat) {
                    node[column] = parseFloat(row[column]) || null;
                    return;
                }

                if (field.parseOptionValueAsInt) {
                    if (row[column] && Array.isArray(row[column])) {
                        const v: string[] = row[column] as any;
                        node[column] = v.map(value => parseInt(value));
                        return;
                    }
                }
            }

            node[column] = row[column];
        });

        // Iterate back over fields just incase the CSV was missing any fields
        template.fields.forEach(field => {
            if (!node.hasOwnProperty(field.id)) {
                if (field.defaultValue || field.hasOwnProperty('defaultValue')) {
                    if (field.type === ControlType.checkbox && row.hasOwnProperty(field.id)) {
                        const fieldValue = row[field.id].toUpperCase();
                        node[field.id] = !!['TRUE', '1'].includes(
                            fieldValue
                        );
                    } else {
                        node[field.id] = field.defaultValue;
                    }
                }

                node[field.id] = null;
            }
        });

        node.isRoot = !node.parentId && node.parentId !== 0;

        // This is for CSV files coming from the old-gen-mapper v1
        // when the threeThirds value was a string '1234567'
        // converts '1234567' to [1,2,3,4,5,6,7]
        if (node.hasOwnProperty('threeThirds')) {
            if (typeof node.threeThirds === 'string') {
                node.threeThirds = node.threeThirds.replace(
                    /\W/,
                    ''
                );
                node.threeThirds = node.threeThirds.split('');

                const filtered = node.threeThirds.filter((key: any) =>
                    isNumberReg.test(key)
                );
                const value: any = [];

                // dedupe old data
                filtered.forEach((a: any) => {
                    if (!value.includes(a)) {
                        value.push(a);
                    }
                });

                node.threeThirds = value;
            }
        }

        return node as GNode;
    });
}
