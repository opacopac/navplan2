import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {debounceTime, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {combineLatest, Observable, of, pipe} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';
import {DataItemType} from '../../common/model/data-item';
import {ShortAirport} from '../../aerodrome/domain-model/short-airport';
import {FlightMapActions} from './flight-map.actions';
import {getFlightMapState} from './flight-map.selectors';
import {FlightMapState} from '../domain-model/flight-map-state';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {AirportChart} from '../../aerodrome/domain-model/airport-chart';
import {OlHelper} from '../../base-map/ol-service/ol-helper';
import {SearchActions} from '../../search/ngrx/search.actions';
import {SearchState} from '../../search/domain-model/search-state';
import {getSearchState} from '../../search/ngrx/search.selectors';
import {Webcam} from '../../webcam/domain-model/webcam';
import {WebcamActions} from '../../webcam/ngrx/webcam.actions';
import {MetarTafActions} from '../../metar-taf/ngrx/metar-taf.actions';
import {AirspaceActions} from '../../enroute/ngrx/airspace.actions';
import {NavaidActions} from '../../enroute/ngrx/navaid.actions';
import {AirportCircuitActions} from '../../aerodrome/ngrx/airport-circuit.actions';
import {AirportActions} from '../../aerodrome/ngrx/airport.actions';
import {ReportingPointSectorActions} from '../../aerodrome/ngrx/reporting-point-sector.actions';
import {AirportChartActions} from '../../aerodrome/ngrx/airport-chart.actions';
import {NotamActions} from '../../notam/ngrx/notam.actions';
import {INotamService} from '../../notam/domain-service/i-notam-service';
import {IMetarTafService} from '../../metar-taf/domain-service/i-metar-taf.service';
import {IAirportService} from '../../aerodrome/domain-service/i-airport.service';


@Injectable()
export class FlightMapEffects {
    private readonly flightMapState$: Observable<FlightMapState> = this.appStore.select(pipe(getFlightMapState));
    private readonly searchState$: Observable<SearchState> = this.appStore.select(pipe(getSearchState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: IAirportService,
        private readonly metarTafService: IMetarTafService,
        private readonly notamService: INotamService
    ) {
    }


    readMapItemsActions$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(250),
        switchMap(action => [
            AirportActions.readAirports(action),
            AirportCircuitActions.readAirportCircuits(action),
            ReportingPointSectorActions.readReportingPointsSectors(action),
            AirspaceActions.readAirspaces(action),
            NavaidActions.readNavaids(action),
            NotamActions.readNotams(action),
            MetarTafActions.readMetarTafs(action),
            WebcamActions.readWebcams(action),
        ])
    ));


    hideOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.flightMapState$),
        filter(([action, flightMapState]) => flightMapState.showOverlay.dataItem !== undefined),
        map(() => FlightMapActions.hideOverlay())
    ));


    showAirportOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem?.dataItemType === DataItemType.airport),
        map(action => action.dataItem as ShortAirport),
        switchMap(shortAirport => combineLatest([
            this.airportService.readById(shortAirport.id),
            this.notamService.readByIcao(shortAirport.icao),
            this.metarTafService.readByIcao(shortAirport.icao)
        ]).pipe(take(1))),
        map(([airport, notamList, metarTaf]) => FlightMapActions.showOverlay({
            dataItem: airport,
            clickPos: undefined,
            metarTaf: metarTaf,
            notams: notamList.items,
            tabIndex: 0
        }))
    ));


    showMetarTafInAirportOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem?.dataItemType === DataItemType.metarTaf),
        map(action => action.dataItem as MetarTaf),
        switchMap(metarTaf => combineLatest([
            this.airportService.readByIcao(metarTaf.ad_icao),
            this.notamService.readByIcao(metarTaf.ad_icao),
            of(metarTaf),
        ]).pipe(take(1))),
        map(([airport, notamList, metarTaf]) => FlightMapActions.showOverlay({
            dataItem: airport,
            clickPos: undefined,
            metarTaf: metarTaf,
            notams: notamList.items,
            tabIndex: 3
        }))
    ));


    showRepNavGeoUsrOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => [
            DataItemType.reportingPoint,
            DataItemType.reportingSector,
            DataItemType.navaid,
            DataItemType.geoname,
            DataItemType.userPoint
        ].includes(action.dataItem?.dataItemType)),
        switchMap(action => combineLatest([
            of(action),
            this.notamService.readByPosition(action.clickPos)
        ]).pipe(take(1))),
        map(([action, notamList]) => FlightMapActions.showOverlay({
            dataItem: action.dataItem,
            clickPos: action.clickPos,
            metarTaf: undefined,
            notams: notamList.items,
            tabIndex: 0
        }))
    ));


    openWebcamAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem?.dataItemType === DataItemType.webcam),
        map(action => WebcamActions.openWebcam({
            webcam: action.dataItem as Webcam
        }))
    ));


    hideOverlayWhenOpeningChartAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.openAirportChart),
        map(action => FlightMapActions.hideOverlay())
    ));


    closeAirportChartAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem?.dataItemType === DataItemType.airportChart),
        map(action => AirportChartActions.closeAirportChart({
            chartId: (action.dataItem as AirportChart).id
        }))
    ));


    hidePositionSearchResultsAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.searchState$),
        filter(([action, searchState]) => searchState.positionSearchState.clickPos !== undefined),
        map(() => SearchActions.hidePositionSearchResults())
    ));


    searchByPositionAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem === undefined),
        withLatestFrom(this.flightMapState$, this.searchState$),
        filter(([action, flightMapState, searchState]) => {
            return !flightMapState.showOverlay.dataItem && !searchState.positionSearchState.clickPos;
        }),
        map(([action, flightMapState, searchState]) => {
            return SearchActions.searchByPosition({
                clickPos: action.clickPos,
                maxDegRadius: OlHelper.calcDegPerPixelByZoom(action.zoom) * 50,
                minNotamTimestamp: 0,
                maxNotamTimestamp: 999 // TODO
            });
        })
    ));
}
