import { Injectable } from '@angular/core';
import { assign } from 'lodash';
import { Observable } from 'rxjs';

const cacheKey = 'gmaps-address-latlng-cache';
export interface LatLng {
    latitude: number;
    longitude: number;
    placeId?: string;
}

@Injectable()
export class MapsService {

    private cache: any = {};

    constructor() {
        const cache = localStorage.getItem(cacheKey);
        if (cache) {
            assign(this.cache, JSON.parse(cache));
        }
    }

    public getLocation(): Observable<Position> {
        return Observable.create(observer => {
            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    (position) => {
                        observer.next(position);
                        observer.complete();
                    },
                    (error) => {
                        if (error.code === 1) {
                            alert('Location Services are disabled for this browser.');
                        }

                        observer.error();
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
}
