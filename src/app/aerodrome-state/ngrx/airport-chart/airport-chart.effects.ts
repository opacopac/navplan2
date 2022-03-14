import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportChartActions} from './airport-chart.actions';
import {throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import {BaseMapActions} from '../../../base-map-state/ngrx/base-map.actions';
import {LoggingService} from '../../../system/domain-service/logging/logging.service';
import {IAirportChartService} from '../../../aerodrome/domain-service/i-airport-chart.service';


@Injectable()
export class AirportChartEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportChartService: IAirportChartService,
    ) {
    }


    showAirportChartAndShowImageAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.openAirportChart),
        switchMap(action => this.airportChartService.readAdChart2ById(action.chartId)),
        catchError(error => {
            LoggingService.logResponseError('ERROR reading airport chart by id', error);
            return throwError(error);
        }),
        switchMap(chart => [
            AirportChartActions.showAirportChart({
                chart: chart
            }),
            BaseMapActions.showImage({
                id: chart.id,
                imageUrl: environment.chart2BaseUrl + chart.fileName,
                extent: chart.extent,
                opacity: 0.9
            })
        ])
    ));


    closeAirportChartAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.closeAirportChart),
        map(action => BaseMapActions.closeImage({ id: action.chartId }))
    ));


    closeAllAirportChartsAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.closeAllAirportCharts),
        map(action => BaseMapActions.closeAllImages())
    ));
}
