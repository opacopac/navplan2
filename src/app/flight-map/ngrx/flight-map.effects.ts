import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {debounceTime, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, of, pipe} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';
import {DataItemType} from '../../common/model/data-item';
import {ShortAirport} from '../../aerodrome/domain-model/short-airport';
import {FlightMapActions} from './flight-map.actions';
import {MetarTafService} from '../../metar-taf/domain-service/metar-taf.service';
import {getFlightMapState} from './flight-map.selectors';
import {FlightMapState} from '../domain-model/flight-map-state';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {AirportService} from '../../aerodrome/domain-service/airport.service';
import {AirportChart} from '../../aerodrome/domain-model/airport-chart';
import {OlHelper} from '../../base-map/ol-service/ol-helper';
import {SearchActions2} from '../../search/ngrx/search.actions';
import {SearchState} from '../../search/domain-model/search-state';
import {getSearchState} from '../../search/ngrx/search.selectors';
import {Webcam} from '../../webcam/domain-model/webcam';
import {WebcamActions} from '../../webcam/ngrx/webcam.actions';
import {MetarTafActions} from '../../metar-taf/ngrx/metar-taf.actions';
import {MetarTafState} from '../../metar-taf/domain-model/metar-taf-state';
import {getMetarTafState} from '../../metar-taf/ngrx/metar-taf.selectors';
import {AirspaceActions} from '../../enroute/ngrx/airspace.actions';
import {NavaidActions} from '../../enroute/ngrx/navaid.actions';
import {AirportCircuitActions} from '../../aerodrome/ngrx/airport-circuit.actions';
import {AirportActions} from '../../aerodrome/ngrx/airport.actions';
import {ReportingPointSectorActions} from '../../aerodrome/ngrx/reporting-point-sector.actions';
import {AirportState} from '../../aerodrome/domain-model/airport-state';
import {getAirportState} from '../../aerodrome/ngrx/airport.selectors';
import {AirportChartActions} from '../../aerodrome/ngrx/airport-chart.actions';


@Injectable()
export class FlightMapEffects {
    private readonly flightMapState$: Observable<FlightMapState> = this.appStore.select(pipe(getFlightMapState));
    private readonly airportState$: Observable<AirportState> = this.appStore.select(pipe(getAirportState));
    private readonly metarTafState$: Observable<MetarTafState> = this.appStore.select(pipe(getMetarTafState));
    private readonly searchState$: Observable<SearchState> = this.appStore.select(pipe(getSearchState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: AirportService,
        private readonly metarTafService: MetarTafService,
    ) {
    }


    mapMovedZoomedRotatedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(250),
        switchMap(action => [
            AirportActions.readAirports(action),
            AirportCircuitActions.readAirportCircuits(action),
            ReportingPointSectorActions.readReportingPointsSectors(action),
            AirspaceActions.readAirspaces(action),
            NavaidActions.readNavaids(action),
            // TODO: notams
            MetarTafActions.readMetarTafs(action),
            WebcamActions.readWebcams(action),
        ])
    ));


    // TODO: ugly...
    mapClickedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.flightMapState$, this.searchState$, this.metarTafState$, this.airportState$),
        switchMap(([action, flightMapState, searchState, metarTafState, airportState]) => {
            this.appStore.dispatch(FlightMapActions.closeAllOverlays());
            this.appStore.dispatch(SearchActions2.closePositionSearchResults());

            switch (action.dataItem?.dataItemType) {
                case DataItemType.airport:
                    return this.airportService.readAirportById((action.dataItem as ShortAirport).id).pipe(
                        map(airport => FlightMapActions.showAirportOverlay({
                            airport: airport,
                            metarTaf: this.metarTafService.findMetarTafInState(airport.icao, metarTafState),
                            notams: [], // TODO
                            tabIndex: 0
                        }))
                    );
                case DataItemType.metarTaf:
                    const metarTaf = action.dataItem as MetarTaf;
                    const shortAirport = this.airportService.findAirportInState(metarTaf.ad_icao, airportState);
                    return this.airportService.readAirportById(shortAirport.id).pipe(
                        map(airport => FlightMapActions.showAirportOverlay({
                            airport: airport,
                            metarTaf: metarTaf,
                            notams: [], // TODO
                            tabIndex: 3
                        }))
                    );
                case DataItemType.webcam:
                    return of(WebcamActions.openWebcam({ webcam: (action.dataItem as Webcam) }));
                case DataItemType.reportingPoint:
                case DataItemType.reportingSector:
                case DataItemType.navaid:
                case DataItemType.geoname:
                    return of(FlightMapActions.showOverlay(action));
                case DataItemType.airportChart:
                    const chart = action.dataItem as AirportChart;
                    this.appStore.dispatch(BaseMapActions.closeImage({ id: chart.id }));
                    return of(AirportChartActions.closeAirportChart({ chartId: chart.id }));
                default:
                    if (searchState.positionSearchState.clickPos
                        || flightMapState.showAirportOverlay.airport
                        || flightMapState.showOverlay.clickPos
                    ) {
                        return of(SearchActions2.closePositionSearchResults());
                    } else {
                        return of(SearchActions2.searchByPosition({
                            clickPos: action.clickPos,
                            maxDegRadius: OlHelper.calcDegPerPixelByZoom(action.zoom) * 50,
                            minNotamTimestamp: 0,
                            maxNotamTimestamp: 999 // TODO
                        }));
                    }
            }
        })
    ));


    showAirportChart$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.openAirportChart),
        map(action => FlightMapActions.closeAllOverlays())
    ));
}
