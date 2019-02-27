import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocaleService } from '@core/locale.service';
import { DocumentDto } from '@shared/entity/document.model';

import { keyBy } from 'lodash';
import { DocumentService } from '../document.service';
import { GenMapperService } from '../gen-mapper.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { GMTemplate, GMStreamAttribute, GMTemplateAttribute } from '@templates';

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

    @Output()
    public cancelClick = new EventEmitter<void>();

    public form: FormGroup;

    constructor(
        private genMapService: GenMapperService,
        private snackBar: MatSnackBar,
        private router: Router,
    ) { }

    public ngOnInit(): void {
        this.createForm();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.document.firstChange) {
        }
    }

    public cancel(): void {
        this.cancelClick.emit();
    }

    public save(): void {
        const value = this.form.getRawValue();

        this.document.title = value.title;
        this.document.attributes = [];

        value.attributes.forEach(attr => {
            this.document.attributes.push({
                propertyName: attr.propertyName,
                value: attr.value,
                isVisible: attr.isVisible,
                order: attr.order,
                type: attr.type,
            } as GMStreamAttribute);
        });

        value.additional.forEach(attr => {
            this.document.attributes.push({
                propertyName: attr.propertyName,
                value: attr.value,
                isVisible: attr.isVisible,
                isLabel: attr.isLabel,
                order: attr.order,
                type: attr.type,
            } as GMStreamAttribute);
        });

        this.genMapService.updateDocument(this.document)
            .subscribe(result => {
                this.genMapService.setDocument(this.document);
                this.cancelClick.emit();
                this.router.navigate([this.template.name, this.document.id]);

                this.snackBar.open('Attributes Saved', 'Ok', { duration: 3000 });
            });
    }

    private createForm(): void {
        const attributes = this.document.attributes;
        const defaultAttributes: GMTemplateAttribute[] = [];
        const additionalAttributes: GMTemplateAttribute[] = [];

        attributes.forEach(attr => {
            const field = this.template.fieldsByKey[attr.propertyName];

            const templateAttr = {
                propertyName: attr.propertyName,
                canHide: true,
                type: attr.type,
                value: attr.value,
                isVisible: true,
                isLabel: attr.isLabel,
                order: attr.order,
            } as GMTemplateAttribute;

            // If it is a default attrs, and the attr has a value;
            if (field) {
                templateAttr.canHide = field.canModifyVisibility;
                templateAttr.type = field.type;
                templateAttr.order = templateAttr.order || field.order;

                if (field.canModifyVisibility && attr.hasOwnProperty('isVisible')) {
                    templateAttr.isVisible = attr.isVisible;
                }

                defaultAttributes.push(templateAttr);

            } else {
                if (attr.hasOwnProperty('isVisible')) {
                    templateAttr.isVisible = attr.isVisible;
                }

                additionalAttributes.push(templateAttr);
            }
        });

        this.form = new FormGroup({
            title: new FormControl(this.document.title, [Validators.required, Validators.minLength(2)]),
            attributes: new FormArray(defaultAttributes.map(attr => this.createAttrControl(attr))),
            additional: new FormArray(additionalAttributes.map(attr => this.createAttrControl(attr)))
        });
    }

    private createAttrControl(attr: GMTemplateAttribute): AbstractControl {
        return new FormGroup({
            propertyName: new FormControl({
                value: attr.propertyName,
                disabled: true,
            }),
            value: new FormControl(attr.value, [Validators.required]),
            isVisible: new FormControl({
                value: attr.isVisible,
                disabled: !attr.canHide,
            }),
            isLabel: new FormControl(attr.isLabel),
            order: new FormControl(attr.order),
            type: new FormControl(attr.type)
        });
    }
}
