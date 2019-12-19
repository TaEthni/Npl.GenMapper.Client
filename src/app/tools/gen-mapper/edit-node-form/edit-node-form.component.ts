import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker, MatDialog, MAT_DATE_FORMATS } from '@angular/material';
import { MapsService } from '@core/maps.service';
import { Device } from '@core/platform';
import { Unsubscribable } from '@core/Unsubscribable';
import { ControlType, GMField } from '@templates';
import { Dictionary, keyBy } from 'lodash';
import moment, { Moment } from 'moment';
import { takeUntil } from 'rxjs/operators';
import { LocationDialogComponent, LocationDialogConfig, LocationDialogResponse } from '../dialogs/location-dialog/location-dialog.component';
import { PeopleGroupDialogComponent } from '../dialogs/people-group-dialog/people-group-dialog.component';
import { GNode } from '../gen-mapper.interface';

export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY-MM',
    },
    display: {
        dateInput: 'YYYY-MM',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-edit-node-form',
    templateUrl: './edit-node-form.component.html',
    styleUrls: ['./edit-node-form.component.scss'],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class EditNodeFormComponent extends Unsubscribable implements OnInit {
    @Input()
    public model: GNode;

    @Input()
    public form: FormGroup;

    @Input()
    public nodes: any[];

    @Input()
    public fields: GMField[];

    public fieldByProperty: Dictionary<GMField>;
    public types = ControlType;

    constructor(
        private dialog: MatDialog,
        private mapService: MapsService
    ) { super(); }

    public ngOnInit(): void {
        this.fieldByProperty = keyBy(this.fields, f => f.id);

        if (this.form.get('generation')) {
            this.form.get('generation').valueChanges
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(result => {
                    if (result < 0) {
                        this.form.get('generation').patchValue(0);
                    }
                });
        }

        if (this.form.get('location')) {
            this.form.get('location').disable();
        }

        if (this.form.get('peopleGroups')) {
            this.form.get('peopleGroups').disable();
            this.form.get('peopleGroupsNames').disable();
        }
    }

    public onFieldClick(field: GMField): void {
        if (field.type === ControlType.geoLocation) {
            this.onGeoLocationClick();
        }

        // if (field.type === 'peidSelect') {
        //     this.onPeopleGroupClick();
        // }
    }

    public onClearFieldClick(event: Event, field: GMField): void {
        event.preventDefault();
        event.stopPropagation();
        this.form.get(field.id).setValue(null);
        this.form.get(field.id).markAsDirty();
    }

    public onNumberFieldChange(propertyName: string): void {
        const control = this.form.get(propertyName);
        if (!control.value && control.value !== 0) {
            control.patchValue(0);
        }
    }

    public removeDeprecatedDate(): void {
        this.form.get('date').setValue(null);
        this.form.get('date').markAsDirty();
    }

    public chosenYearHandler(normalizedYear: Moment, control: FormControl) {
        const ctrlValue = control.value || moment();
        ctrlValue.year(normalizedYear.year());
        control.setValue(ctrlValue);
    }

    public chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, control: FormControl) {
        const ctrlValue = control.value;
        ctrlValue.month(normalizedMonth.month());
        control.setValue(ctrlValue);
        datepicker.close();
    }

    public getTemplate(controlTemplate: TemplateRef<any>, noneTemplate: TemplateRef<any>, field: GMField): any {
        if (field.dependsOnFieldId) {
            const dependency = this.form.get(field.dependsOnFieldId);

            if (dependency.value === field.dependsOnFieldValue) {
                return controlTemplate;
            } else {
                return noneTemplate;
            }
        }

        if (field.dependsOnTrueField) {
            const dependency = this.form.get(field.dependsOnTrueField);
            if (dependency.value) {
                return controlTemplate;
            } else {
                return noneTemplate;
            }
        }

        if (field.dependsOnFalseField) {
            const dependency = this.form.get(field.dependsOnFalseField);
            if (!dependency.value) {
                return controlTemplate;
            } else {
                return noneTemplate;
            }
        }

        return controlTemplate;
    }

    private onGeoLocationClick(): void {
        if (this.form.get('location').value) {
            this.showLocationDialog({
                address: this.form.get('location').value,
                latitude: this.form.get('latitude').value,
                longitude: this.form.get('longitude').value,
                markerLatitude: this.form.get('latitude').value,
                markerLongitude: this.form.get('longitude').value
            });
        } else {
            this.mapService.getLocation().subscribe(result => {
                this.showLocationDialog({
                    latitude: result.coords.latitude,
                    longitude: result.coords.longitude
                });
            });
        }
    }

    private showLocationDialog(data: LocationDialogConfig): void {
        let minWidth = '100vw';

        if (Device.isDesktop) {
            minWidth = '400px';
        }

        this.dialog
            .open<LocationDialogComponent, LocationDialogConfig, LocationDialogResponse>(LocationDialogComponent, {
                minWidth,
                data,
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.form.get('latitude').patchValue(result.latitude);
                    this.form.get('longitude').patchValue(result.longitude);
                    this.form.get('placeId').patchValue(result.placeId);
                    this.form.get('location').patchValue(result.address);
                    this.form.get('location').updateValueAndValidity();
                    this.form.markAsDirty();
                }
            });
    }

    public onPeopleGroupClick(): void {
        let minWidth = '100vw';

        if (Device.isDesktop) {
            minWidth = '400px';
        }

        const peids = this.form.get('peopleGroups');
        const names = this.form.get('peopleGroupsNames');

        this.dialog
            .open(PeopleGroupDialogComponent, {
                autoFocus: false,
                minWidth,
                data: {
                    peids: peids.value
                }
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    peids.setValue(result.peids);
                    names.setValue(result.names);
                    peids.markAsDirty();
                    names.markAsDirty();
                }
            });
    }
}
