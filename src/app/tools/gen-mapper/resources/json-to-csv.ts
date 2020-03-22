import { Template } from "@models/template.model";
import { ControlType } from "@templates";
import { csvFormatRows } from "d3";
import { GNode } from "../gen-mapper.interface";

export function JSONToCSV(data: GNode[], template: Template): string {

    const fields = template.fields.map(field => field.id);
    const csvHeader = fields.join(',') + '\n';

    return (
        csvHeader +
        csvFormatRows(
            data.map((d, i) => {
                const output = [];
                const out = {};

                // parsign checkboxes in CSV from 1&0 to true&false
                template.fields.forEach(field => {
                    let value;

                    switch (field.type) {
                        case ControlType.checkbox:
                            value = d[field.id] ? '1' : '0';
                            break;

                        case ControlType.date:
                            if (d[field.id]) {
                                value = d[field.id].toString();
                            }
                            else {
                                value = null;
                            }
                            break;

                        case ControlType.peopleGroupsV2:
                            if (d[field.id] && typeof d[field.id] === 'object') {
                                console.log(d[field.id]);
                                value = JSON.stringify(d[field.id]);
                            } else if (!value) {
                                value = '';
                            }
                            break;

                        default:
                            value = d[field.id];
                            break;
                    }

                    out[field.id] = value;

                    output.push(out[field.id]);
                });

                return output;
            })
        )
    );
}
