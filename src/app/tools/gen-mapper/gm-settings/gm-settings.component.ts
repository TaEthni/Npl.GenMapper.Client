import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocaleService } from '@core/locale.service';
import { DocumentDto } from '@shared/entity/document.model';

import { GMTemplate, GMTemplateElement } from '../gen-mapper.interface';

@Component({
    selector: 'app-gm-settings',
    templateUrl: './gm-settings.component.html',
    styleUrls: ['./gm-settings.component.scss']
})
export class GmSettingsComponent implements OnInit, OnChanges {
    @Input()
    public document: DocumentDto;

    @Input()
    public template: GMTemplate;

    public form: FormGroup;
    private defaultElements: GMTemplateElement[];

    constructor(
        private locale: LocaleService
    ) { }

    public ngOnInit(): void {
        this.createForm();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.document.firstChange) {
        }
    }

    private createForm(): void {
        const elements = this.document.parsedElements;
        const defaultElements: GMTemplateElement[] = [];
        const additionalElements: GMTemplateElement[] = [];

        this.template.fields.map(field => {
            if (field.canModifyLabel) {
                const el = {
                    name: field.header,
                    canHide: field.canModifyVisibility,
                    value: this.locale.t(this.template.format + '.' + field.header),
                    isVisible: field.canModifyVisibility
                };

                defaultElements.push(el);
            }
        });

        elements.forEach(element => {
            const def = defaultElements.find(d => d.name === element.templateElement);

            // If it is a default elements, and the element has a value;
            if (def) {
                def.value = element.value || def.value;

                if (def.canHide && element.hasOwnProperty('isVisible')) {
                    def.isVisible = element.isVisible;
                }

            } else {
                const templateEl = {
                    name: element.templateElement,
                    canHide: true,
                    value: element.value,
                    isVisible: true,
                } as GMTemplateElement;

                if (element.hasOwnProperty('isVisible')) {
                    templateEl.isVisible = element.isVisible;
                }

                additionalElements.push(templateEl);
            }
        });

        console.log(defaultElements.concat(additionalElements));

        // this.form = new FormGroup({
        //     title: new FormControl(this.document.title, [Validators.required, Validators.minLength(2)]),
        //     elements: new FormArray(),
        // });
    }
}
