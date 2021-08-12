import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

export interface IpGeolocation {
    ip_address: string;
    city: string;
    region: string;
    region_iso_code: string;
    region_geoname_id: number;
    country: string;
    country_code: string;
    country_geoname_id: number;
    continent: string;
    continent_code: string;
    continent_geoname_id: number;
    longitude: number;
    latitude: number;
};

@Injectable({
    providedIn: 'root'
})
export class IpGeolocationService {

    constructor(private http: HttpClient) { }

    getIpGeolocation() {
        return this.http.get<IpGeolocation>(`${environment.ipGeoUrl}?api_key=${environment.ipGeoApiKey}`);
    }
};
