import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {ChartActionTypes, LoadAdChartAction} from './chart.actions';
import {ChartService} from '../rest-service/chart.service';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {BaseMapImageShowAction} from '../../base-map/ngrx/base-map.actions';
import {environment} from '../../../environments/environment';


@Injectable()
export class ChartEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly chartService: ChartService
    ) {
    }


    loadAdChartAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ChartActionTypes.AD_CHART_LOAD),
        map(action => action as LoadAdChartAction),
        switchMap(action => this.chartService.readAdChart(action.chartId).pipe(
            map(result => new BaseMapImageShowAction(
                result.id,
                environment.chartBaseUrl + result.fileName,
                result.extent,
                0.9
            )),
            catchError(error => {
                LoggingService.logResponseError('ERROR loading ad chart', error);
                return throwError(error);
            })
        ))
    ));
}
