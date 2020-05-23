import { AgmMap } from '@agm/core';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsService } from '@core/maps.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { Utils } from '@core/utils';
import { NodeDto } from '@models/node.model';
import { GMTemplate } from '@templates';
import { takeUntil } from 'rxjs/operators';
import { DocumentService } from '../../../../core/document.service';
import { GenMapperService } from '../../gen-mapper.service';


export interface MapMarker {
    lat: number;
    lng: number;
    node: NodeDto;
}

@Component({
    selector: 'app-gen-mapper-map',
    templateUrl: './gen-mapper-map.component.html',
    styleUrls: ['./gen-mapper-map.component.scss']
})
export class GenMapperMapComponent extends Unsubscribable implements OnInit {
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

    constructor(
        private mapsService: MapsService,
        private genMapper: GenMapperService,
        private documentService: DocumentService,
        private ngZone: NgZone
    ) { super(); }

    public ngOnInit(): void {
        this.genMapper.template$.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.template = result;
        });

        this.genMapper.nodes$.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.isLoading = true;
            this.nodes = result;
            this.runChange();
        });
    }

    public markerClick(marker: MapMarker): void {
        this.genMapper.setNode(marker.node);
    }

    private runChange(): void {
        this.markers = [];
        const parentMarker = this.nodes.find(n => !n.parentId);
        const nodesWithLocation = this.nodes.filter(n => !!n.attributes.location);
        const nodesWithLatLng = nodesWithLocation.filter(n => !!n.attributes.latitude);
        // const nodesWithoutLatLng = nodesWithLocation.filter(n => !n.attributes.latitude);

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

            if (parentMarker && parentMarker.attributes.latitude && parentMarker.attributes.longitude) {
                this.latitude = parentMarker.attributes.latitude;
                this.longitude = parentMarker.attributes.longitude;
            } else {
                this.latitude = this.markers[0].lat;
                this.longitude = this.markers[0].lng;
            }

            this.isLoading = false;
        }

        this.sortMarkers();

        // this.locateUnlocatedAddresses(nodesWithoutLatLng);
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
