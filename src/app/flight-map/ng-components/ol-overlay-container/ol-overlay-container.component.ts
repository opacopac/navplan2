import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OlOverlayGeonameComponent} from '../../ol-components/ol-overlay-geoname/ol-overlay-geoname.component';
import {OlOverlayWaypointComponent} from '../../ol-components/ol-overlay-waypoint/ol-overlay-waypoint.component';
import {OlOverlayReportingsectorComponent} from '../../ol-components/ol-overlay-reportingsector/ol-overlay-reportingsector.component';
import {OlOverlayTrafficComponent} from '../../../traffic/ol-components/ol-overlay-traffic/ol-overlay-traffic.component';
import {OlOverlayAirportComponent} from '../../ol-components/ol-overlay-airport/ol-overlay-airport.component';
import {OlOverlayNavaidComponent} from '../../ol-components/ol-overlay-navaid/ol-overlay-navaid.component';
import {OlOverlayNotamComponent} from '../../../notam/ng-components/map-overlay-notam/ol-overlay-notam.component';
import {OlOverlayReportingpointComponent} from '../../ol-components/ol-overlay-reportingpoint/ol-overlay-reportingpoint.component';
import {OlOverlayUserpointComponent} from '../../ol-components/ol-overlay-userpoint/ol-overlay-userpoint.component';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {DataItem, DataItemType} from '../../../common/model/data-item';
import {Subscription} from 'rxjs/internal/Subscription';
import {getShowOverlay} from '../../../base-map/ngrx/base-map.selectors';
import {Airport} from '../../../open-aip/domain-model/airport';
import {Navaid} from '../../../open-aip/domain-model/navaid';
import {Reportingpoint} from '../../../open-aip/domain-model/reportingpoint';
import {Reportingsector} from '../../../open-aip/domain-model/reportingsector';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {Userpoint} from '../../../open-aip/domain-model/userpoint';
import {Geoname} from '../../../open-aip/domain-model/geoname';
import {Traffic} from '../../../traffic/domain-model/traffic';
import {Notam} from '../../../notam/domain-model/notam';
import {Waypoint} from '../../../flightroute/domain-model/waypoint';
import {OlBaseMapService} from '../../../base-map/ol-service/ol-base-map.service';
import {MapOverlayState} from '../../../base-map/domain-model/map-overlay-state';


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


    constructor(
        private readonly appStore: Store<any>,
        private readonly mapService: OlBaseMapService
    ) {
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


    public onOverlayClosed() {
        // TODO: action
    }


    private showMapOverlay(dataItem: DataItem, clickPos: Position2d) {
        this.closeAllOverlays();

        if (!dataItem) {
            return;
        }

        switch (dataItem.dataItemType) {
            case DataItemType.airport:
                this.mapOverlayAirportComponent.setDataItem(dataItem as Airport, clickPos);
                break;
            case DataItemType.navaid:
                this.mapOverlayNavaidComponent.setDataItem(dataItem as Navaid, clickPos);
                break;
            case DataItemType.reportingPoint:
                this.mapOverlayReportingpointComponent.setDataItem(dataItem as Reportingpoint, clickPos);
                break;
            case DataItemType.reportingSector:
                this.mapOverlayReportingsectorComponent.setDataItem(dataItem as Reportingsector, clickPos);
                break;
            case DataItemType.userPoint:
                this.mapOverlayUserpointComponent.setDataItem(dataItem as Userpoint, clickPos);
                break;
            case DataItemType.geoname:
                this.mapOverlayGeonameComponent.setDataItem(dataItem as Geoname, clickPos);
                break;
            case DataItemType.traffic:
                this.mapOverlayTrafficComponent.setDataItem(dataItem as Traffic, clickPos);
                break;
            case DataItemType.notam:
                this.mapOverlayNotamComponent.setDataItem(dataItem as Notam, clickPos);
                break;
            case DataItemType.waypoint:
                this.mapOverlayWaypointComponent.setDataItem(dataItem as Waypoint, clickPos);
                break;
        }
    }


    private closeAllOverlays() {
        this.mapOverlayAirportComponent?.closeOverlay();
        this.mapOverlayNavaidComponent?.closeOverlay();
        this.mapOverlayReportingpointComponent?.closeOverlay();
        this.mapOverlayReportingsectorComponent?.closeOverlay();
        this.mapOverlayUserpointComponent?.closeOverlay();
        this.mapOverlayGeonameComponent?.closeOverlay();
        this.mapOverlayTrafficComponent?.closeOverlay();
        this.mapOverlayNotamComponent?.closeOverlay();
        this.mapOverlayWaypointComponent?.closeOverlay();
    }
}
