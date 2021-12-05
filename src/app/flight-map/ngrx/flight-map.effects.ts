import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {debounceTime, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {combineLatest, of, pipe} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';
import {DataItemType} from '../../common/model/data-item';
import {FlightMapActions} from './flight-map.actions';
import {getFlightMapState} from './flight-map.selectors';
import {SearchActions} from '../../search/ngrx/search.actions';
import {getSearchState} from '../../search/ngrx/search.selectors';
import {INotamRepo} from '../../notam/domain-service/i-notam-repo';
import {IDate} from '../../system/domain-service/date/i-date';
import {SystemConfig} from '../../system/domain-service/system-config';
import {OlGeometry} from '../../base-map/ol-model/ol-geometry';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {ShortAirport} from '../../aerodrome/domain-model/short-airport';
import {MetarTafState} from '../../metar-taf/domain-model/metar-taf-state';
import {getMetarTafState} from '../../metar-taf/ngrx/metar-taf.selectors';
import {IAirportRepo} from '../../aerodrome/domain-service/i-airport-repo';
import {MetarTafActions} from '../../metar-taf/ngrx/metar-taf.actions';
import {AirportActions} from '../../aerodrome/ngrx/airport/airport.actions';
import {AirportCircuitActions} from '../../aerodrome/ngrx/airport-circuit/airport-circuit.actions';
import {ReportingPointSectorActions} from '../../aerodrome/ngrx/reporting-point-sector/reporting-point-sector.actions';
import {AirspaceActions} from '../../enroute/ngrx/airspace/airspace.actions';
import {NavaidActions} from '../../enroute/ngrx/navaid/navaid.actions';
import {NotamActions} from '../../notam/ngrx/notam.actions';
import {WebcamActions} from '../../webcam/ngrx/webcam.actions';
import {MeteoSmaActions} from '../../meteo-sma/ngrx/meteo-sma.actions';
import {TrafficActions} from '../../traffic/ngrx/traffic.actions';


@Injectable()
export class FlightMapEffects {
    private readonly date: IDate;
    private readonly flightMapState$ = this.appStore.select(pipe(getFlightMapState));
    private readonly searchState$ = this.appStore.select(pipe(getSearchState));
    private readonly metarTafState$ = this.appStore.pipe(select(getMetarTafState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportRepo: IAirportRepo,
        private readonly notamRepo: INotamRepo,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    mapMovedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(100),
        switchMap(action => [
            AirportActions.update({ extent: action.extent, zoom: action.zoom }),
            AirportCircuitActions.update({ extent: action.extent, zoom: action.zoom }),
            ReportingPointSectorActions.update({ extent: action.extent, zoom: action.zoom }),
            AirspaceActions.update({ extent: action.extent, zoom: action.zoom }),
            NavaidActions.update({ extent: action.extent, zoom: action.zoom }),
            MetarTafActions.update({ extent: action.extent, zoom: action.zoom }),
            NotamActions.update({ extent: action.extent, zoom: action.zoom }),
            WebcamActions.update({ extent: action.extent, zoom: action.zoom }),
            MeteoSmaActions.update({ extent: action.extent, zoom: action.zoom }),
            TrafficActions.updateExtent({ extent: action.extent, zoom: action.zoom }),
        ])
    ));


    // region map overlay

    hideOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.flightMapState$),
        filter(([action, flightMapState]) => flightMapState.showOverlay.dataItem !== undefined),
        map(() => FlightMapActions.hideOverlay())
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
            this.notamRepo.readByPosition(
                action.clickPos,
                this.date.getDayStartTimestamp(0),
                this.date.getDayEndTimestamp(2)
            )
        ]).pipe(take(1))),
        map(([action, notams]) => FlightMapActions.showOverlay({
            dataItem: action.dataItem,
            clickPos: action.clickPos,
            metarTaf: undefined,
            notams: notams,
            tabIndex: 0
        }))
    ));


    showAirportOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem?.dataItemType === DataItemType.airport),
        map(action => action.dataItem as ShortAirport),
        withLatestFrom(this.metarTafState$),
        switchMap(([shortAirport, metarTafState]) => combineLatest([
            this.airportRepo.readAirportById(shortAirport.id),
            shortAirport.icao ? this.notamRepo.readByIcao(
                shortAirport.icao,
                this.date.getDayStartTimestamp(0),
                this.date.getDayEndTimestamp(2)
            ) : of(undefined),
            shortAirport.icao ? of(this.getMetarTafByIcao(metarTafState, shortAirport.icao)) : of(undefined)
        ]).pipe(take(1))),
        map(([airport, notams, metarTaf]) => FlightMapActions.showOverlay({
            dataItem: airport,
            clickPos: undefined,
            metarTaf: metarTaf,
            notams: notams,
            tabIndex: 0
        }))
    ));


    showMetarTafInAirportOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem?.dataItemType === DataItemType.metarTaf),
        map(action => action.dataItem as MetarTaf),
        switchMap(metarTaf => combineLatest([
            metarTaf.ad_icao ? this.airportRepo.readAirportByIcao(metarTaf.ad_icao) : of(undefined),
            metarTaf.ad_icao ? this.notamRepo.readByIcao(
                metarTaf.ad_icao,
                this.date.getDayStartTimestamp(0),
                this.date.getDayEndTimestamp(2)
            ) : of(undefined),
            of(metarTaf),
        ]).pipe(take(1))),
        map(([airport, notams, metarTaf]) => FlightMapActions.showOverlay({
            dataItem: airport,
            clickPos: undefined,
            metarTaf: metarTaf,
            notams: notams,
            tabIndex: 3
        }))
    ));

    // endregion


    // region position search

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
                maxDegRadius: OlGeometry.calcDegPerPixelByZoom(action.zoom) * 50,
                minNotamTimestamp: 0,
                maxNotamTimestamp: 999 // TODO
            });
        })
    ));

    // todo: webcam click => see webcam effects

    // endregion


    private getMetarTafByIcao(metarTafState: MetarTafState, adIcao: string): MetarTaf {
        const results = metarTafState.metarTafs.filter(metarTaf => metarTaf.ad_icao === adIcao);
        return results.length > 0 ? results[0] : undefined;
    }
}
