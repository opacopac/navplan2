import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {Angle} from '../../../../geo-physics/domain/model/quantities/angle';
import {combineLatest} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {
    getMapPosition,
    getMapRotation,
    getMapZoom,
    getShowAttributions,
} from '../../../../base-map/state/ngrx/base-map.selectors';
import {OlMetarContainer} from '../../../../metar-taf/view/ol-components/ol-metar-container';
import {OlNotamContainer} from '../../../../notam/view/ol-components/ol-notam-container';
import {getNotamList} from '../../../../notam/state/ngrx/notam.selectors';
import {OlTrackContainer} from '../../../../track/view/ol-components/ol-track-container';
import {getShowTrack} from '../../../../track/state/ngrx/track.selectors';
import {OlFlightrouteContainer} from '../../ol-components/ol-flightroute-container';
import {getFlightroute} from '../../../../flightroute/state/ngrx/flightroute.selectors';
import {OlTrafficContainer} from '../../../../traffic/view/ol-components/ol-traffic-container';
import {getTrafficState} from '../../../../traffic/state/ngrx/traffic.selectors';
import {OlOwnPlaneContainer} from '../../../../location/location-view/ol-components/ol-own-plane-container';
import {getLocationState} from '../../../../location/location-state/ngrx/location.selectors';
import {
    OlMapContainerComponent
} from '../../../../base-map/view/ng-components/ol-map-container/ol-map-container.component';
import {
    MapPopupTrafficComponent
} from '../../../../traffic/view/ng-components/map-popup-traffic/map-popup-traffic.component';
import {Observable} from 'rxjs/internal/Observable';
import {Subscription} from 'rxjs/internal/Subscription';
import {
    getFlightMapShowMeteoLayer,
    getFlightMapShowOverlay,
    getShowMapLayerSelection
} from '../../../state/ngrx/flight-map.selectors';
import {OlAirportContainer} from '../../../../aerodrome/view/ol-components/airport/ol-airport-container';
import {
    OlAirportCircuitContainer
} from '../../../../aerodrome/view/ol-components/airport-circuit/ol-airport-circuit-container';
import {
    OlReportingPointContainer
} from '../../../../aerodrome/view/ol-components/reporting-point-sector/ol-reporting-point-container';
import {
    OlReportingSectorContainer
} from '../../../../aerodrome/view/ol-components/reporting-point-sector/ol-reporting-sector-container';
import {OlAirspaceContainer} from '../../../../airspace/view/ol-components/ol-airspace-container';
import {OlNavaidContainer} from '../../../../navaid/view/ol-components/ol-navaid-container';
import {OlWebcamContainer} from '../../../../webcam/view/ol-components/ol-webcam-container';
import {
    OlAirportChartContainer
} from '../../../../aerodrome/view/ol-components/airport-chart/ol-airport-chart-container';
import {OlPositionSearchContainer} from '../../../../search/view/ol-components/ol-position-search-container';
import {getPositionSearchState, getTextSearchState} from '../../../../search/state/ngrx/search.selectors';
import {getWebcams} from '../../../../webcam/state/ngrx/webcam.selectors';
import {getMetarTafs} from '../../../../metar-taf/state/ngrx/metar-taf.selectors';
import {getAirspaces} from '../../../../airspace/state/ngrx/airspace.selectors';
import {getNavaids} from '../../../../navaid/state/ngrx/navaid.selectors';
import {getAirports} from '../../../../aerodrome/state/ngrx/airport/airport.selectors';
import {
    getReportingPoints,
    getReportingSectors
} from '../../../../aerodrome/state/ngrx/reporting-point-sector/reporting-point-sector.selectors';
import {getAirportCircuits} from '../../../../aerodrome/state/ngrx/airport-circuit/airport-circuit.selectors';
import {getAirportCharts} from '../../../../aerodrome/state/ngrx/airport-chart/airport-chart.selectors';
import {MapPopupComponent} from '../map-popup/map-popup.component';
import {OverlayState} from '../../../state/ngrx/overlay-state';
import {OlVectorLayer} from '../../../../base-map/view/ol-model/ol-vector-layer';
import {getVerticalMapState} from '../../../../vertical-map/state/ngrx/vertical-map.selectors';
import {VerticalMapButtonStatus} from '../../../../vertical-map/domain/model/vertical-map-button-status';
import {getMeteoSmaState} from '../../../../meteo-sma/state/ngrx/meteo-sma.selectors';
import {OlSmaMeasurementContainer} from '../../../../meteo-sma/view/ol-components/ol-sma-measurement-container';
import {
    MapOverlayAirspaceStructureComponent
} from '../../../../airspace/view/ng-components/map-overlay-airspace-structure/map-overlay-airspace-structure.component';
import {OlDwdForecastContainer} from '../../../../meteo-dwd/view/ol-components/ol-dwd-forecast-container';
import {
    getMeteoDwdLayer,
    getMeteoDwdMapTilesUrl,
    getMeteoDwdWeatherValues,
    getMeteoDwdWindValues
} from '../../../../meteo-dwd/state/ngrx/meteo-dwd.selectors';
import {OlDwdForecastMapTileLayer} from '../../../../meteo-dwd/view/ol-components/ol-dwd-forecast-map-tile-layer';
import {MeteoDwdActions} from '../../../../meteo-dwd/state/ngrx/meteo-dwd.actions';
import {getSelectedAltitudeUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';


@Component({
    selector: 'app-flight-map-page',
    templateUrl: './flight-map-page.component.html',
    styleUrls: ['./flight-map-page.component.scss']
})
export class FlightMapPageComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(OlMapContainerComponent) mapContainer: OlMapContainerComponent;
    @ViewChild(MapPopupComponent) mapOverlayComponent: MapPopupComponent;
    @ViewChild(MapPopupTrafficComponent) mapOverlayTrafficComponent: MapPopupTrafficComponent;
    @ViewChild(MapOverlayAirspaceStructureComponent) mapOverlayAirspaceContainerComponent: MapOverlayAirspaceStructureComponent;
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
    private olDwdForecastContainer: OlDwdForecastContainer;
    private flightroute$ = this.appStore.pipe(select(getFlightroute));
    private readonly showOverlay$: Observable<OverlayState> = this.appStore.pipe(select(getFlightMapShowOverlay));
    public readonly showMeteoLayer$: Observable<boolean> = this.appStore.pipe(select(getFlightMapShowMeteoLayer));
    private readonly verticalMapState$ = this.appStore.pipe(select(getVerticalMapState));
    public readonly showVerticalMapButton$ = this.flightroute$.pipe(map(route => route.waypoints.length >= 2));
    public readonly showVerticalMap$ = this.verticalMapState$.pipe(map(state => state.buttonStatus === VerticalMapButtonStatus.CURRENT));
    public readonly showMapLayerSelection$ = this.appStore.pipe(select(getShowMapLayerSelection));
    public readonly showAttributions$ = this.appStore.pipe(select(getShowAttributions));


    constructor(
        private readonly appStore: Store<any>,
    ) {
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

        this.appStore.dispatch(MeteoDwdActions.readAvailableForecastRuns());
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
        this.olDwdForecastContainer.destroy();

        this.showOverlaySubscription.unsubscribe();
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
        const notamLayer = new OlVectorLayer(true);
        const airspaceLayer = new OlVectorLayer(true);
        const reportingSectorLayer = new OlVectorLayer(true);
        const webcamLayer = new OlVectorLayer();
        const userPointLayer = new OlVectorLayer();
        const reportingPointLayer = new OlVectorLayer(true);
        const navaidLayer = new OlVectorLayer(true);
        const airportLayer = new OlVectorLayer(true);
        const trackLayer = new OlVectorLayer();
        const trafficLayer = new OlVectorLayer();
        const circuitLayer = new OlVectorLayer();
        const chartCloserLayer = new OlVectorLayer();
        const pointSearchLayer = new OlVectorLayer();
        const smaMeasurementsBgLayer = new OlVectorLayer();
        const smaMeasurementsLayer = new OlVectorLayer();
        const dwdForecastBgLayer = new OlDwdForecastMapTileLayer();
        const dwdForecastWeatherIconLayer = new OlVectorLayer(true);
        const dwdForecastWindIconLayer = new OlVectorLayer(true);

        const olMap = this.mapContainer.createMap(
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
                dwdForecastBgLayer,
                dwdForecastWeatherIconLayer,
                dwdForecastWindIconLayer,
                smaMeasurementsBgLayer,
                smaMeasurementsLayer,
                flightrouteLayer,
                trackLayer,
                pointSearchLayer,
                trafficLayer,
                ownPlaneLayer,
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
            olMap,
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
            this.appStore.pipe(select(getPositionSearchState)),
            this.appStore.pipe(select(getTextSearchState))
        );
        this.olTraffic = new OlTrafficContainer(
            trafficLayer,
            this.appStore.pipe(select(getTrafficState)),
            this.appStore.pipe(select(getSelectedAltitudeUnit))
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
        this.olDwdForecastContainer = new OlDwdForecastContainer(
            dwdForecastBgLayer,
            dwdForecastWeatherIconLayer,
            dwdForecastWindIconLayer,
            this.appStore.pipe(select(getMeteoDwdLayer)),
            this.appStore.pipe(select(getMeteoDwdWeatherValues)),
            this.appStore.pipe(select(getMeteoDwdWindValues)),
            this.appStore.pipe(select(getMeteoDwdMapTilesUrl)),
        );
    }

    // endregion
}
