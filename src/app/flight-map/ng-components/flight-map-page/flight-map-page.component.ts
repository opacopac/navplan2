import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BaseMapZoomInAction, BaseMapZoomOutAction} from '../../../base-map/ngrx/base-map.actions';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {Angle} from '../../../common/geo-math/domain-model/quantities/angle';
import {combineLatest} from 'rxjs';
import {take} from 'rxjs/operators';
import {getMapPosition, getMapRotation, getMapZoom, getShowOverlay} from '../../../base-map/ngrx/base-map.selectors';
import {OlOpenAipItemsContainer} from '../../../open-aip/ol-components/ol-open-aip-items-container';
import {getOpenAipAirports, getOpenAipItems} from '../../../open-aip/ngrx/open-aip.selectors';
import {OlMetarContainer} from '../../../metar-taf/ol-components/ol-metar-container';
import {getMetarTafList} from '../../../metar-taf/ngrx/metar-taf.selectors';
import {OlNotamContainer} from '../../../notam/ol-components/ol-notam-container';
import {getNotamList} from '../../../notam/ngrx/notam.selectors';
import {OlTrackContainer} from '../../../track/ol-components/ol-track-container';
import {getShowTrack} from '../../../track/ngrx/track.selectors';
import {OlFlightrouteContainer} from '../../../flightroute/ol-components/ol-flightroute-container';
import {getFlightroute} from '../../../flightroute/ngrx/flightroute.selectors';
import {OlTrafficContainer} from '../../../traffic/ol-components/ol-traffic-container';
import {getTrafficState} from '../../../traffic/ngrx/traffic.selectors';
import {OlOwnPlaneContainer} from '../../../location/ol-components/ol-own-plane-container';
import {getLocationState} from '../../../location/location.selectors';
import {MapBaseLayerType} from '../../../base-map/domain-model/map-base-layer-type';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';
import {OlMapContainerComponent} from '../../../base-map/ng-components/ol-map-container/ol-map-container.component';
import {OlOverlayAirportComponent} from '../../ol-components/ol-overlay-airport/ol-overlay-airport.component';
import {OlOverlayNavaidComponent} from '../../ol-components/ol-overlay-navaid/ol-overlay-navaid.component';
import {OlOverlayReportingpointComponent} from '../../ol-components/ol-overlay-reportingpoint/ol-overlay-reportingpoint.component';
import {OlOverlayReportingsectorComponent} from '../../ol-components/ol-overlay-reportingsector/ol-overlay-reportingsector.component';
import {OlOverlayUserpointComponent} from '../../ol-components/ol-overlay-userpoint/ol-overlay-userpoint.component';
import {OlOverlayGeonameComponent} from '../../ol-components/ol-overlay-geoname/ol-overlay-geoname.component';
import {OlOverlayTrafficComponent} from '../../../traffic/ol-components/ol-overlay-traffic/ol-overlay-traffic.component';
import {OlOverlayNotamComponent} from '../../../notam/ng-components/map-overlay-notam/ol-overlay-notam.component';
import {OlOverlayWaypointComponent} from '../../ol-components/ol-overlay-waypoint/ol-overlay-waypoint.component';
import {Observable} from 'rxjs/internal/Observable';
import {MapOverlayState} from '../../../base-map/domain-model/map-overlay-state';
import {Subscription} from 'rxjs/internal/Subscription';
import {DataItem, DataItemType} from '../../../common/model/data-item';
import {Airport} from '../../../open-aip/domain-model/airport';
import {Navaid} from '../../../open-aip/domain-model/navaid';
import {Reportingpoint} from '../../../open-aip/domain-model/reportingpoint';
import {Reportingsector} from '../../../open-aip/domain-model/reportingsector';
import {Userpoint} from '../../../open-aip/domain-model/userpoint';
import {Geoname} from '../../../open-aip/domain-model/geoname';
import {Traffic} from '../../../traffic/domain-model/traffic';
import {Notam} from '../../../notam/domain-model/notam';
import {Waypoint} from '../../../flightroute/domain-model/waypoint';


