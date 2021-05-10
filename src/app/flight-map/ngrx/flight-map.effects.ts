import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {
    BaseMapActionTypes,
    BaseMapClickedAction,
    BaseMapImageShowAction,
    BaseMapMovedZoomedRotatedAction
} from '../../base-map/ngrx/base-map.actions';
import {FlightMapState} from './flight-map-state';
import {getFlightMapState} from './flight-map.selectors';
import {ReadNotamAction} from '../../notam/ngrx/notam.actions';
import {ReadMetarTafAction} from '../../metar-taf/ngrx/metar-taf.actions';
import {
    AirportActionTypes,
    ReadAirportByIdAction,
    ReadAirportChartSuccessAction,
    ReadAirportCircuitsByExtentAction,
    ReadAirportsByExtentAction,
    ReadReportingPointsByExtentAction,
    ReadReportingPointSuccessAction,
    ReadReportingSectorSuccessAction
} from '../../airport/ngrx/airport-actions';
import {environment} from '../../../environments/environment';
import {DataItemType} from '../../common/model/data-item';
import {ShortAirport} from '../../airport/domain-model/short-airport';
import {FlightMapCloseAllOverlaysAction} from './flight-map.actions';
import {ReportingPoint} from '../../airport/domain-model/reporting-point';
import {ReportingSector} from '../../airport/domain-model/reporting-sector';
import {ReadAirspacesByExtentAction} from '../../airspace/ngrx/airspace-actions';
import {ReadNavaidsByExtentAction} from '../../navaid/ngrx/navaid-actions';
import {ReadWebcamsByExtentAction} from '../../webcam/ngrx/webcam-actions';


@Injectable()
export class FlightMapEffects {
    private readonly flightMapState$: Observable<FlightMapState> = this.appStore.select(getFlightMapState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>
    ) {
    }


    mapMovedZoomedRotatedAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActionTypes.BASE_MAP_MOVED_ZOOMED_ROTATED),
        map(action => action as BaseMapMovedZoomedRotatedAction),
        debounceTime(500),
        switchMap(action => [
            new ReadAirportsByExtentAction(action.extent, action.zoom),
            new ReadAirportCircuitsByExtentAction(action.extent, action.zoom),
            new ReadReportingPointsByExtentAction(action.extent, action.zoom),
            new ReadAirspacesByExtentAction(action.extent, action.zoom),
            new ReadNavaidsByExtentAction(action.extent, action.zoom),
            new ReadWebcamsByExtentAction(action.extent, action.zoom),
            new ReadNotamAction(action.extent, action.zoom),
            new ReadMetarTafAction(action.extent, action.zoom)
        ])
    ));


    mapClickedAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActionTypes.BASE_MAP_CLICKED),
        map(action => action as BaseMapClickedAction),
        map(action => {
            switch (action.dataItem?.dataItemType) {
                case DataItemType.airport:
                    return new ReadAirportByIdAction((action.dataItem as ShortAirport).id);
                case DataItemType.reportingPoint:
                    return new ReadReportingPointSuccessAction(action.dataItem as ReportingPoint);
                case DataItemType.reportingSector:
                    return new ReadReportingSectorSuccessAction(action.dataItem as ReportingSector);
                default:
                    return new FlightMapCloseAllOverlaysAction();
            }
        })
    ));


    displayAirportChartAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(AirportActionTypes.READ_AD_CHART_BY_ID_SUCCESS),
        map(action => action as ReadAirportChartSuccessAction),
        map(result => new BaseMapImageShowAction(
            result.chart.id,
            environment.chartBaseUrl + result.chart.fileName,
            result.chart.extent,
            0.9
        ))
    ));
}
