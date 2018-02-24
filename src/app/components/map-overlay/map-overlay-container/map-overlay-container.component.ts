import { Component, OnInit, ViewChild} from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { OlFeature } from '../../../model/ol-model/ol-feature';
import { MapOverlayNotamComponent } from '../map-overlay-notam/map-overlay-notam.component';
import { MapOverlayReportingpointComponent } from '../map-overlay-reportingpoint/map-overlay-reportingpoint.component';
import { MapOverlayMetarTafComponent } from '../map-overlay-metar-taf/map-overlay-metar-taf.component';
import { MapOverlayTrafficComponent } from '../map-overlay-traffic/map-overlay-traffic.component';
import { MapOverlayReportingsectorComponent } from '../map-overlay-reportingsector/map-overlay-reportingsector.component';
import { MapOverlayNavaidComponent } from '../map-overlay-navaid/map-overlay-navaid.component';
import { MapOverlayMeteogramComponent } from '../map-overlay-meteogram/map-overlay-meteogram.component';
import { MapOverlayAirportComponent } from '../map-overlay-airport/map-overlay-airport.component';
import { MapOverlayUserpointComponent } from '../map-overlay-userpoint/map-overlay-userpoint.component';
import { OlReportingSector } from '../../../model/ol-model/ol-reporting-sector';
import { OlUserPoint } from '../../../model/ol-model/ol-user-point';
import { OlMetarSky } from '../../../model/ol-model/ol-metar-sky';
import { OlNavaid } from '../../../model/ol-model/ol-navaid';
import { OlReportingPoint } from '../../../model/ol-model/ol-reporting-point';
import { OlNotam } from '../../../model/ol-model/ol-notam';
import { OlAirport } from '../../../model/ol-model/ol-airport';
import { OlTraffic } from '../../../model/ol-model/ol-traffic';
import { OlWebcam } from '../../../model/ol-model/ol-webcam';
import { Position2d } from '../../../model/position';
import { MapOverlayContent } from '../map-overlay-content';


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


    public showOverlay(olFeature: OlFeature, clickPos: Position2d) {
        if (olFeature instanceof OlAirport) {
            this.currentOverlayContent = this.mapOverlayAirportComponent;
        } else if (olFeature instanceof OlNavaid) {
            this.currentOverlayContent = this.mapOverlayNavaidComponent;
        } else if (olFeature instanceof OlReportingPoint) {
            this.currentOverlayContent = this.mapOverlayReportingpointComponent;
        } else if (olFeature instanceof OlReportingSector) {
            this.currentOverlayContent = this.mapOverlayReportingsectorComponent;
        } else if (olFeature instanceof OlUserPoint) {
            this.currentOverlayContent = this.mapOverlayUserpointComponent;
        } else if (olFeature instanceof OlMetarSky) {
            this.currentOverlayContent = this.mapOverlayMetarTafComponent;
        } else if (olFeature instanceof OlNotam) {
            this.currentOverlayContent = this.mapOverlayNotamComponent;
        } else if (olFeature instanceof OlTraffic) {
            this.currentOverlayContent = this.mapOverlayTrafficComponent;
        } else if (olFeature instanceof OlWebcam) {
            const url = (olFeature as OlWebcam).webcam.url;
            window.open(url, '_blank');
            return;
        } else {
            return;
        }

        this.currentOverlayContent.bindFeatureData(olFeature.getDataItem());
        this.title = this.currentOverlayContent.getTitle();
        this.mapService.addOverlay(this.currentOverlayContent.getPosition(clickPos), this.mapOverlayContainer, true);
    }


    public closeOverlay() {
        this.mapService.closeOverlay();
    }


    public onOverlayClosed() {
        this.currentOverlayContent.bindFeatureData(undefined);
        this.currentOverlayContent = undefined;
        this.title = undefined;
    }
}
