import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getMeteoDwdState} from '../../../meteo-dwd/state/ngrx/meteo-dwd.selectors';
import {MeteoGramActions} from './meteo-gram.actions';
import {MeteoDwdState} from '../../../meteo-dwd/state/model/meteo-dwd-state';
import {IMeteoGramService} from '../../domain/service/i-meteo-gram.service';


@Injectable()
export class MeteoGramEffects {
    private readonly meteoDwdState$: Observable<MeteoDwdState> = this.appStore.pipe(select(getMeteoDwdState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly meteoGramService: IMeteoGramService
    ) {
    }


    readMeteogramAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoGramActions.readCloudMeteogram),
        withLatestFrom(this.meteoDwdState$),
        switchMap(([action, meteoDwdState]) => {
            return this.meteoGramService.readCloudMeteoGram(meteoDwdState.forecastRun, action.position);
        }),
        map(response => MeteoGramActions.readCloudMeteogramSuccess({ cloudMeteogram: response }))
    ));
}
