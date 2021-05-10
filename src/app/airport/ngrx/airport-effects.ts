import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {
    AirportActionTypes,
    ReadAirportByIdAction,
    ReadAirportByIdSuccessAction,
    ReadAirportChartAction,
    ReadAirportChartSuccessAction,
    ReadAirportCircuitsByExtentAction,
    ReadAirportCircuitsByExtentSuccessAction,
    ReadAirportsByExtentAction,
    ReadAirportsByExtentSuccessAction,
    ReadReportingPointsByExtentAction,
    ReadReportingPointsByExtentSuccessAction
} from './airport-actions';
import {AirportService} from '../rest-service/airport.service';
import {LoggingService} from '../../system/domain-service/logging/logging.service';


@Injectable()
export class AirportEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly airportService: AirportService
    ) {
    }


    readAirportsByExtentAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(AirportActionTypes.READ_ADS_BY_EXTENT),
        map(action => action as ReadAirportsByExtentAction),
        switchMap(action => this.airportService.readAirportsByExtent(action.extent, action.zoom).pipe(
            map(result => new ReadAirportsByExtentSuccessAction(result)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading airports by extent', error);
                return throwError(error);
            })
        ))
    ));


    readAirportCircuitsByExtentAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(AirportActionTypes.READ_AD_CIRCUITS_BY_EXTENT),
        map(action => action as ReadAirportCircuitsByExtentAction),
        switchMap(action => this.airportService.readAirportCircuitsByExtent(action.extent, action.zoom).pipe(
            map(result => new ReadAirportCircuitsByExtentSuccessAction(result)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading airport circuits by extent', error);
                return throwError(error);
            })
        ))
    ));


    readReportingPointsByExtentAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(AirportActionTypes.READ_REPORTING_POINTS_BY_EXTENT),
        map(action => action as ReadReportingPointsByExtentAction),
        switchMap(action => this.airportService.readReportingPointsByExtent(action.extent, action.zoom).pipe(
            map(result => new ReadReportingPointsByExtentSuccessAction(result.reportingPoints, result.reportingSectors)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading reporting points by extent', error);
                return throwError(error);
            })
        ))
    ));


    readAirportByIdAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(AirportActionTypes.READ_AD_BY_ID),
        map(action => action as ReadAirportByIdAction),
        switchMap(action => this.airportService.readAirportById(action.id).pipe(
            map(result => new ReadAirportByIdSuccessAction(result)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading airport by id', error);
                return throwError(error);
            })
        ))
    ));


    readAirportChartByIdAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(AirportActionTypes.READ_AD_CHART_BY_ID),
        map(action => action as ReadAirportChartAction),
        switchMap(action => this.airportService.readAdChartById(action.chartId).pipe(
            map(result => new ReadAirportChartSuccessAction(result)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading airport chart by id', error);
                return throwError(error);
            })
        ))
    ));
}
