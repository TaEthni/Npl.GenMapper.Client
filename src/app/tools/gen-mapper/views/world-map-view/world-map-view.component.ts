import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { Unsubscribable } from '@npl-core/Unsubscribable';
import { NodeDto } from '@npl-data-access';
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
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

    public template: GMTemplate;
    public nodes: NodeDto[];
    public markers: MapMarker[];
    public zoom = 2;
    public isLoading = true;
    public locatingCount: number;
    public view: MapView;

    constructor(
        private genMapper: GenMapperService,
        private nodeTreeService: NodeTreeService,
    ) { super(); }

    private clusterConfig = {
        type: 'cluster',
        clusterRadius: '100px',
        // {cluster_count} is an aggregate field containing
        // the number of features comprised by the cluster
        popupTemplate: {
            title: 'Cluster summary',
            content: 'This cluster represents {cluster_count} activities.',
            fieldInfos: [{
                fieldName: 'cluster_count',
                format: {
                    places: 0,
                    digitSeparator: true
                }
            }]
        },
        clusterMinSize: '24px',
        clusterMaxSize: '60px',
        labelingInfo: [{
            deconflictionStrategy: 'none',
            labelExpressionInfo: {
                expression: 'Text($feature.cluster_count, \'#,###\')'
            },
            symbol: {
                type: 'text',
                color: '#004a5d',
                font: {
                    weight: 'bold',
                    family: 'Noto Sans',
                    size: '12px'
                }
            },
            labelPlacement: 'center-center',
        }]
    } as any;

    private featureLayer = new FeatureLayer({
        title: 'Activities',
        objectIdField: 'ObjectID',
        featureReduction: this.clusterConfig,
        spatialReference: { wkid: 4326 },
        geometryType: 'point',
        source: [],
        renderer: {
            type: 'simple',
            field: 'mag',
            symbol: {
                type: 'simple-marker',
                size: 12,
                color: [226, 119, 40],
                outline: {
                    color: [255, 255, 255],
                    width: 2
                }
            }
        } as any
    }) as FeatureLayer;

    private readonly markerSymbol = {
        type: 'simple-marker',
        color: [226, 119, 40],
        outline: {
            color: [255, 255, 255],
            width: 2
        }
    };

    private graphics: Graphic[];

    initializeMap(): Promise<any> {
        const container = this.mapViewEl.nativeElement;

        const map = new Map({
            basemap: 'streets-navigation-vector',
            layers: [this.featureLayer]
        });

        const view = new MapView({
            container,
            map,
            zoom: this.zoom,
        });

        view.ui.padding = { top: 56 }; // this gives room for the ui at the top of the map
        this.view = view;

        return this.view.when();
    }

    public ngOnInit(): void {
        this.genMapper.template$.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.template = result;
        });

        this.nodeTreeService.treeData$.pipe(takeUntil(this.unsubscribe)).subscribe(result => {
            this.nodes = this.nodeTreeService.getData();
            this.runChange();

        });
    }

    public ngAfterViewInit(): void {
        this.initializeMap().then(() => {
            console.log('Map is initialized');
            this.addMarkers();
        })
    }

    ngOnDestroy(): void {
        if (this.view) {
            // destroy the map view
            this.view.destroy();
            this.featureLayer.destroy();
        }
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
    }

    private sortMarkers(): void {
        this.markers.sort((a, b) => {
            return b.lat - a.lat;
        });
    }

    public addMarkers(): void {
        this.view.graphics.removeAll();

        if (this.graphics && this.graphics.length) {
            this.featureLayer.applyEdits({
                deleteFeatures: this.graphics
            });
        }

        this.graphics = [];

        this.markers.forEach(point => {
            const marker = new Graphic({
                geometry: {
                    type: 'point',
                    latitude: point.lat,
                    longitude: point.lng,
                    spatialReference: this.view.spatialReference,
                } as any,
                symbol: this.markerSymbol,
            });

            this.graphics.push(marker);
        });

        this.featureLayer.applyEdits({
            addFeatures: this.graphics
        });

        setTimeout(() => {
            const opts = {
                duration: 3000  // Duration of animation will be 3 seconds
            };
            this.view.goTo(this.graphics, opts);
        }, 2000)

    }
}
