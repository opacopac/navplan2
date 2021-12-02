import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BaseMapActions} from '../../../base-map/ngrx/base-map.actions';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {Angle} from '../../../common/geo-math/domain-model/quantities/angle';
import {combineLatest} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {getMapPosition, getMapRotation, getMapZoom} from '../../../base-map/ngrx/base-map.selectors';
import {OlMetarContainer} from '../../../metar-taf/ol-components/ol-metar-container';
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
import {OlMapContainerComponent} from '../../../base-map/ng-components/ol-map-container/ol-map-container.component';
import {OlOverlayTrafficComponent} from '../../../traffic/ng-components/ol-overlay-traffic/ol-overlay-traffic.component';
import {Observable} from 'rxjs/internal/Observable';
import {Subscription} from 'rxjs/internal/Subscription';
import {getFlightMapOverlay} from '../../ngrx/flight-map.selectors';
import {OlAirportContainer} from '../../../aerodrome/ol-components/airport/ol-airport-container';
import {OlAirportCircuitContainer} from '../../../aerodrome/ol-components/airport-circuit/ol-airport-circuit-container';
import {OlReportingPointContainer} from '../../../aerodrome/ol-components/reporting-point-sector/ol-reporting-point-container';
import {OlReportingSectorContainer} from '../../../aerodrome/ol-components/reporting-point-sector/ol-reporting-sector-container';
import {OlAirspaceContainer} from '../../../enroute/ol-components/airspace/ol-airspace-container';
import {OlNavaidContainer} from '../../../enroute/ol-components/navaid/ol-navaid-container';
import {OlWebcamContainer} from '../../../webcam/ol-components/ol-webcam-container';
import {OlAirportChartContainer} from '../../../aerodrome/ol-components/airport-chart/ol-airport-chart-container';
import {OlPositionSearchContainer} from '../../../search/ol-components/ol-position-search-container';
import {getPositionSearchState} from '../../../search/ngrx/search.selectors';
import {getWebcams} from '../../../webcam/ngrx/webcam.selectors';
import {getMetarTafs} from '../../../metar-taf/ngrx/metar-taf.selectors';
import {getAirspaces} from '../../../enroute/ngrx/airspace/airspace.selectors';
import {getNavaids} from '../../../enroute/ngrx/navaid/navaid.selectors';
import {getAirports} from '../../../aerodrome/ngrx/airport/airport.selectors';
import {
    getReportingPoints,
    getReportingSectors
} from '../../../aerodrome/ngrx/reporting-point-sector/reporting-point-sector.selectors';
import {getAirportCircuits} from '../../../aerodrome/ngrx/airport-circuit/airport-circuit.selectors';
import {getAirportCharts} from '../../../aerodrome/ngrx/airport-chart/airport-chart.selectors';
import {OlMapOverlayComponent} from '../ol-map-overlay/ol-map-overlay.component';
import {OverlayState} from '../../domain-model/overlay-state';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';
import {getVerticalMapState} from '../../../vertical-map/ngrx/vertical-map.selectors';
import {VerticalMapButtonStatus} from '../../../vertical-map/domain-model/vertical-map-button-status';
import {getMeteoSmaState} from '../../../meteo-sma/ngrx/meteo-sma.selectors';
import {MeteoSmaButtonStatus} from '../../../meteo-sma/domain-model/meteo-sma-button-status';
import {OlSmaMeasurementContainer} from '../../../meteo-sma/ol-components/ol-sma-measurement-container';
import {OlOverlayAirspaceContainerComponent} from '../../../search/ng-components/ol-overlay-airspace-container/ol-overlay-airspace-container.component';


