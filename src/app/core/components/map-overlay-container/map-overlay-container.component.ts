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
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {DataItem, DataItemType} from '../../../shared/model/data-item';
import {Subscription} from 'rxjs/internal/Subscription';
import {getShowOverlay} from '../../../map/map.selectors';
import {Airport} from '../../../map-features/model/airport';
import {Navaid} from '../../../map-features/model/navaid';
import {Reportingpoint} from '../../../map-features/model/reportingpoint';
import {Reportingsector} from '../../../map-features/model/reportingsector';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {Userpoint} from '../../../map-features/model/userpoint';
import {Geoname} from '../../../map-features/model/geoname';
import {Traffic} from '../../../traffic/model/traffic';
import {Notam} from '../../../notam/model/notam';
import {Waypoint} from '../../../flightroute/model/waypoint';
import {MapOverlayState} from '../../../map/model/map-state';


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
    private showOverlay$: Observable<MapOverlayState>;
    private selectedDateItemSubscription: Subscription;


    constructor(private appStore: Store<any>) {
        this.showOverlay$ = this.appStore.select(getShowOverlay);
    }


    ngOnInit() {
        this.selectedDateItemSubscription = this.showOverlay$
            .subscribe((overlayState) => {
                this.showMapOverlay(overlayState.dataItem, overlayState.clickPos);
            });
    }


    ngOnDestroy() {
        this.selectedDateItemSubscription.unsubscribe();
    }


    public onMapInitCompleted(mapContext: MapContext) {
        this.addMapOverlays(mapContext);
    }


    public onOverlayClosed() {
        // TODO: action
    }


    private addMapOverlays(mapContext: MapContext) {
        this.mapOverlayAirportComponent.init(mapContext);
        this.mapOverlayNavaidComponent.init(mapContext);
        this.mapOverlayReportingpointComponent.init(mapContext);
        this.mapOverlayReportingsectorComponent.init(mapContext);
        this.mapOverlayUserpointComponent.init(mapContext);
        this.mapOverlayGeonameComponent.init(mapContext);
        this.mapOverlayTrafficComponent.init(mapContext);
        this.mapOverlayNotamComponent.init(mapContext);
        this.mapOverlayWaypointComponent.init(mapContext);
    }


    private showMapOverlay(dataItem: DataItem, clickPos: Position2d) {
        this.closeAllOverlays();

        if (!dataItem) {
            return;
        }

        switch (dataItem.dataItemType) {
            case DataItemType.airport:
                this.mapOverlayAirportComponent.bindFeatureData(dataItem as Airport, clickPos);
                break;
            case DataItemType.navaid:
                this.mapOverlayNavaidComponent.bindFeatureData(dataItem as Navaid, clickPos);
                break;
            case DataItemType.reportingPoint:
                this.mapOverlayReportingpointComponent.bindFeatureData(dataItem as Reportingpoint, clickPos);
                break;
            case DataItemType.reportingSector:
                this.mapOverlayReportingsectorComponent.bindFeatureData(dataItem as Reportingsector, clickPos);
                break;
            case DataItemType.userPoint:
                this.mapOverlayUserpointComponent.bindFeatureData(dataItem as Userpoint, clickPos);
                break;
            case DataItemType.geoname:
                this.mapOverlayGeonameComponent.bindFeatureData(dataItem as Geoname, clickPos);
                break;
            case DataItemType.traffic:
                this.mapOverlayTrafficComponent.bindFeatureData(dataItem as Traffic, clickPos);
                break;
            case DataItemType.notam:
                this.mapOverlayNotamComponent.bindFeatureData(dataItem as Notam, clickPos);
                break;
            case DataItemType.waypoint:
                this.mapOverlayWaypointComponent.bindFeatureData(dataItem as Waypoint, clickPos);
                break;
        }
    }


    private closeAllOverlays() {
        this.mapOverlayAirportComponent.closeOverlay();
        this.mapOverlayNavaidComponent.closeOverlay();
        this.mapOverlayReportingpointComponent.closeOverlay();
        this.mapOverlayReportingsectorComponent.closeOverlay();
        this.mapOverlayUserpointComponent.closeOverlay();
        this.mapOverlayGeonameComponent.closeOverlay();
        this.mapOverlayTrafficComponent.closeOverlay();
        this.mapOverlayNotamComponent.closeOverlay();
        this.mapOverlayWaypointComponent.closeOverlay();
    }
}
