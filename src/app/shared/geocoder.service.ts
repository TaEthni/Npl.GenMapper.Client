import { Injectable } from '@angular/core';
import { addressToLocations, locationToAddress } from '@arcgis/core/rest/locator';
import { Observable } from 'rxjs';

export interface LocationPoint {
    latitude: number;
    longitude: number;
    zoom: number;
    source: string;
    countryCode: string;
    isValid?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class GeocoderService {
    private readonly url = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer';

    public locateWithLatLng(point: { latitude: number; longitude: number }): Observable<__esri.AddressCandidate> {
        const params = {
            location: point as any,
        };

        return new Observable((observer) => {
            locationToAddress(this.url, params)
                .then((response) => {
                    observer.next(response);
                    observer.complete();
                })
                .catch((e) => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    public locateWithCountryCode(country: string): Observable<__esri.AddressCandidate[]> {
        const params: __esri.locatorAddressToLocationsParams = {
            address: country,
            countryCode: country,
        };

        return new Observable((observer) => {
            addressToLocations(this.url, params)
                .then((response) => {
                    observer.next(response);
                    observer.complete();
                })
                .catch((e) => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    public getLocation(): Observable<LocationPoint> {
        return new Observable((obs) => {
            navigator.geolocation.getCurrentPosition(
                (success) => {
                    this.locateWithLatLng(success.coords).subscribe(
                        (res) => {
                            const point = {
                                latitude: res.location.latitude,
                                longitude: res.location.longitude,
                                zoom: 16,
                                source: 'Geolocation',
                                countryCode: res.attributes.CountryCode,
                                isValid: true,
                            };
                            obs.next(point);
                            obs.complete();
                        },
                        (error) => {
                            console.log(error);
                            obs.error(error);
                        }
                    );
                },
                (error) => {
                    console.log(error);
                    obs.error(error);
                }
            );
        });
    }
}
