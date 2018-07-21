import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MapOverlayGeonameComponent} from '../../../map-features/components/map-overlay-geoname/map-overlay-geoname.component';
import {MapOverlayWaypointComponent} from '../../../flightroute/components/map-overlay-waypoint/map-overlay-waypoint.component';
import {MapOverlayReportingsectorComponent} from '../../../map-features/components/map-overlay-reportingsector/map-overlay-reportingsector.component';
import {MapOverlayTrafficComponent} from '../../../traffic/components/map-overlay-traffic/map-overlay-traffic.component';
import {MapOverlayAirportComponent} from '../../../map-features/components/map-overlay-airport/map-overlay-airport.component';
import {MapOverlayNavaidComponent} from '../../../map-features/components/map-overlay-navaid/map-overlay-navaid.component';
import {MapOverlayNotamComponent} from '../../../notam/components/map-overlay-notam/map-overlay-notam.component';
import {MapOverlayReportingpointComponent} from '../../../map-features/components/map-overlay-reportingpoint/map-overlay-reportingpoint.component';
import {MapOverlayUserpointComponent} from '../../../map-features/components/map-overlay-userpoint/map-overlay-userpoint.component';
import {MapContext} from '../../../map/model/map-context';


@Component({
    selector: 'app-map-overlay-container',
    templateUrl: './map-overlay-container.component.html',
    styleUrls: ['./map-overlay-container.component.css']
})
export class MapOverlayContainerComponent implements OnInit, OnDestroy {
    @ViewChild(MapOverlayAirportComponent) mapOverlayAirportComponent: MapOverlayAirportComponent;
    @ViewChild(MapOverlayNavaidComponent) mapOverlayNavaidComponent: MapOverlayNavaidComponent;
    @ViewChild(MapOverlayReportingpointComponent) mapOverlayReportingpointComponent: MapOverlayReportingpointComponent;
    @ViewChild(MapOverlayReportingsectorComponent) mapOverlayReportingsectorComponent: MapOverlayReportingsectorComponent;
    @ViewChild(MapOverlayUserpointComponent) mapOverlayUserpointComponent: MapOverlayUserpointComponent;
    @ViewChild(MapOverlayGeonameComponent) mapOverlayGeonameComponent: MapOverlayGeonameComponent;
    @ViewChild(MapOverlayTrafficComponent) mapOverlayTrafficComponent: MapOverlayTrafficComponent;
    @ViewChild(MapOverlayNotamComponent) mapOverlayNotamComponent: MapOverlayNotamComponent;
    @ViewChild(MapOverlayWaypointComponent) mapOverlayWaypointComponent: MapOverlayWaypointComponent;
    private airportOverlay: ol.Overlay;
    private navaidOverlay: ol.Overlay;
    private reportingpointOverlay: ol.Overlay;
    private reportingsectorOverlay: ol.Overlay;
    private userpointOverlay: ol.Overlay;
    private geonameOverlay: ol.Overlay;
    private trafficOverlay: ol.Overlay;
    private notamOverlay: ol.Overlay;
    private waypointOverlay: ol.Overlay;


    constructor() {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    public onOverlayClose() {
        // TODO
    }


    public onMapInitCompleted(mapContext: MapContext) {
        this.addMapOverlays(mapContext);
    }


    private addMapOverlays(mapContext: MapContext) {
        this.airportOverlay = mapContext.mapService.addOverlay(this.mapOverlayAirportComponent.getContainerHtmlElement());
        this.navaidOverlay = mapContext.mapService.addOverlay(this.mapOverlayNavaidComponent.getContainerHtmlElement());
        this.reportingpointOverlay = mapContext.mapService.addOverlay(this.mapOverlayReportingpointComponent.getContainerHtmlElement());
        this.reportingsectorOverlay = mapContext.mapService.addOverlay(this.mapOverlayReportingsectorComponent.getContainerHtmlElement());
        this.userpointOverlay = mapContext.mapService.addOverlay(this.mapOverlayUserpointComponent.getContainerHtmlElement());
        this.geonameOverlay = mapContext.mapService.addOverlay(this.mapOverlayGeonameComponent.getContainerHtmlElement());
        this.trafficOverlay = mapContext.mapService.addOverlay(this.mapOverlayTrafficComponent.getContainerHtmlElement());
        this.notamOverlay = mapContext.mapService.addOverlay(this.mapOverlayNotamComponent.getContainerHtmlElement());
        this.waypointOverlay = mapContext.mapService.addOverlay(this.mapOverlayWaypointComponent.getContainerHtmlElement());
    }
}
