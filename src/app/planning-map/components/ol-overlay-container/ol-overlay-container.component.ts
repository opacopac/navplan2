import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OlOverlayGeonameComponent} from '../../ol-components/ol-overlay-geoname/ol-overlay-geoname.component';
import {OlOverlayWaypointComponent} from '../../ol-components/ol-overlay-waypoint/ol-overlay-waypoint.component';
import {OlOverlayReportingsectorComponent} from '../../ol-components/ol-overlay-reportingsector/ol-overlay-reportingsector.component';
import {OlOverlayTrafficComponent} from '../../../traffic/components/ol-overlay-traffic/ol-overlay-traffic.component';
import {OlOverlayAirportComponent} from '../../ol-components/ol-overlay-airport/ol-overlay-airport.component';
import {OlOverlayNavaidComponent} from '../../ol-components/ol-overlay-navaid/ol-overlay-navaid.component';
import {OlOverlayNotamComponent} from '../../../notam/components/map-overlay-notam/ol-overlay-notam.component';
import {OlOverlayReportingpointComponent} from '../../ol-components/ol-overlay-reportingpoint/ol-overlay-reportingpoint.component';
import {OlOverlayUserpointComponent} from '../../ol-components/ol-overlay-userpoint/ol-overlay-userpoint.component';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {DataItem, DataItemType} from '../../../shared/model/data-item';
import {Subscription} from 'rxjs/internal/Subscription';
import {getShowOverlay} from '../../../base-map/base-map.selectors';
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
import {MapOverlayState} from '../../../base-map/base-map-state';
import {BaseMapService} from '../../../base-map/services/base-map.service';


@Component({
    selector: 'app-ol-overlay-container',
    templateUrl: './ol-overlay-container.component.html',
    styleUrls: ['./ol-overlay-container.component.css']
})
export class OlOverlayContainerComponent implements OnInit, OnDestroy {
    @ViewChild(OlOverlayAirportComponent) mapOverlayAirportComponent: OlOverlayAirportComponent;
    @ViewChild(OlOverlayNavaidComponent) mapOverlayNavaidComponent: OlOverlayNavaidComponent;
    @ViewChild(OlOverlayReportingpointComponent) mapOverlayReportingpointComponent: OlOverlayReportingpointComponent;
    @ViewChild(OlOverlayReportingsectorComponent) mapOverlayReportingsectorComponent: OlOverlayReportingsectorComponent;
    @ViewChild(OlOverlayUserpointComponent) mapOverlayUserpointComponent: OlOverlayUserpointComponent;
    @ViewChild(OlOverlayGeonameComponent) mapOverlayGeonameComponent: OlOverlayGeonameComponent;
    @ViewChild(OlOverlayTrafficComponent) mapOverlayTrafficComponent: OlOverlayTrafficComponent;
    @ViewChild(OlOverlayNotamComponent) mapOverlayNotamComponent: OlOverlayNotamComponent;
    @ViewChild(OlOverlayWaypointComponent) mapOverlayWaypointComponent: OlOverlayWaypointComponent;
    private showOverlay$: Observable<MapOverlayState>;
    private selectedDateItemSubscription: Subscription;


    constructor(private appStore: Store<any>) {
        this.showOverlay$ = this.appStore.pipe(select(getShowOverlay));
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


    public onMapInitCompleted(mapService: BaseMapService) {
        this.addMapOverlays(mapService);
    }


    public onOverlayClosed() {
        // TODO: action
    }


    private addMapOverlays(mapService: BaseMapService) {
        this.mapOverlayAirportComponent.init(mapService);
        this.mapOverlayNavaidComponent.init(mapService);
        this.mapOverlayReportingpointComponent.init(mapService);
        this.mapOverlayReportingsectorComponent.init(mapService);
        this.mapOverlayUserpointComponent.init(mapService);
        this.mapOverlayGeonameComponent.init(mapService);
        this.mapOverlayTrafficComponent.init(mapService);
        this.mapOverlayNotamComponent.init(mapService);
        this.mapOverlayWaypointComponent.init(mapService);
    }


    private showMapOverlay(dataItem: DataItem, clickPos: Position2d) {
        this.closeAllOverlays();

        if (!dataItem) {
            return;
        }

        switch (dataItem.dataItemType) {
            case DataItemType.airport:
                this.mapOverlayAirportComponent.bindDataItem(dataItem as Airport, clickPos);
                break;
            case DataItemType.navaid:
                this.mapOverlayNavaidComponent.bindDataItem(dataItem as Navaid, clickPos);
                break;
            case DataItemType.reportingPoint:
                this.mapOverlayReportingpointComponent.bindDataItem(dataItem as Reportingpoint, clickPos);
                break;
            case DataItemType.reportingSector:
                this.mapOverlayReportingsectorComponent.bindDataItem(dataItem as Reportingsector, clickPos);
                break;
            case DataItemType.userPoint:
                this.mapOverlayUserpointComponent.bindDataItem(dataItem as Userpoint, clickPos);
                break;
            case DataItemType.geoname:
                this.mapOverlayGeonameComponent.bindDataItem(dataItem as Geoname, clickPos);
                break;
            case DataItemType.traffic:
                this.mapOverlayTrafficComponent.bindDataItem(dataItem as Traffic, clickPos);
                break;
            case DataItemType.notam:
                this.mapOverlayNotamComponent.bindDataItem(dataItem as Notam, clickPos);
                break;
            case DataItemType.waypoint:
                this.mapOverlayWaypointComponent.bindDataItem(dataItem as Waypoint, clickPos);
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
