import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Unsubscribable } from '@core/Unsubscribable';
import { Template } from '@shared/models/template.model';
import { GMFieldSelectionValueSelection } from '@templates';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-people-group-selector',
    templateUrl: './people-group-selector.component.html',
    styleUrls: ['./people-group-selector.component.scss']
})
export class PeopleGroupSelectorComponent extends Unsubscribable implements OnInit {

    @Input()
    public form: FormGroup;

    @Input()
    public template: Template;

    @Input()
    public country: string;

    @Input()
    public group: FormGroup;

    public selection: GMFieldSelectionValueSelection[];

    constructor() { super(); }

    public ngOnInit() {
        this.selection = this.group.value ? this.group.value.selection : [];
        this.group.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.selection = result.selection;
            console.log(this.selection);
        });
    }
}
