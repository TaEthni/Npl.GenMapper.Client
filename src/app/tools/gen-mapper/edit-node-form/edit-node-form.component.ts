import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MapsService } from '@core/maps.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { takeUntil } from 'rxjs/operators';

import { LocationDialogComponent, LocationDialogConfig } from '../dialogs/location-dialog/location-dialog.component';
import { GMField, GNode } from '../gen-mapper.interface';

@Component({
    selector: 'app-edit-node-form',
    templateUrl: './edit-node-form.component.html',
    styleUrls: ['./edit-node-form.component.scss']
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

    constructor(
        private dialog: MatDialog,
        private mapService: MapsService
    ) { super(); }

    public ngOnInit(): void {
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
    }

    public onFieldClick(field: GMField): void {
        if (field.type === 'geoLocation') {
            this.onGeoLocationClick();
        }
    }

    public onClearFieldClick(event: Event, field: GMField): void {
        event.preventDefault();
        event.stopPropagation();
        this.form.get(field.header).setValue(null);
        this.form.get(field.header).markAsDirty();
    }

    private onGeoLocationClick(): void {
        if (this.form.get('location').value) {
            this.showLocationDialog({
                address: this.form.get('location').value
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

    private showLocationDialog(config: LocationDialogConfig): void {
        this.dialog
            .open<LocationDialogComponent, LocationDialogConfig, { address: string, placeId: string }>(LocationDialogComponent, {
                minWidth: '400px',
                data: config
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.form.get('placeId').patchValue(result.placeId);
                    this.form.get('location').patchValue(result.address);
                    this.form.get('location').updateValueAndValidity();
                    this.form.markAsDirty();
                }
            });
    }
}
