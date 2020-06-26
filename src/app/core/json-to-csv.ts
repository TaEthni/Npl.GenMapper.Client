import { NodeDto } from "@models/node.model";
import { Template } from "@models/template.model";
import { ControlType } from "@templates";
import { csvFormatRows } from "d3";

export function TemplateJSONToCSV(data: NodeDto[], template: Template): string {

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
                    if (field.id === 'id' || field.id === 'parentId') {
                        out[field.id] = d[field.id];
                    }

                    else if (field && field.type === ControlType.checkbox) {
                        out[field.id] = d.attributes[field.id] ? '1' : '0';
                    }

                    else if (field.type === ControlType.date) {
                        if (d.attributes[field.id]) {
                            out[field.id] = d.attributes[field.id].toString();
                        }
                        else {
                            out[field.id] = null;
                        }
                    }

                    else if (field.fields) {
                        out[field.id] = JSON.stringify(d.attributes[field.id]);
                    }

                    else {
                        out[field.id] = d.attributes[field.id];
                    }

                    output.push(out[field.id]);
                });

                return output;
            })
        )
    );
}



export function JSONToCSV(data: any[]): string {
    const first = data[0];
    const keys = Object.keys(first);
    const csvHeader = keys.join(',') + '\n';

    return (
        csvHeader +
        csvFormatRows(data.map((d, i) => keys.map(key => d[key])))
    );
}
