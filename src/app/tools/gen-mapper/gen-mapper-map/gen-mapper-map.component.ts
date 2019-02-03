import { AgmMap } from '@agm/core/directives/map';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsService } from '@core/maps.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { DocumentDto } from '@shared/entity/document.model';
import { forkJoin } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { GMTemplate, GNode } from '../gen-mapper.interface';
import { GenMapperService } from '../gen-mapper.service';

export interface MapMarker {
    lat: number;
    lng: number;
    node: GNode;
}

@Component({
    selector: 'app-gen-mapper-map',
    templateUrl: './gen-mapper-map.component.html',
    styleUrls: ['./gen-mapper-map.component.scss']
})
export class GenMapperMapComponent extends Unsubscribable implements OnInit {

    @Input()
    public template: GMTemplate;

    @Input()
    public document: DocumentDto;

    @ViewChild(AgmMap)
    public agmMap: AgmMap;

    public latitude: number;
    public longitude: number;
    public markers: MapMarker[];
    public zoom = 11;
    public isLoading = true;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private mapsService: MapsService,
        private genMapper: GenMapperService,
        private ngZone: NgZone
    ) { super(); }

    public ngOnInit(): void {
        this.genMapper.getDocument()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.isLoading = true;
                this.document = result;
                this.mapsAPILoader.load().then(() => {
                    this.runChange();
                });
            });
    }

    public markerClick(marker: MapMarker): void {
        this.genMapper.setNode(marker.node);
    }

    private runChange(): void {
        this.markers = [];
        const nodesToSearch = this.document.nodes.filter(n => !!n.location);

        if (nodesToSearch.length === 0) {
            this.isLoading = false;
            return;
        }

        forkJoin(
            nodesToSearch.map(n => {
                return this.mapsService.getCoordsForAddress({ address: n.location, placeId: n.placeId })
                    .pipe(map(res => {
                        return {
                            lat: res.latitude,
                            lng: res.longitude,
                            node: n,
                        };
                    }));
            })
        ).subscribe(result => {
            // On NgZoneRun, otherwise the template will not see the changes for some reason. :/
            this.ngZone.run(() => {
                const firstMarker = result[0];
                this.longitude = firstMarker.lng;
                this.latitude = firstMarker.lat;
                this.markers = result;
                this.isLoading = false;
                console.log(this.isLoading);
            });
        });
    }
}
