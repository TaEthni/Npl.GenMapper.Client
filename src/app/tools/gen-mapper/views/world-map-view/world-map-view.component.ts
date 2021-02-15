import { AgmMap } from '@agm/core';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsService } from '@npl-core/maps.service';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { Utils } from '@npl-core/utils';
import { NodeDto } from '@npl-models/node.model';
import { GMTemplate } from '@npl-template';
import { takeUntil } from 'rxjs/operators';

import { GenMapperService } from '../../gen-mapper.service';
import { NodeTreeService } from '../../node-tree/node-tree.service';

export interface MapMarker {
    lat: number;
    lng: number;
    node: NodeDto;
}

@Component({
    selector: 'app-world-map-view',
    templateUrl: './world-map-view.component.html',
    styleUrls: ['./world-map-view.component.scss']
})
export class WorldMapViewComponent extends Unsubscribable implements OnInit, AfterViewInit {
    @ViewChild(AgmMap, { static: true })
    public agmMap: AgmMap;

    public template: GMTemplate;
    public nodes: NodeDto[];
    public latitude: number;
    public longitude: number;
    public markers: MapMarker[];
    public zoom = 11;
    public isLoading = true;
    public locatingCount: number;

    private googleMap: any;

    constructor(
        private mapsService: MapsService,
        private genMapper: GenMapperService,
        private nodeTreeService: NodeTreeService,
        private ngZone: NgZone
    ) { super(); }

    public ngOnInit(): void {
        this.genMapper.template$.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.template = result;
        });

        this.nodeTreeService.treeData$.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.isLoading = true;
            this.nodes = this.nodeTreeService.getData();
            this.runChange();

            if (this.googleMap) {
                this.locateExtent();
            }
        });
    }

    public ngAfterViewInit(): void {
        this.agmMap.mapReady.pipe(takeUntil(this.unsubscribe)).subscribe(map => {
            this.googleMap = map;
            this.locateExtent();
        });
    }

    public markerClick(marker: MapMarker): void {
        this.genMapper.setNode(marker.node);
    }

    private runChange(): void {
        this.markers = [];
        const nodesWithLocation = this.nodes.filter(n => !!n.attributes.location);
        const nodesWithLatLng = nodesWithLocation.filter(n => !!n.attributes.latitude);

        if (nodesWithLocation.length === 0) {
            this.isLoading = false;
            return;
        }

        this.markers = nodesWithLatLng.map(node => ({
            lat: node.attributes.latitude,
            lng: node.attributes.longitude,
            node,
        }));

        if (this.markers.length > 0) {
            this.isLoading = false;
        }

        this.sortMarkers();

        // this.locateUnlocatedAddresses(nodesWithoutLatLng);
    }

    private locateExtent(): void {
        const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
        for (const mm of this.markers) {
            bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
        }

        this.googleMap.fitBounds(bounds);
    }

    private sortMarkers(): void {
        this.markers.sort((a, b) => {
            return b.lat - a.lat;
        });
    }

    // Method locates nodes that have a location but no lat & lng.
    // Using reverse GeoLocation
    private locateUnlocatedAddresses(nodesWithoutLatLng: NodeDto[]): void {
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

        const runQueue = (n: NodeDto) => {
            this.ngZone.run(() => {
                this.locatingCount = nodesWithoutLatLng.length + 1;
            });

            Utils.timeout(() => {
                if (n) {
                    this.locatingCount = nodesWithoutLatLng.length;
                    this.mapsService.getCoordsForAddress({ address: n.attributes.location, placeId: n.attributes.placeId }).subscribe(result => {
                        // Set properties on Node so we can save.
                        n.attributes.latitude = result.latitude;
                        n.attributes.longitude = result.longitude;
                        n.attributes.placeId = result.placeId;

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
        // this.documentService.updateNode(this.document)
        //     .subscribe(result => {
        //     });
    }
}