@Component({
    selector: 'app-flight-map-page',
    templateUrl: './flight-map-page.component.html',
    styleUrls: ['./flight-map-page.component.css']
})
export class FlightMapPageComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(OlMapContainerComponent) mapContainer: OlMapContainerComponent;
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
    private olOpenAipItems: OlOpenAipItemsContainer;
    private olFlightroute: OlFlightrouteContainer;
    private olTrack: OlTrackContainer;
    private olNotams: OlNotamContainer;
    private olMetars: OlMetarContainer;
    private olTraffic: OlTrafficContainer;
    private olOwnPlane: OlOwnPlaneContainer;

    constructor(private readonly appStore: Store<any>) {
        this.showOverlay$ = this.appStore.pipe(select(getShowOverlay));
    }


    // region life cycle

    ngOnInit() {
    }


    ngAfterViewInit() {
        // initial position
        combineLatest([
            this.appStore.pipe(select(getMapPosition)),
            this.appStore.pipe(select(getMapZoom)),
            this.appStore.pipe(select(getMapRotation))
        ]).pipe(
            take(1)
        ).subscribe(([pos, zoom, rot]) => {
            this.initMap(pos, zoom, rot);
        });

        this.selectedDateItemSubscription = this.showOverlay$.subscribe((overlayState) => {
            this.showMapOverlay(overlayState.dataItem, overlayState.clickPos);
        });
    }


    ngOnDestroy() {
        this.olOpenAipItems.destroy();
        this.olMetars.destroy();
        this.olNotams.destroy();
        this.olTrack.destroy();
        this.olFlightroute.destroy();
        // TODO: destroy search result layer
        this.olTraffic.destroy();
        this.olOwnPlane.destroy();

        this.selectedDateItemSubscription.unsubscribe();
    }

    // endregion


    // region events

    public onZoomInClicked() {
        this.appStore.dispatch(
            new BaseMapZoomInAction()
        );
    }


    public onZoomOutClicked() {
        this.appStore.dispatch(
            new BaseMapZoomOutAction()
        );
    }

    // endregion


    // region init map

    private initMap(
        position: Position2d,
        zoom: number,
        rotation: Angle
    ) {
        const flightrouteLayer = OlHelper.createEmptyVectorLayer(false);
        const ownPlaneLayer = OlHelper.createEmptyVectorLayer(false);
        const metarTafLayer = OlHelper.createEmptyVectorLayer(false);
        const notamLayer = OlHelper.createEmptyVectorLayer(true);
        const airspaceLayer = OlHelper.createEmptyVectorLayer(true);
        const reportingSectorLayer = OlHelper.createEmptyVectorLayer(true);
        const webcamLayer = OlHelper.createEmptyVectorLayer(false);
        const userPointLayer = OlHelper.createEmptyVectorLayer(false);
        const reportingPointLayer = OlHelper.createEmptyVectorLayer(false);
        const navaidLayer = OlHelper.createEmptyVectorLayer(false);
        const airportLayer = OlHelper.createEmptyVectorLayer(false);
        const trackLayer = OlHelper.createEmptyVectorLayer(false);
        const trafficLayer = OlHelper.createEmptyVectorLayer(false);
        const circuitLayer = OlHelper.createEmptyVectorLayer(false);

        this.mapContainer.init(
            MapBaseLayerType.OPENTOPOMAP,
            [
                flightrouteLayer,
                ownPlaneLayer,
                metarTafLayer,
                notamLayer,
                airspaceLayer,
                reportingSectorLayer,
                webcamLayer,
                userPointLayer,
                reportingPointLayer,
                navaidLayer,
                airportLayer,
                trackLayer,
                trafficLayer,
                circuitLayer
            ],
            [
                this.mapOverlayAirportComponent.olOverlay,
                this.mapOverlayNavaidComponent.olOverlay,
                this.mapOverlayReportingpointComponent.olOverlay,
                this.mapOverlayReportingsectorComponent.olOverlay,
                this.mapOverlayUserpointComponent.olOverlay,
                this.mapOverlayGeonameComponent.olOverlay,
                this.mapOverlayTrafficComponent.olOverlay,
                this.mapOverlayNotamComponent.olOverlay,
                this.mapOverlayWaypointComponent.olOverlay
            ],
            position,
            zoom,
            rotation
        );

        this.olOpenAipItems = new OlOpenAipItemsContainer(
            airspaceLayer,
            reportingSectorLayer,
            webcamLayer,
            userPointLayer,
            reportingPointLayer,
            navaidLayer,
            airportLayer,
            circuitLayer,
            this.appStore.pipe(select(getOpenAipItems))
        );
        this.olMetars = new OlMetarContainer(
            metarTafLayer,
            this.appStore.pipe(select(getMetarTafList)),
            this.appStore.pipe(select(getOpenAipAirports)),
            Angle.createZero()
            // this.mapService.getRotation()
        );
        this.olNotams = new OlNotamContainer(
            notamLayer,
            this.appStore.pipe(select(getNotamList))
        );
        this.olTrack = new OlTrackContainer(
            trackLayer,
            this.appStore.pipe(select(getShowTrack))
        );
        this.olFlightroute = new OlFlightrouteContainer(
            flightrouteLayer,
            this.appStore.pipe(select(getFlightroute)),
            this.olOpenAipItems.getSnapToLayers(),
            this.appStore,
            rotation
        );
        // TODO: search results
        this.olTraffic = new OlTrafficContainer(
            trafficLayer,
            this.appStore.pipe(select(getTrafficState))
        );
        this.olOwnPlane = new OlOwnPlaneContainer(
            ownPlaneLayer,
            this.appStore.pipe(select(getLocationState))
        );


        // TODO: init overlays, add to map
    }

    // endregion


    // region overlay

    public onOverlayClosed() {
        // TODO
        this.closeAllOverlays();
    }


    // TODO => effects / state?
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