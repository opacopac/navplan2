import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MeteoSmaActions} from './meteo-sma.actions';
import {Observable, of} from 'rxjs';
import {getMeteoSmaState} from './meteo-sma.selectors';
import {MeteoSmaState} from '../domain-model/meteo-sma-state';
import {MeteoSmaButtonStatus} from '../domain-model/meteo-sma-button-status';
import {IMeteoSmaService} from '../domain-service/i-meteo-sma.service';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';
import {getMapExtent} from '../../base-map/ngrx/base-map.selectors';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


@Injectable()
export class MeteoSmaEffects {
    private readonly meteoSmastate$: Observable<MeteoSmaState> = this.appStore.pipe(select(getMeteoSmaState));
    private readonly mapExtent$: Observable<Extent2d> = this.appStore.pipe(select(getMapExtent));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly meteoSmaService: IMeteoSmaService,
    ) {
    }


    toggleVerticalMapAction$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(MeteoSmaActions.toggle),
            withLatestFrom(this.meteoSmastate$),
            map(([action, meteoSmaState]) => {
                if (meteoSmaState.buttonStatus === MeteoSmaButtonStatus.OFF) {
                    return MeteoSmaActions.read();
                } else {
                    return MeteoSmaActions.close();
                }
            })
        ));


    readSmaMeasurementsAction$ = createEffect(() => this.actions$.pipe(
        ofType(MeteoSmaActions.read),
        withLatestFrom(this.mapExtent$),
        switchMap(([action, mapExtent]) => this.meteoSmaService.readSmaMeasurements(mapExtent).pipe(
            map(smaMeasurements => MeteoSmaActions.readSuccess({ smaMeasurements: smaMeasurements })),
            catchError(error => of(MeteoSmaActions.readError({
                message: 'Error loading sma measurements', error: error
            })))
        ))
    ));


    updateSmaMeasurementsAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        withLatestFrom(this.meteoSmastate$),
        filter(([action, state]) => state.buttonStatus === MeteoSmaButtonStatus.CURRENT),
        switchMap(([action, state]) => this.meteoSmaService.readSmaMeasurements(action.extent).pipe(
            map(smaMeasurements => MeteoSmaActions.readSuccess({ smaMeasurements: smaMeasurements })),
            catchError(error => of(MeteoSmaActions.readError({
                message: 'Error loading sma measurements', error: error
            })))
        ))
    ));
}
