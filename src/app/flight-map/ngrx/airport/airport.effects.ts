import {Actions, createEffect, ofType} from '@ngrx/effects';
import {debounceTime, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportActions} from './airport.actions';
import {select, Store} from '@ngrx/store';
import {getAirportState} from './airport.selectors';
import {IAirportRepo} from '../../../aerodrome/domain-service/i-airport-repo';
import {environment} from '../../../../environments/environment';
import {BaseMapActions} from '../../../base-map/ngrx/base-map.actions';
import {DataItemType} from '../../../common/model/data-item';
import {ShortAirport} from '../../../aerodrome/domain-model/short-airport';
import {combineLatest, of} from 'rxjs';
import {FlightMapActions} from '../flight-map/flight-map.actions';
import {getMetarTafState} from '../metar-taf/metar-taf.selectors';
import {IMetarTafRepo} from '../../../metar-taf/domain-service/i-metar-taf-repo.service';
import {MetarTafState} from '../../domain-model/metar-taf-state';
import {MetarTaf} from '../../../metar-taf/domain-model/metar-taf';
import {INotamRepo} from '../../../notam/domain-service/i-notam-repo';
import {IDate} from '../../../system/domain-service/date/i-date';
import {SystemConfig} from '../../../system/domain-service/system-config';


@Injectable()
export class AirportEffects {
    private readonly date: IDate;
    private airportState$ = this.appStore.pipe(select(getAirportState));
    private metarTafState$ = this.appStore.pipe(select(getMetarTafState));


    constructor(
        private readonly actions$: Actions,
        private readonly airportRepo: IAirportRepo,
        private readonly metarTafRepo: IMetarTafRepo,
        private readonly notamRepo: INotamRepo,
        private appStore: Store<any>,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    showAirportsAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(250),
        withLatestFrom(this.airportState$),
        filter(([action, currentState]) => !currentState.extent
            || !action.extent
            || currentState.zoom !== action.zoom
            || !currentState.extent.containsExtent2d(action.extent)),
        switchMap(([action, currentState]) => this.airportRepo.readAirportsByExtent(
            action.extent.getOversizeExtent(environment.mapOversizeFactor),
            action.zoom
        ).pipe(
            map(airports => AirportActions.showAirports({
                extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                zoom: action.zoom,
                airports: airports
            }))
        )),
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


    private getMetarTafByIcao(metarTafState: MetarTafState, adIcao: string): MetarTaf {
        const results = metarTafState.metarTafs.filter(metarTaf => metarTaf.ad_icao === adIcao);
        return results.length > 0 ? results[0] : undefined;
    }
}
