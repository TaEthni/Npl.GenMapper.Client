import { Injectable } from '@angular/core';
import { EntityService } from '@npl-core/entity.service';
export interface IpGeolocation {
    longitude: number;
    latitude: number;
};

@Injectable({
    providedIn: 'root'
})
export class IpGeolocationService {

    constructor(private entityService: EntityService,) { }

    getIpGeolocation() {
        return this.entityService.customGet('location');
    }
};
