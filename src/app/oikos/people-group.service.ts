import { Injectable } from '@angular/core';
import { FeatureServiceBase } from './FeatureServiceBase';
import { Observable } from 'rxjs';

export interface PeopleGroupResponse {
    languageCode: string;
    ethneId: number;
    religionId: string;
}

@Injectable({
    providedIn: 'root',
})
export class PeopleGroupService extends FeatureServiceBase {
    protected serviceUrl: string =
        'https://services2.arcgis.com/S4ydGgujXcif36k3/ArcGIS/rest/services/ROP/FeatureServer/0';

    public query(peid: number): Observable<PeopleGroupResponse> {
        const query = {
            outFields: ['ROL', 'ROP25', 'ROR'],
            where: 'PEID = ' + peid,
        };

        return new Observable((observer) => {
            const featureLayer = this.getFeatureLayer();
            featureLayer
                .queryFeatures(query)
                .then((response) => {
                    const feature = response.features[0];
                    const item = {
                        languageCode: feature.attributes.ROL,
                        ethneId: feature.attributes.ROP25,
                        religionId: feature.attributes.ROR,
                    };
                    observer.next(item);
                    observer.complete();
                })
                .catch((e) => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }
}
