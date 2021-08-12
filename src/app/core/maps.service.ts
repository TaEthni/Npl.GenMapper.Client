import { Injectable } from '@angular/core';
import { COUNTRIES } from '@npl-template';
import { Observable } from 'rxjs';

const cacheKey = 'gmaps-address-latlng-cache';
export interface LatLng {
    latitude: number;
    longitude: number;
    placeId?: string;
    country?: string;
}

export interface Position {
    timestamp: number;
    coords: {
        accuracy: number;
        latitude: number;
        longitude: number;
    }
};

@Injectable()
export class MapsService {

    public getLocation(): Observable<Position> {
        return Observable.create(observer => {
            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    (position: Position) => {
                        observer.next(position);
                        observer.complete();
                    },
                    (error) => {
                        if (error.code === 1) {
                            observer.error();
                        }
                        observer.complete();
                    }
                );
            }
        });
    }

    public getCoordsForAddress(request: google.maps.GeocoderRequest): Observable<LatLng> {
        return Observable.create(observer => {
            if (request.placeId) {
                delete request.address;
            }

            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(request as google.maps.GeocoderRequest, (res, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (res[0]) {
                        const latitude = res[0].geometry.location.lat();
                        const longitude = res[0].geometry.location.lng();
                        observer.next({ latitude, longitude, placeId: res[0].place_id });
                        observer.complete();
                    } else {
                        console.log('No results found');
                        observer.error('No results found');
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                    observer.error('Geocoder failed due to: ' + status);
                }
            });
        });
    }

    public getISO3Country(place: google.maps.places.PlaceResult | google.maps.GeocoderResult): string {
        const address_components = place.address_components;
        if (address_components) {
            const country_component = address_components.find(c => c.types.indexOf('country') > -1);
            const iso2_country = country_component.short_name;
            return COUNTRIES.find(c => c['alpha-2'] === iso2_country)['alpha-3'];
        }
        return null;
    }
}
