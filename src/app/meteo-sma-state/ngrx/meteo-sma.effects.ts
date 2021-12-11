import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MeteoSmaActions} from './meteo-sma.actions';
import {Observable, of} from 'rxjs';
import {getMeteoSmaState} from './meteo-sma.selectors';
import {MeteoSmaState} from '../../meteo-sma/domain-model/meteo-sma-state';
import {MeteoSmaButtonStatus} from '../../meteo-sma/domain-model/meteo-sma-button-status';
import {IMeteoSmaService} from '../../meteo-sma/domain-service/i-meteo-sma.service';
import {getMapState} from '../../base-map/ngrx/base-map.selectors';
import {BaseMapState} from '../../base-map/domain-model/base-map-state';


@Injectable()
export class MeteoSmaEffects {
    private readonly meteoSmastate$: Observable<MeteoSmaState> = this.appStore.pipe(select(getMeteoSmaState));
    private readonly mapState$: Observable<BaseMapState> = this.appStore.pipe(select(getMapState));


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
        withLatestFrom(this.mapState$),
        switchMap(([action, mapState]) => this.meteoSmaService.readSmaMeasurements(mapState.extent).pipe(
            map(smaMeasurements => MeteoSmaActions.readSuccess({ smaMeasurements: smaMeasurements, zoom: mapState.zoom })),
            catchError(error => of(MeteoSmaActions.readError({
                message: 'Error loading sma measurements', error: error
            })))
        ))
    ));


    updateSmaMeasurementsAction$ = createEffect(() => this.actions$.pipe(
        ofType(MeteoSmaActions.update),
        withLatestFrom(this.meteoSmastate$),
        filter(([action, state]) => state.buttonStatus === MeteoSmaButtonStatus.CURRENT),
        switchMap(([action, state]) => this.meteoSmaService.readSmaMeasurements(action.extent).pipe(
            map(smaMeasurements => MeteoSmaActions.readSuccess({ smaMeasurements: smaMeasurements, zoom: action.zoom })),
            catchError(error => of(MeteoSmaActions.readError({
                message: 'Error updating sma measurements', error: error
            })))
        ))
    ));
}
