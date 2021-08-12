import { MapsAPILoader } from '@agm/core';
import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapsService } from '@npl-core/maps.service';

interface MouseEvent {
    coords: { lat: number, lng: number };
}

export interface LocationDialogConfig {
    country?: string;
    placeId?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    markerLatitude?: number;
    markerLongitude?: number;
    isIpGeolocation?: boolean;
}

export interface LocationDialogResponse {
    address?: string;
    placeId?: string;
    latitude?: number;
    longitude?: number;
}

@Component({
    selector: 'app-location-dialog',
    templateUrl: './location-dialog.component.html',
    styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent implements AfterViewInit, OnDestroy {
    @ViewChild('search', { static: true })
    public searchElementRef: ElementRef;

    public iso3Country: string;
    public latitude: number;
    public longitude: number;
    public markerLatitude: number;
    public markerLongitude: number;
    public searchControl: AbstractControl;
    // default zoom set further out, we can zoom in if we have location data.
    public zoom: number = 2;
    public address: string;
    public placeId: string;
    public height: number;
    public geocoder: google.maps.Geocoder;

    private mapClickListener: google.maps.MapsEventListener;
    private isIpGeolocation: boolean;

    constructor(
        private mapsService: MapsService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private dialogRef: MatDialogRef<LocationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: LocationDialogConfig
    ) {
        this.placeId = data.placeId;
        this.address = data.address;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.markerLatitude = data.markerLatitude;
        this.markerLongitude = data.markerLongitude;
        this.isIpGeolocation = data.isIpGeolocation;

        if (data.latitude && data.longitude) this.zoom = 12
        this.searchControl = new FormControl(this.address);
        this.height = window.innerHeight - 350;
    }

    public ngAfterViewInit(): void {
        this.initialize();
    }

    public ngOnDestroy(): void {
        if (this.mapClickListener) {
            this.mapClickListener.remove();
        }
    }

    public onSubmit(): void {
        this.dialogRef.close({
            address: this.address,
            placeId: this.placeId,
            latitude: this.markerLatitude,
            longitude: this.markerLongitude
        });
    }

    public clear(): void {
        this.searchControl.setValue('');
    }

    public mapReadyHandler(map: google.maps.Map): void {
        this.mapClickListener = map.addListener('click', (e: google.maps.MouseEvent) => {
            this.ngZone.run(() => {
                this.setAddress(e.latLng.lat(), e.latLng.lng());
            });
        });
    }

    public markerDragEnd(event: google.maps.MouseEvent): void {
        this.setAddress(event.latLng.lat(), event.latLng.lng());
    }

    private initialize(): void {
        this.mapsAPILoader.load().then(() => {

            const autocomplete = new google.maps.places.SearchBox(this.searchElementRef.nativeElement);

            autocomplete.addListener('places_changed', () => {
                this.ngZone.run(() => {
                    const place: google.maps.places.PlaceResult = autocomplete.getPlaces()[0];

                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.placeId = place.place_id;
                    this.address = place.formatted_address;
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.markerLatitude = this.latitude;
                    this.markerLongitude = this.longitude;
                    this.zoom = 15;
                });
            });

            // If ipGeolocation is used, then set the zoom out and show the map without a marker.
            if (this.isIpGeolocation) {
                this.zoom = 10;
                return;
            }

            if (this.address && !this.markerLatitude) {
                this.mapsService.getCoordsForAddress({ address: this.address, placeId: this.placeId }).subscribe(result => {
                    this.ngZone.run(() => {
                        this.placeId = result.placeId;
                        this.latitude = result.latitude;
                        this.longitude = result.longitude;
                        this.markerLatitude = this.latitude;
                        this.markerLongitude = this.longitude;
                    });
                });
            }
            // only set address marker if we have access to lat and long
            if (!this.markerLatitude && this.latitude && this.longitude) {
                this.setAddress(this.latitude, this.longitude);
            }
            // if no lat and long, display the map without a marker.
            return;
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
                    this.placeId = res[0].place_id;
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
