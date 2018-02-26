import { Component, OnInit, ViewChild} from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { MapOverlayNotamComponent } from '../map-overlay-notam/map-overlay-notam.component';
import { MapOverlayReportingpointComponent } from '../map-overlay-reportingpoint/map-overlay-reportingpoint.component';
import { MapOverlayMetarTafComponent } from '../map-overlay-metar-taf/map-overlay-metar-taf.component';
import { MapOverlayTrafficComponent } from '../map-overlay-traffic/map-overlay-traffic.component';
import { MapOverlayReportingsectorComponent } from '../map-overlay-reportingsector/map-overlay-reportingsector.component';
import { MapOverlayNavaidComponent } from '../map-overlay-navaid/map-overlay-navaid.component';
import { MapOverlayMeteogramComponent } from '../map-overlay-meteogram/map-overlay-meteogram.component';
import { MapOverlayAirportComponent } from '../map-overlay-airport/map-overlay-airport.component';
import { MapOverlayUserpointComponent } from '../map-overlay-userpoint/map-overlay-userpoint.component';
import { MapOverlayGeonameComponent } from '../map-overlay-geoname/map-overlay-geoname.component';
import { Position2d } from '../../../model/position';
import { MapOverlayContent } from '../map-overlay-content';
import { DataItem } from '../../../model/data-item';
import { Airport } from '../../../model/airport';
import { Navaid } from '../../../model/navaid';
import { Reportingpoint } from '../../../model/reportingpoint';
import { Reportingsector } from '../../../model/reportingsector';
import { Userpoint } from '../../../model/userpoint';
import { MetarTaf } from '../../../model/metar-taf';
import { Traffic } from '../../../model/traffic';
import { Notam } from '../../../model/notam';
import { Webcam } from '../../../model/webcam';
import { Geoname } from '../../../model/geoname';


@Component({
    selector: 'app-map-overlay-container',
    templateUrl: './map-overlay-container.component.html',
    styleUrls: ['./map-overlay-container.component.css']
})
export class MapOverlayContainerComponent implements OnInit {
    public title: string;
    private currentOverlayContent: MapOverlayContent;
    private mapOverlayContainer: HTMLElement;
    @ViewChild(MapOverlayAirportComponent) mapOverlayAirportComponent: MapOverlayAirportComponent;
    @ViewChild(MapOverlayNavaidComponent) mapOverlayNavaidComponent: MapOverlayNavaidComponent;
    @ViewChild(MapOverlayReportingpointComponent) mapOverlayReportingpointComponent: MapOverlayReportingpointComponent;
    @ViewChild(MapOverlayReportingsectorComponent) mapOverlayReportingsectorComponent: MapOverlayReportingsectorComponent;
    @ViewChild(MapOverlayUserpointComponent) mapOverlayUserpointComponent: MapOverlayUserpointComponent;
    @ViewChild(MapOverlayGeonameComponent) mapOverlayGeonameComponent: MapOverlayGeonameComponent;
    @ViewChild(MapOverlayMetarTafComponent) mapOverlayMetarTafComponent: MapOverlayMetarTafComponent;
    @ViewChild(MapOverlayMeteogramComponent) mapOverlayMeteogramComponent: MapOverlayMeteogramComponent;
    @ViewChild(MapOverlayNotamComponent) mapOverlayNotamComponent: MapOverlayNotamComponent;
    @ViewChild(MapOverlayTrafficComponent) mapOverlayTrafficComponent: MapOverlayTrafficComponent;


    constructor(
        private mapService: MapService) {
    }


    ngOnInit() {
        this.mapOverlayContainer = document.getElementById('map-overlay-container');
    }


    public showOverlay(dataItem: DataItem, clickPos: Position2d) {
        if (this.currentOverlayContent) {
            this.closeOverlay();
        }

        if (dataItem instanceof Airport) {
            this.currentOverlayContent = this.mapOverlayAirportComponent;
        } else if (dataItem instanceof Navaid) {
            this.currentOverlayContent = this.mapOverlayNavaidComponent;
        } else if (dataItem instanceof Reportingpoint) {
            this.currentOverlayContent = this.mapOverlayReportingpointComponent;
        } else if (dataItem instanceof Reportingsector) {
            this.currentOverlayContent = this.mapOverlayReportingsectorComponent;
        } else if (dataItem instanceof Userpoint) {
            this.currentOverlayContent = this.mapOverlayUserpointComponent;
        } else if (dataItem instanceof Geoname) {
            this.currentOverlayContent = this.mapOverlayGeonameComponent;
        } else if (dataItem instanceof MetarTaf) {
            this.currentOverlayContent = this.mapOverlayMetarTafComponent;
        } else if (dataItem instanceof Notam) {
            this.currentOverlayContent = this.mapOverlayNotamComponent;
        } else if (dataItem instanceof Traffic) {
            this.currentOverlayContent = this.mapOverlayTrafficComponent;
        } else if (dataItem instanceof Webcam) {
            window.open(dataItem.url, '_blank');
            return;
        } else {
            return;
        }

        this.currentOverlayContent.bindFeatureData(dataItem);
        this.title = this.currentOverlayContent.getTitle();
        this.mapService.addOverlay(this.currentOverlayContent.getPosition(clickPos), this.mapOverlayContainer, true);
    }


    public closeOverlay() {
        this.mapService.closeOverlay();
    }


    public onOverlayClosed() {
        if (this.currentOverlayContent) {
            this.currentOverlayContent.bindFeatureData(undefined);
        }
        this.currentOverlayContent = undefined;
        this.title = undefined;
    }
}
