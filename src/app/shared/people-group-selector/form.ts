import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Template } from "@models/template.model";
import { GMFieldSelectionValue, GMFieldSelectionValueSelection } from "@templates";

export function CreatePeopleGroupSelectionForm(model: GMFieldSelectionValue, template: Template): FormGroup {
    model = model || { selection: [] };
    model.selection = model.selection || [];

    return new FormGroup({
        selection: new FormArray(
            model.selection.map(selection => CreateSelectionGroup(selection, template))
        )
    });
}

export function CreateSelectionGroup(model: GMFieldSelectionValueSelection, template: Template): FormGroup {
    model = model || {} as GMFieldSelectionValueSelection;
    const name = model.peid && model.name ? model.name : 'Unknown';
    const value = model.value || {};

    const valueGroup = {};
    const field = template.getField('peopleGroupsV2');

    field.selection.forEach(selectionTemplate => {
        valueGroup[selectionTemplate.id] = new FormControl(value[selectionTemplate.id] || 0);
    });

    return new FormGroup({
        peid: new FormControl(model.peid),
        name: new FormControl(name),
        value: new FormGroup(valueGroup)
    });
}
