import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportChartActions} from './airport-chart.actions';
import {throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import {BaseMapActions} from '../../../base-map/ngrx/base-map.actions';
import {LoggingService} from '../../../system/domain-service/logging/logging.service';
import {IAirportChartRepo} from '../../../aerodrome/domain-service/i-airport-chart-repo';
import {FlightMapActions} from '../flight-map/flight-map.actions';
import {DataItemType} from '../../../common/model/data-item';
import {AirportChart} from '../../../aerodrome/domain-model/airport-chart';


@Injectable()
export class AirportChartEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportChartRepo: IAirportChartRepo,
    ) {
    }


    showAirportChartAndShowImageAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.openAirportChart),
        switchMap(action => this.airportChartRepo.readAdChartById(action.chartId)),
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


    hideOverlayWhenOpeningChartAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.openAirportChart),
        map(action => FlightMapActions.hideOverlay())
    ));


    closeAirportChartAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem?.dataItemType === DataItemType.airportChart),
        map(action => AirportChartActions.closeAirportChart({
            chartId: (action.dataItem as AirportChart).id
        }))
    ));


    hideImageAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.closeAirportChart),
        map(action => BaseMapActions.closeImage({ id: action.chartId }))
    ));
}
