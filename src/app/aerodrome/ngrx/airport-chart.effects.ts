import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportChartActions} from './airport-chart.actions';
import {throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {IAirportChartService} from '../domain-service/i-airport-chart.service';


@Injectable()
export class AirportChartEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportChartService: IAirportChartService,
    ) {
    }


    openAirportChart$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.openAirportChart),
        switchMap(action => this.airportChartService.readAdChartById(action.chartId).pipe(
            map(chart => AirportChartActions.showAirportChart({ chart: chart })),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading airport chart by id', error);
                return throwError(error);
            })
        ))
    ));


    showAirportChart$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.showAirportChart),
        map(action => BaseMapActions.showImage({
            id: action.chart.id,
            imageUrl: environment.chartBaseUrl + action.chart.fileName,
            extent: action.chart.extent,
            opacity: 0.9
        })),
    ));
}
