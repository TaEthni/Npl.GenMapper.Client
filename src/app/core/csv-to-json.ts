import { IFlatNode, PeopleAttributes } from "@models/node.model";
import { Template } from "@models/template.model";
import { ControlType, DisciplesTemplate, FourFieldsTemplate } from "@templates";
import { csvParse } from "d3";
import { UnknownPeopleGroup } from "./people-group.service";

const isNumberReg = /\d/;

const oldMap = {
    disciples: DisciplesTemplate,
    fourFields: FourFieldsTemplate
}

export function CSVToJSONNoTemplate(type: string, csv: string): IFlatNode[] {
    const template = oldMap[type];

    if (!template) {
        console.log(type)
        return null;
    }

    return csvParse<IFlatNode, any>(csv, (row) => {
        const node = {} as IFlatNode;
        node.id = row.id;
        node.parentId = row.parentId;

        template.fields.filter(x => !!x.type).forEach(field => {
            if (field.type === 'checkbox') {
                node[field.header] = getBooleanValue(row[field.header]);
            } else {
                node[field.header] = row[field.header];
            }
        });

        return node;
    });
}

export function CSVToJSON(csv: string, template: Template): IFlatNode[] {

    return csvParse<IFlatNode, any>(csv, (row) => {
        const node = {} as IFlatNode;

        node.id = row.id;
        node.parentId = row.parentId;

        // Iterate back over fields just incase the CSV was missing any fields
        template.fields.forEach(field => {

            if (!row.hasOwnProperty(field.id)) {
                node[field.id] = null;

                if (field.hasOwnProperty('defaultValue')) {
                    node[field.id] = field.defaultValue;
                }
            }

            if (field.type === ControlType.checkbox) {
                node[field.id] = getBooleanValue(row[field.id]);
            }

            else if (field.type === ControlType.date) {
                if (row[field.id]) {
                    node[field.id] = new Date(row[field.id]);
                }
            }

            else if (field.parseValueAsInt) {
                node[field.id] = parseInt(row[field.id]) || field.defaultValue;
            }

            else if (field.parseValueAsFloat) {
                node[field.id] = parseFloat(row[field.id]) || field.defaultValue;
            }

            else if (field.parseOptionValueAsInt) {
                if (row[field.id] && Array.isArray(row[field.id])) {
                    const v: string[] = row[field.id] as any;
                    node[field.id] = v.map(value => parseInt(value));
                }
            }

            else {
                node[field.id] = row[field.id];
            }
        });

        node.isRoot = !node.parentId && node.parentId !== '0';

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

        if (template.getField('peoples')) {
            if (node.hasOwnProperty('peoples')) {
                try {
                    node.peoples = JSON.parse(node.peoples);
                } catch (error) {
                    node.peoples = null;
                }
            }

            if (!node.peoples) {
                node.peoples = [createUnknownPeoples(template, node)];
            }
        }

        return node;
    });
}

function createUnknownPeoples(template: Template, node: IFlatNode): PeopleAttributes {
    const people = {} as PeopleAttributes;
    people.identifier = UnknownPeopleGroup.PEID;
    people.label = UnknownPeopleGroup.NmDisp;
    people.placeOfOrigin = null;

    template.getField('peoples').fields.forEach(field => {
        people[field.id] = node[field.id] || field.defaultValue;
    });

    return people;
}

function getBooleanValue(value: string = ''): boolean {
    value = value.toUpperCase();
    return value === 'TRUE' || value === '1';
}
