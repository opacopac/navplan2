import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportActions} from './airport.actions';
import {select, Store} from '@ngrx/store';
import {getAirportState} from './airport.selectors';
import {IAirportRepo} from '../../domain-service/i-airport-repo';
import {environment} from '../../../../environments/environment';
import {IMetarTafRepo} from '../../../metar-taf/domain-service/i-metar-taf-repo.service';
import {INotamRepo} from '../../../notam/domain-service/i-notam-repo';
import {IDate} from '../../../system/domain-service/date/i-date';
import {SystemConfig} from '../../../system/domain-service/system-config';


@Injectable()
export class AirportEffects {
    private readonly date: IDate;
    private airportState$ = this.appStore.pipe(select(getAirportState));


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


    readAirportsAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportActions.readAirports),
        withLatestFrom(this.airportState$),
        filter(([action, currentState]) => !currentState.extent
            || !action.extent
            || currentState.zoom !== action.zoom
            || !currentState.extent.containsExtent2d(action.extent)),
        switchMap(([action, currentState]) => this.airportRepo.readAirportsByExtent(
            action.extent.getOversizeExtent(environment.mapOversizeFactor),
            action.zoom
        ).pipe(
            map(airports => AirportActions.readAirportsSuccess({
                extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                zoom: action.zoom,
                airports: airports
            }))
        )),
    ));
}
