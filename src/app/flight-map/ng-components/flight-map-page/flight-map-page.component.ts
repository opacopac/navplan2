import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BaseMapActions} from '../../../base-map/ngrx/base-map.actions';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {Angle} from '../../../common/geo-math/domain-model/quantities/angle';
import {combineLatest} from 'rxjs';
import {take} from 'rxjs/operators';
import {getMapPosition, getMapRotation, getMapZoom} from '../../../base-map/ngrx/base-map.selectors';
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
import {getLocationState} from '../../../location/ngrx/location.selectors';
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
import {Subscription} from 'rxjs/internal/Subscription';
import {Airport} from '../../../airport/domain-model/airport';
import {
    getFlightMapAirportCircuits,
    getFlightMapAirportOverlay,
    getFlightMapAirports,
    getFlightMapAirspaces,
    getFlightMapNavaidOverlay,
    getFlightMapNavaids,
    getFlightMapReportingPointOverlay,
    getFlightMapReportingPoints,
    getFlightMapReportingSectorOverlay,
    getFlightMapReportingSectors,
    getFlightMapWebcams
} from '../../ngrx/flight-map.selectors';
import {OlAirportContainer} from '../../../airport/ol-components/ol-airport-container';
import {OlAirportCircuitContainer} from '../../../airport/ol-components/ol-airport-circuit-container';
import {OlReportingPointContainer} from '../../../airport/ol-components/ol-reporting-point-container';
import {OlReportingSectorContainer} from '../../../airport/ol-components/ol-reporting-sector-container';
import {ReportingPoint} from '../../../airport/domain-model/reporting-point';
import {ReportingSector} from '../../../airport/domain-model/reporting-sector';
import {OlAirspaceContainer} from '../../../airspace/ol-components/ol-airspace-container';
import {OlNavaidContainer} from '../../../navaid/ol-components/ol-navaid-container';
import {OlWebcamContainer} from '../../../webcam/ol-components/ol-webcam-container';
import {Navaid} from '../../../navaid/domain-model/navaid';


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
    private readonly showAirportOverlay$: Observable<Airport>;
    private readonly showReportingPointOverlay$: Observable<ReportingPoint>;
    private readonly showReportingSectorOverlay$: Observable<ReportingSector>;
    private readonly showNavaidOverlay$: Observable<Navaid>;
    private selectedDateItemSubscription: Subscription;
    private showAirportOverlaySubscription: Subscription;
    private showReportingPointOverlaySubscription: Subscription;
    private showReportingSectorOverlaySubscription: Subscription;
    private showNavaidOverlaySubscription: Subscription;
    private olAirportContainer: OlAirportContainer;
    private olAirportCircuitContainer: OlAirportCircuitContainer;
    private olReportingPointContainer: OlReportingPointContainer;
    private olReportingSectorContainer: OlReportingSectorContainer;
    private olAirpsaceContainer: OlAirspaceContainer;
    private olNavaidContainer: OlNavaidContainer;
    private olWebcamContainer: OlWebcamContainer;
    private olFlightroute: OlFlightrouteContainer;
    private olTrack: OlTrackContainer;
    private olNotams: OlNotamContainer;
    private olMetars: OlMetarContainer;
    private olTraffic: OlTrafficContainer;
    private olOwnPlane: OlOwnPlaneContainer;

    constructor(private readonly appStore: Store<any>) {
        this.showAirportOverlay$ = this.appStore.pipe(select(getFlightMapAirportOverlay));
        this.showReportingPointOverlay$ = this.appStore.pipe(select(getFlightMapReportingPointOverlay));
        this.showReportingSectorOverlay$ = this.appStore.pipe(select(getFlightMapReportingSectorOverlay));
        this.showNavaidOverlay$ = this.appStore.pipe(select(getFlightMapNavaidOverlay));
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

        this.showAirportOverlaySubscription = this.showAirportOverlay$.subscribe(airport => {
            this.mapOverlayAirportComponent.setDataItem(airport, undefined);
        });
        this.showReportingPointOverlaySubscription = this.showReportingPointOverlay$.subscribe(reportingPoint => {
            this.mapOverlayReportingpointComponent.setDataItem(reportingPoint, undefined);
        });
        this.showReportingSectorOverlaySubscription = this.showReportingSectorOverlay$.subscribe(reportingSector => {
            this.mapOverlayReportingsectorComponent.setDataItem(reportingSector, undefined); // TODO
        });
        this.showNavaidOverlaySubscription = this.showNavaidOverlay$.subscribe(navaid => {
            this.mapOverlayNavaidComponent.setDataItem(navaid, undefined);
        });
    }


    ngOnDestroy() {
        this.olAirportContainer.destroy();
        this.olAirportCircuitContainer.destroy();
        this.olReportingPointContainer.destroy();
        this.olReportingSectorContainer.destroy();
        this.olAirpsaceContainer.destroy();
        this.olNavaidContainer.destroy();
        this.olWebcamContainer.destroy();
        this.olMetars.destroy();
        this.olNotams.destroy();
        this.olTrack.destroy();
        this.olFlightroute.destroy();
        // TODO: destroy search result layer
        this.olTraffic.destroy();
        this.olOwnPlane.destroy();

        this.selectedDateItemSubscription.unsubscribe();
        this.showAirportOverlaySubscription.unsubscribe();
        this.showReportingPointOverlaySubscription.unsubscribe();
        this.showReportingSectorOverlaySubscription.unsubscribe();
    }

    // endregion


    // region events

    public onZoomInClicked() {
        this.appStore.dispatch(BaseMapActions.zoomIn());
    }


    public onZoomOutClicked() {
        this.appStore.dispatch(BaseMapActions.zoomOut());
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

        this.olAirportContainer = new OlAirportContainer(
            airportLayer,
            this.appStore.pipe(select(getFlightMapAirports))
        );
        this.olReportingPointContainer = new OlReportingPointContainer(
            reportingPointLayer,
            this.appStore.pipe(select(getFlightMapReportingPoints))
        );
        this.olReportingSectorContainer = new OlReportingSectorContainer(
            reportingSectorLayer,
            this.appStore.pipe(select(getFlightMapReportingSectors))
        );
        this.olAirportCircuitContainer = new OlAirportCircuitContainer(
            circuitLayer,
            this.appStore.pipe(select(getFlightMapAirportCircuits))
        );
        this.olAirpsaceContainer = new OlAirspaceContainer(
            airspaceLayer,
            this.appStore.pipe(select(getFlightMapAirspaces))
        );
        this.olNavaidContainer = new OlNavaidContainer(
            navaidLayer,
            this.appStore.pipe(select(getFlightMapNavaids))
        );
        this.olWebcamContainer = new OlWebcamContainer(
            webcamLayer,
            this.appStore.pipe(select(getFlightMapWebcams))
        );
        this.olMetars = new OlMetarContainer(
            metarTafLayer,
            this.appStore.pipe(select(getMetarTafList)),
            this.appStore.pipe(select(getFlightMapAirports)),
            rotation
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
            [
                userPointLayer,
                reportingPointLayer,
                navaidLayer,
                airportLayer
            ],
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


    private closeAllOverlays() {
        // this.mapOverlayAirportComponent?.closeOverlay();
        this.mapOverlayNavaidComponent?.closeOverlay();
        // this.mapOverlayReportingpointComponent?.closeOverlay();
        // this.mapOverlayReportingsectorComponent?.closeOverlay();
        this.mapOverlayUserpointComponent?.closeOverlay();
        this.mapOverlayGeonameComponent?.closeOverlay();
        this.mapOverlayTrafficComponent?.closeOverlay();
        this.mapOverlayNotamComponent?.closeOverlay();
        this.mapOverlayWaypointComponent?.closeOverlay();
    }
}
