import { AgmMap } from '@agm/core/directives/map';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsService } from '@core/maps.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { Utils } from '@core/utils';
import { DocumentDto } from '@shared/entity/document.model';
import { takeUntil } from 'rxjs/operators';

import { DocumentService } from '../document.service';
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
    public locatingCount: number;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private mapsService: MapsService,
        private genMapper: GenMapperService,
        private documentService: DocumentService,
        private ngZone: NgZone
    ) { super(); }

    public ngOnInit(): void {
        this.genMapper.getDocument()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.isLoading = true;
                this.document = result;
                this.runChange();
            });
    }

    public markerClick(marker: MapMarker): void {
        this.genMapper.setNode(marker.node);
    }

    private runChange(): void {
        this.markers = [];
        const parentMarker = this.document.nodes.find(n => !n.parentId);
        const nodesWithLocation = this.document.nodes.filter(n => !!n.location);
        const nodesWithLatLng = nodesWithLocation.filter(n => !!n.latitude);
        const nodesWithoutLatLng = nodesWithLocation.filter(n => !n.latitude);

        if (nodesWithLocation.length === 0) {
            this.isLoading = false;
            return;
        }

        this.markers = nodesWithLatLng.map(node => ({
            lat: node.latitude,
            lng: node.longitude,
            node,
        }));

        if (this.markers.length > 0) {

            if (parentMarker && parentMarker.latitude && parentMarker.longitude) {
                this.latitude = parentMarker.latitude;
                this.longitude = parentMarker.longitude;
            } else {
                this.latitude = this.markers[0].lat;
                this.longitude = this.markers[0].lng;
            }

            this.isLoading = false;
        }

        this.sortMarkers();

        this.locateUnlocatedAddresses(nodesWithoutLatLng);
    }

    private locateUnlocatedAddresses(nodesWithoutLatLng: GNode[]): void {
        if (nodesWithoutLatLng.length === 0) {
            return;
        }

        this.locatingCount = nodesWithoutLatLng.length;

        const finishQueue = () => {
            // On NgZoneRun, otherwise the template will not see the changes for some reason. :/
            this.ngZone.run(() => {
                this.sortMarkers();
                const firstMarker = this.markers[0];
                this.longitude = firstMarker.lng;
                this.latitude = firstMarker.lat;
                this.isLoading = false;
                this.saveDocument();
            });
        };

        const runQueue = (n: GNode) => {
            this.ngZone.run(() => {
                this.locatingCount = nodesWithoutLatLng.length + 1;
            });

            Utils.timeout(() => {
                if (n) {
                    this.locatingCount = nodesWithoutLatLng.length;
                    this.mapsService.getCoordsForAddress({ address: n.location, placeId: n.placeId }).subscribe(result => {
                        // Set properties on Node so we can save.
                        n.latitude = result.latitude;
                        n.longitude = result.longitude;
                        n.placeId = result.placeId;

                        this.markers.push({
                            lat: result.latitude,
                            lng: result.longitude,
                            node: n,
                        });

                        const next = nodesWithoutLatLng.shift();
                        if (!next) {
                            finishQueue();
                        } else {
                            runQueue(next);
                        }
                    });
                }
            }, 600);
        };

        runQueue(nodesWithoutLatLng.shift());
    }

    private saveDocument(): void {
        this.documentService.update(this.document)
            .subscribe(result => {
                console.log('Document Updated');
            });
    }

    private sortMarkers(): void {
        this.markers.sort((a, b) => {
            return b.lat - a.lat;
        });
    }
}
