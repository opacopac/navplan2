import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getMeteoForecastState} from '../../../meteo-forecast/state/ngrx/meteo-forecast.selectors';
import {MeteoGramActions} from './meteo-gram.actions';
import {MeteoForecastState} from '../../../meteo-forecast/state/model/meteo-forecast-state';
import {IMeteoGramService} from '../../domain/service/i-meteo-gram.service';


@Injectable()
export class MeteoGramEffects {
    private readonly meteoForecastState$: Observable<MeteoForecastState> = this.appStore.pipe(select(getMeteoForecastState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly meteoGramService: IMeteoGramService
    ) {
    }


    readMeteogramAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoGramActions.readCloudMeteogram),
        withLatestFrom(this.meteoForecastState$),
        switchMap(([action, meteoFcState]) => {
            return this.meteoGramService.readCloudMeteoGram(meteoFcState.forecastRun, action.position);
        }),
        map(response => MeteoGramActions.readCloudMeteogramSuccess({ cloudMeteogram: response }))
    ));
}
