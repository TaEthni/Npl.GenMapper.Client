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
}
