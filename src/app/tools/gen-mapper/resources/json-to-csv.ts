import { GNode } from "../gen-mapper.interface";
import { Template } from "../template.model";
import { csvFormatRows } from "d3";
import { ControlType } from "@templates";

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
                    if (field && field.type === ControlType.checkbox) {
                        out[field.id] = d[field.id] ? '1' : '0';
                    }

                    else if (field.type === ControlType.date) {
                        if (d[field.id]) {
                            out[field.id] = d[field.id].toString();
                        }
                        else {
                            out[field.id] = null;
                        }
                    }

                    else {
                        out[field.id] = d[field.id];
                    }

                    output.push(out[field.id]);
                });

                return output;
            })
        )
    );
}
