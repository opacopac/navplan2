import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportChartActions} from './airport-chart.actions';
import {EMPTY, from, of, throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IAirportChartService} from '../../domain/service/i-airport-chart.service';
import {getUploadAirportChartState} from './airport-chart.selectors';
import {FlightMapActions} from '../../../flight-map/state/ngrx/flight-map.actions';
import {ChartSaveParameters} from '../../domain/model/chart-save-parameters';
import {OriginalFileParameters} from '../../domain/model/original-file-parameters';
import {ChartRegistration} from '../../domain/model/chart-registration';
import {ChartRegistrationType} from '../../domain/model/chart-registration-type';
import {GeoCoordinateType} from '../../domain/model/geo-coordinate-type';
import {GeoCoordinate} from '../../../geo-physics/domain/model/geometry/geo-coordinate';


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
        withLatestFrom(this.appStore.select(getUploadAirportChartState)),
        switchMap(([action, state]) => this.airportChartService.uploadAdChart(
            state.selectedAirport.icao,
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


    chartRegistrationTypeChanged$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.chartRegistrationTypeChanged),
        withLatestFrom(this.appStore.select(getUploadAirportChartState)),
        mergeMap(([action, state]) => {
            switch (action.chartRegistrationType) {
                case ChartRegistrationType.ARP_SCALE:
                    return from([
                        AirportChartActions.mapReference1Changed({
                            mapReference1: GeoCoordinate.ofPos2d(state.selectedAirport.position)
                        }),
                        AirportChartActions.geoCoordinateTypeChanged({
                            geoCoordinateType: GeoCoordinateType.LON_LAT
                        })
                    ]);
                default:
                    return EMPTY;
            }
        })
    ));


    mapReferenceSelected$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.appStore.select(getUploadAirportChartState)),
        filter(([action, state]) => state.chartReference1 !== undefined && state.chartReference2 !== undefined),
        filter(([action, state]) => !state.mapReference1 || !state.mapReference2),
        map(([action, state]) => {
            if (!state.mapReference1) {
                return AirportChartActions.mapReference1Changed({mapReference1: GeoCoordinate.ofPos2d(action.clickPos)});
            } else if (!state.mapReference2) {
                return AirportChartActions.mapReference2Changed({mapReference2: GeoCoordinate.ofPos2d(action.clickPos)});
            }
        })
    ));


    saveAirportChartAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.saveAirportChart),
        withLatestFrom(this.appStore.select(getUploadAirportChartState)),
        switchMap(([action, state]) => this.airportChartService.reprojectAndSaveAdChart(
            state.selectedAirport.icao,
            new ChartSaveParameters(
                state.uploadedChartInfo.url,
                state.chartName,
                new OriginalFileParameters(
                    state.uploadedChartInfo.filename,
                    '',
                    state.pdfParameters
                ),
                new ChartRegistration(
                    state.chartRegistrationType,
                    state.geoCoordinateType,
                    state.chartReference1,
                    state.mapReference1,
                    state.chartReference2,
                    state.mapReference2,
                    state.chartScale,
                )
            )
        ).pipe(
            map(chart => AirportChartActions.saveAirportChartSuccess({
                chart: chart
            })),
            catchError(error => {
                LoggingService.logResponseError('ERROR saving airport chart', error);
                return of(AirportChartActions.saveAirportChartError({error: error}));
            })
        ))
    ));


    hideSidebarAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportChartActions.cancelUploadAirportChart, AirportChartActions.saveAirportChartSuccess),
        map(action => FlightMapActions.hideSidebar())
    ));
}
