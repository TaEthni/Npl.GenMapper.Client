
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
    Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Graphic from '@arcgis/core/Graphic';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Locate from '@arcgis/core/widgets/Locate';
import Search from '@arcgis/core/widgets/Search';
import { LocationDialogConfig } from '../location-dialog/location-dialog.component';

@Component({
    selector: 'app-location-map-dialog',
    templateUrl: './location-map-dialog.component.html',
    styleUrls: ['./location-map-dialog.component.scss'],
})
export class LocationMapDialogComponent implements AfterViewInit, OnDestroy {
    constructor(
        private dialogRef: MatDialogRef<LocationDialogConfig>,
        @Inject(MAT_DIALOG_DATA) public data: LocationDialogConfig
    ) {
        this.latitude = data.latitude || 0;
        this.longitude = data.longitude || 0;
        this.isIpGeolocation = data.isIpGeolocation;
    }
    public view: MapView;
    public latitude: number;
    public longitude: number;
    public address: string;
    private zoom: number;
    private marker: Graphic;
    private searchWidget: Search;
    private isIpGeolocation: boolean;
    private isInitEvent: boolean;
    private isLocateEvent: boolean;
    private isClickEvent: boolean;

    // The <div> where we will place the map
    @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

    initializeMap(): Promise<any> {
        const container = this.mapViewEl.nativeElement;

        const map = new Map({
            basemap: 'streets-navigation-vector',
        });

        this.zoom = this.longitude && this.latitude ? 14 : 1;
        if (this.isIpGeolocation) this.zoom = 9;

        const view = new MapView({
            container,
            map,
            zoom: this.zoom,
            center: [this.longitude, this.latitude] // lon, lat
        });

        this.view = view;

        this.initializeLocate();
        this.initializeSearchWidget();

        this.view.on('click', (event) => {
            this.isClickEvent = true;
            this.setMarker(event.mapPoint, 14);
            this.searchWidget.search(this.marker.geometry).then(() => {
                this.isClickEvent = false;
            });
        });

        return this.view.when();
    }

    ngAfterViewInit(): any {
        // Initialize MapView and return an instance of MapView
        this.initializeMap().then(() => {
            // The map has been initialized
            if (!this.isIpGeolocation) {
                if (this.longitude && this.latitude) {
                    this.isInitEvent = true;
                    const marker = this.setMarker({
                        longitude: this.longitude,
                        latitude: this.latitude,
                    }, this.zoom);
                    this.searchWidget.search(marker.geometry).then(() => {
                        this.isInitEvent = false;
                    });
                }
            }
        }, error => console.error('Error with map: ', error));
    }

    ngOnDestroy(): void {
        if (this.view) {
            // destroy the map view
            this.view.destroy();
        }
    }

    public onSubmit(): void {
        this.dialogRef.close({
            address: this.address,
            // placeId: this.placeId,
            latitude: this.latitude,
            longitude: this.longitude
        });
    }

    private readonly markerSymbol = {
        type: 'simple-marker',
        color: [226, 119, 40],
        outline: {
            color: [255, 255, 255],
            width: 2
        }
    };

    private initializeLocate(): void {
        if (this.isIpGeolocation) return;
        const locate = new Locate({
            view: this.view,
            useHeadingEnabled: false,
            goToLocationEnabled: true
        });
        locate.on('locate', (locateEvent: any) => {
            const position = locateEvent.position;
            this.zoom = this.zoom;
            this.longitude = position.coords.longitude;
            this.latitude = position.coords.latitude;

            this.isLocateEvent = true;
            this.searchWidget.search(locate.graphic.geometry).then(() => {
                this.isLocateEvent = false;
            });
        });
        this.view.ui.add(locate, 'top-left');
    };

    private initializeSearchWidget(): void {
        const searchWidget = new Search({
            view: this.view,
            locationEnabled: false,
            resultGraphicEnabled: false,
            popupEnabled: false,
        });
        searchWidget.goToOverride = (view: MapView | any, params: any) => {
            if (this.isClickEvent || this.isLocateEvent || this.isInitEvent) {
                params.target.zoom = this.zoom;
            }
            return view.goTo(params.target, params.options);
        };
        searchWidget.on("select-result", (event) => {
            this.address = event.result.name;
            const geometry: any = event.result.feature.geometry;

            this.setMarker(geometry);
            this.view.set('zoom', this.zoom);
        });
        this.searchWidget = searchWidget;
        this.view.ui.add(searchWidget, "top-right");
    };

    private setMarker(value: { longitude: number, latitude: number }, zoom?: number): Graphic {
        this.longitude = value.longitude;
        this.latitude = value.latitude;

        if (zoom) this.zoom = zoom;

        this.marker = new Graphic({
            geometry: {
                type: 'point',
                latitude: this.latitude,
                longitude: this.longitude,
            } as any,
            symbol: this.markerSymbol,
        });

        this.view.graphics.removeAll();
        this.view.graphics.add(this.marker);

        return this.marker;
    };
}
