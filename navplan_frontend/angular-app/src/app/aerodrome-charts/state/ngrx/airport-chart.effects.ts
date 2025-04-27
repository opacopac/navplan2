import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportChartActions} from './airport-chart.actions';
import {of, throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IAirportChartService} from '../../domain/service/i-airport-chart.service';
import {getAirportChartState} from './airport-chart.selectors';


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
        switchMap(action => this.airportChartService.readAdChartById(action.chartId)),
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
                imageUrl: environment.chartBaseUrl + chart.fileName,
                extent: chart.extent,
                opacity: 0.9
            })
        ])
    ));


    closeAirportChartAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.closeAirportChart),
        map(action => BaseMapActions.closeImage({id: action.chartId}))
    ));


    closeAllAirportChartsAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.closeAllAirportCharts),
        map(action => BaseMapActions.closeAllImages())
    ));


    uploadAirportChartAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.uploadAirportChart),
        switchMap(action => this.airportChartService.uploadAdChart(
            action.chartUploadParameters
        ).pipe(
            map(uploadedChartInfo => AirportChartActions.uploadAirportChartSuccess({
                chartInfo: uploadedChartInfo
            })),
            catchError(error => {
                LoggingService.logResponseError('ERROR uploading airport chart', error);
                return of(AirportChartActions.uploadAirportChartError({error: error}));
            })
        ))
    ));


    mapReferenceSelected$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.appStore.select(getAirportChartState)),
        filter(([action, state]) => state.chartReference1 !== null && state.chartReference2 !== null),
        filter(([action, state]) => state.mapReference1 === null || state.mapReference2 === null),
        map(([action, state]) => {
            if (state.mapReference1 === null) {
                return AirportChartActions.mapReference1Changed({mapReference1: action.clickPos});
            } else if (state.mapReference2 === null) {
                return AirportChartActions.mapReference2Changed({mapReference2: action.clickPos});
            }
        })
    ));
}
