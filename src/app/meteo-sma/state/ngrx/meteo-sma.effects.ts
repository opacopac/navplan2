import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MeteoSmaActions} from './meteo-sma.actions';
import {Observable, of} from 'rxjs';
import {getMeteoSmaState} from './meteo-sma.selectors';
import {MeteoSmaState} from '../../domain/model/meteo-sma-state';
import {MeteoSmaStatus} from '../../domain/model/meteo-sma-status';
import {IMeteoSmaService} from '../../domain/service/i-meteo-sma.service';
import {getMapState} from '../../../base-map/state/ngrx/base-map.selectors';
import {BaseMapState} from '../../../base-map/state/state-model/base-map-state';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';


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


    readSmaMeasurementsAction$ = createEffect(() => this.actions$.pipe(
        ofType(MeteoSmaActions.open),
        withLatestFrom(this.mapState$),
        switchMap(([action, mapState]) => this.meteoSmaService.readSmaMeasurements(mapState.extent).pipe(
            map(smaMeasurements => MeteoSmaActions.readSuccess({ smaMeasurements: smaMeasurements, zoom: mapState.zoom })),
            catchError(error => of(MeteoSmaActions.readError({
                message: 'Error loading sma measurements', error: error
            })))
        ))
    ));


    updateSmaMeasurementsAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMovedDebounced),
        withLatestFrom(this.meteoSmastate$),
        filter(([action, state]) => state.status === MeteoSmaStatus.CURRENT),
        switchMap(([action, state]) => this.meteoSmaService.readSmaMeasurements(action.extent).pipe(
            map(smaMeasurements => MeteoSmaActions.readSuccess({ smaMeasurements: smaMeasurements, zoom: action.zoom })),
            catchError(error => of(MeteoSmaActions.readError({
                message: 'Error updating sma measurements', error: error
            })))
        ))
    ));
}