@Component({
    selector: 'app-flight-map-page',
    templateUrl: './flight-map-page.component.html',
    styleUrls: ['./flight-map-page.component.css']
})
export class FlightMapPageComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(OlMapContainerComponent) mapContainer: OlMapContainerComponent;
    @ViewChild(OlMapOverlayComponent) mapOverlayComponent: OlMapOverlayComponent;
    @ViewChild(OlOverlayTrafficComponent) mapOverlayTrafficComponent: OlOverlayTrafficComponent;
    @ViewChild(OlOverlayAirspaceContainerComponent) mapOverlayAirspaceContainerComponent: OlOverlayAirspaceContainerComponent;
    private showOverlaySubscription: Subscription;
    private olAirportContainer: OlAirportContainer;
    private olAirportChartContainer: OlAirportChartContainer;
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
    private olPositionSearchContainer: OlPositionSearchContainer;
    private olTraffic: OlTrafficContainer;
    private olOwnPlane: OlOwnPlaneContainer;
    private olSmaMeasurementsContainer: OlSmaMeasurementContainer;
    private flightroute$ = this.appStore.pipe(select(getFlightroute));
    private readonly showOverlay$: Observable<OverlayState> = this.appStore.pipe(select(getFlightMapOverlay));
    private readonly meteoSmaState$ = this.appStore.pipe(select(getMeteoSmaState));
    public readonly showMeteoSmaMeasurements$ = this.meteoSmaState$.pipe(map(state => state.buttonStatus === MeteoSmaButtonStatus.CURRENT));
    private readonly verticalMapState$ = this.appStore.pipe(select(getVerticalMapState));
    public readonly showVerticalMapButton$ = this.flightroute$.pipe(map(route => route.waypoints.length >= 2));
    public readonly showVerticalMap$ = this.verticalMapState$.pipe(map(state => state.buttonStatus === VerticalMapButtonStatus.CURRENT));


    constructor(private readonly appStore: Store<any>) {
    }


    // region life cycle

    ngOnInit() {
    }


    ngAfterViewInit() {
        // get initial position
        combineLatest([
            this.appStore.pipe(select(getMapPosition)),
            this.appStore.pipe(select(getMapZoom)),
            this.appStore.pipe(select(getMapRotation))
        ]).pipe(
            take(1)
        ).subscribe(([pos, zoom, rot]) => {
            this.initMap(pos, zoom, rot);
        });

        this.showOverlaySubscription = this.showOverlay$.subscribe(overlayState => {
            this.mapOverlayComponent?.closeOverlay();
            this.mapOverlayTrafficComponent?.closeOverlay();
            this.mapOverlayAirspaceContainerComponent.closeOverlay();
            this.mapOverlayComponent?.showOverlay(overlayState);
        });
    }


    ngOnDestroy() {
        this.olAirportContainer.destroy();
        this.olAirportChartContainer.destroy();
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
        this.olPositionSearchContainer.destroy();
        this.olTraffic.destroy();
        this.olOwnPlane.destroy();
        this.olSmaMeasurementsContainer.destroy();

        this.showOverlaySubscription.unsubscribe();
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
        const flightrouteLayer = new OlVectorLayer();
        const ownPlaneLayer = new OlVectorLayer();
        const metarTafLayer = new OlVectorLayer();
        const notamLayer = new OlVectorLayer();
        const airspaceLayer = new OlVectorLayer();
        const reportingSectorLayer = new OlVectorLayer();
        const webcamLayer = new OlVectorLayer();
        const userPointLayer = new OlVectorLayer();
        const reportingPointLayer = new OlVectorLayer();
        const navaidLayer = new OlVectorLayer();
        const airportLayer = new OlVectorLayer();
        const trackLayer = new OlVectorLayer();
        const trafficLayer = new OlVectorLayer();
        const circuitLayer = new OlVectorLayer();
        const chartCloserLayer = new OlVectorLayer();
        const pointSearchLayer = new OlVectorLayer();
        const smaMeasurementsBgLayer = new OlVectorLayer();
        const smaMeasurementsLayer = new OlVectorLayer();

        const map = this.mapContainer.init(
            MapBaseLayerType.OPENTOPOMAP,
            [
                chartCloserLayer,
                circuitLayer,
                airspaceLayer,
                notamLayer,
                reportingSectorLayer,
                webcamLayer,
                userPointLayer,
                reportingPointLayer,
                navaidLayer,
                airportLayer,
                metarTafLayer,
                flightrouteLayer,
                trackLayer,
                pointSearchLayer,
                trafficLayer,
                ownPlaneLayer,
                smaMeasurementsBgLayer,
                smaMeasurementsLayer
            ],
            [
                this.mapOverlayComponent.olOverlay,
                this.mapOverlayTrafficComponent.olOverlay,
                this.mapOverlayAirspaceContainerComponent.olOverlay,
            ],
            position,
            zoom,
            rotation
        );

        this.olAirportContainer = new OlAirportContainer(
            airportLayer,
            this.appStore.pipe(select(getAirports))
        );
        this.olAirportChartContainer = new OlAirportChartContainer(
            chartCloserLayer,
            this.appStore.pipe(select(getAirportCharts))
        );
        this.olReportingPointContainer = new OlReportingPointContainer(
            reportingPointLayer,
            this.appStore.pipe(select(getReportingPoints))
        );
        this.olReportingSectorContainer = new OlReportingSectorContainer(
            reportingSectorLayer,
            this.appStore.pipe(select(getReportingSectors))
        );
        this.olAirportCircuitContainer = new OlAirportCircuitContainer(
            circuitLayer,
            this.appStore.pipe(select(getAirportCircuits))
        );
        this.olAirpsaceContainer = new OlAirspaceContainer(
            airspaceLayer,
            this.appStore.pipe(select(getAirspaces))
        );
        this.olNavaidContainer = new OlNavaidContainer(
            navaidLayer,
            this.appStore.pipe(select(getNavaids))
        );
        this.olWebcamContainer = new OlWebcamContainer(
            webcamLayer,
            this.appStore.pipe(select(getWebcams))
        );
        this.olMetars = new OlMetarContainer(
            metarTafLayer,
            this.appStore.pipe(select(getMetarTafs)),
            this.appStore.pipe(select(getAirports)),
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
            map,
            [
                userPointLayer,
                reportingPointLayer,
                navaidLayer,
                airportLayer
            ],
            this.appStore,
            rotation
        );
        this.olPositionSearchContainer = new OlPositionSearchContainer(
            pointSearchLayer,
            this.appStore.pipe(select(getPositionSearchState))
        );
        this.olTraffic = new OlTrafficContainer(
            trafficLayer,
            this.appStore.pipe(select(getTrafficState))
        );
        this.olOwnPlane = new OlOwnPlaneContainer(
            ownPlaneLayer,
            this.appStore.pipe(select(getLocationState))
        );
        this.olSmaMeasurementsContainer = new OlSmaMeasurementContainer(
            smaMeasurementsBgLayer,
            smaMeasurementsLayer,
            this.appStore.pipe(select(getMeteoSmaState)),
            rotation
        );
    }

    // endregion
}
