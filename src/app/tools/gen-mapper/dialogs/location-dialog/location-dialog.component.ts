import { Component, ElementRef, Inject, NgZone, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';

interface MouseEvent {
    coords: { lat: number, lng: number };
}

@Component({
    selector: 'app-location-dialog',
    templateUrl: './location-dialog.component.html',
    styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent {
    @ViewChild('search')
    public searchElementRef: ElementRef;

    public latitude: number;
    public longitude: number;
    public markerLatitude: number;
    public markerLongitude: number;
    public searchControl: AbstractControl;
    public zoom: number;
    public address: string;
    public height: number;
    public geocoder: google.maps.Geocoder;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private dialogRef: MatDialogRef<LocationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { coords: Coordinates }
    ) {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
        this.zoom = 12;
        this.searchControl = new FormControl();
        this.height = window.innerHeight - 150;
        this.initialize();
    }

    public onSubmit(): void {
        this.dialogRef.close(this.address);
    }

    public markerDragEnd(event: MouseEvent): void {
        console.log(event);
        this.setAddress(event.coords.lat, event.coords.lng);
    }

    public mapClicked(event: MouseEvent): void {
        this.setAddress(event.coords.lat, event.coords.lng);
    }

    private initialize(): void {
        this.mapsAPILoader.load().then(() => {

            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });

            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.address = place.formatted_address;
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.markerLatitude = this.latitude;
                    this.markerLongitude = this.longitude;
                    this.zoom = 15;
                });
            });

            this.setAddress(this.latitude, this.longitude);
        });
    }

    private setAddress(lat: any, lng: any): void {
        this.markerLatitude = lat;
        this.markerLongitude = lng;
        const latLng = new google.maps.LatLng(lat, lng);
        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({ 'latLng': latLng } as google.maps.GeocoderRequest, (res, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (res[0]) {
                    this.address = res[0].formatted_address;
                    this.searchControl.setValue(res[0].formatted_address);
                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        });
    }
}
