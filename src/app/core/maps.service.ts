import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { assign } from 'lodash';

const cacheKey = 'gmaps-address-latlng-cache';
export interface LatLng {
    latitude: number;
    longitude: number;
}

@Injectable()
export class MapsService {

    private cache: any = {};

    constructor() {
        const cache = sessionStorage.getItem(cacheKey);
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

    public getCoordsForAddress(address: string): Observable<LatLng> {
        const cached = this.getFromCache(address);
        if (cached) {
            return of(cached);
        }

        return Observable.create(observer => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address } as google.maps.GeocoderRequest, (res, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (res[0]) {
                        const latitude = res[0].geometry.location.lat();
                        const longitude = res[0].geometry.location.lng();
                        this.cacheAddress(address, { latitude, longitude });
                        observer.next(this.getFromCache(address));
                        observer.complete();
                        // this.address = res[0].formatted_address;
                        // this.searchControl.setValue(res[0].formatted_address);
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

    private cacheAddress(address: string, latlng: LatLng): void {
        this.cache[address] = latlng;
        sessionStorage.setItem(cacheKey, JSON.stringify(this.cache));
    }

    private getFromCache(address: string): LatLng {
        return this.cache[address];
    }
}
