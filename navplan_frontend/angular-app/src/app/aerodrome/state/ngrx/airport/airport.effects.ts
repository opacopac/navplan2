import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportActions} from './airport.actions';
import {select, Store} from '@ngrx/store';
import {getAirportState} from './airport.selectors';
import {environment} from '../../../../../environments/environment';
import {IDate} from '../../../../system/domain/service/date/i-date';
import {SystemConfig} from '../../../../system/domain/service/system-config';
import {IAirportService} from '../../../domain/service/i-airport.service';
import {INotamService} from '../../../../notam/domain/service/i-notam.service';
import {IMetarTafService} from '../../../../metar-taf/domain/service/i-metar-taf.service';
import {BaseMapActions} from '../../../../base-map/state/ngrx/base-map.actions';


@Injectable()
export class AirportEffects {
    private readonly date: IDate;
    private airportState$ = this.appStore.pipe(select(getAirportState));


    constructor(
        private readonly actions$: Actions,
        private readonly airportService: IAirportService,
        private readonly metarTafService: IMetarTafService,
        private readonly notamService: INotamService,
        private appStore: Store<any>,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    updateExtentAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMovedDebounced),
        withLatestFrom(this.airportState$),
        filter(([action, currentState]) => !currentState.extent
            || !action.extent
            || currentState.zoom !== action.zoom
            || !currentState.extent.containsExtent2d(action.extent)),
        switchMap(([action, currentState]) => this.airportService.readAirportsByExtent(
            action.extent.getOversizeExtent(environment.mapOversizeFactor),
            action.zoom
        ).pipe(
            map(airports => AirportActions.readSuccess({
                extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                zoom: action.zoom,
                airports: airports
            }))
        )),
    ));
}
