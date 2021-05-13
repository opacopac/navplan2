import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {catchError, debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActions} from '../../base-map/ngrx/base-map.actions';
import {environment} from '../../../environments/environment';
import {DataItemType} from '../../common/model/data-item';
import {ShortAirport} from '../../airport/domain-model/short-airport';
import {FlightMapActions} from './flight-map.actions';
import {AirportService} from '../../airport/rest-service/airport.service';
import {AirspaceService} from '../../airspace/rest-service/airspace.service';
import {NavaidService} from '../../navaid/rest-service/navaid.service';
import {WebcamService} from '../../webcam/rest-service/webcam.service';
import {NotamService} from '../../notam/domain-service/notam-service';
import {MetarTafService} from '../../metar-taf/domain-service/metar-taf.service';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {of} from 'rxjs/internal/observable/of';


@Injectable()
export class FlightMapEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: AirportService,
        private readonly airspaceService: AirspaceService,
        private readonly navaidService: NavaidService,
        private readonly notamService: NotamService,
        private readonly metarTafService: MetarTafService,
        private readonly webcamService: WebcamService
    ) {
    }


    mapMovedZoomedRotatedAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(250),
        tap(action => {
            this.airportService.readAirportsByExtent(action.extent, action.zoom).pipe(
                map(airports => FlightMapActions.showAirports({ airports: airports })),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            this.airportService.readAirportCircuitsByExtent(action.extent, action.zoom).pipe(
                map(circuits => FlightMapActions.showCircuits({ airportCircuits: circuits })),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            this.airportService.readReportingPointsByExtent(action.extent, action.zoom).pipe(
                map(response => FlightMapActions.showReportingPoints({
                    reportingPoints: response.reportingPoints,
                    reportingSectors: response.reportingSectors
                })),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            this.airspaceService.readAirspacesByExtent(action.extent, action.zoom).pipe(
                map(airspaces => FlightMapActions.showAirspaces({ airspaces: airspaces })),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            this.navaidService.readNavaidsByExtent(action.extent, action.zoom).pipe(
                map(navaids => FlightMapActions.showNavaids({ navaids: navaids })),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            /*this.notamService.readByExtent(action.extent, action.zoom).pipe(
                map(notams => new ReadNotamSuccessAction(notams)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
            this.metarTafService.readByExtent(action.extent, action.zoom).pipe(
                map(metarTafs => new ReadMetarTafSuccessAction(metarTafs)),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();*/
            this.webcamService.readWebcamsByExtent(action.extent, action.zoom).pipe(
                map(webcams => FlightMapActions.showWebcams({ webcams: webcams })),
                tap(displayAction => this.appStore.dispatch(displayAction))
            ).subscribe();
        })
    ), { dispatch: false });


    mapClickedAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        switchMap(action => {
            switch (action.dataItem?.dataItemType) {
                case DataItemType.airport:
                    return this.airportService.readAirportById((action.dataItem as ShortAirport).id).pipe(
                        map(airport => FlightMapActions.showOverlay({ dataItem: airport, clickPos: action.clickPos }))
                    );
                case DataItemType.reportingPoint:
                case DataItemType.reportingSector:
                case DataItemType.navaid:
                    return of(FlightMapActions.showOverlay(action));
                default:
                    return of(FlightMapActions.closeAllOverlays());
            }
        })
    ));


    showAirportChartOnMap$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(FlightMapActions.showAirportChart),
        switchMap(action => this.airportService.readAdChartById(action.chartId).pipe(
            map(chart => BaseMapActions.showImage({
                id: chart.id,
                imageUrl: environment.chartBaseUrl + chart.fileName,
                extent: chart.extent,
                opacity: 0.9
            })),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading airport chart by id', error);
                return throwError(error);
            })
        ))
    ));
}
