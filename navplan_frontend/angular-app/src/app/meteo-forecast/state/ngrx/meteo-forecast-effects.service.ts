import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MeteoForecastActions} from './meteo-forecast.actions';
import {Observable} from 'rxjs';
import {MeteoForecastState} from '../model/meteo-forecast-state';
import {getMeteoForecastState} from './meteo-forecast.selectors';
import {IMeteoForecastService} from '../../domain/service/i-meteo-forecast.service';
import {GridDefinition} from '../../domain/model/grid-definition';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {BaseMapState} from '../../../base-map/state/state-model/base-map-state';
import {getMapState} from '../../../base-map/state/ngrx/base-map.selectors';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';
import {MeteoForecastLayer} from '../../domain/model/meteo-forecast-layer';


@Injectable()
export class MeteoForecastEffects {
    private readonly GRID_SPACING_PX_X = 100;
    private readonly GRID_SPACING_PX_Y = 86;

    private readonly meteoForecastState$: Observable<MeteoForecastState> = this.appStore.pipe(select(getMeteoForecastState));
    private readonly mapState$: Observable<BaseMapState> = this.appStore.pipe(select(getMapState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly meteoForecastService: IMeteoForecastService
    ) {
    }


    readForecastRunAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(
            MeteoForecastActions.open,
            MeteoForecastActions.readAvailableForecastRuns
        ),
        switchMap(action => this.meteoForecastService.readAvailableForecasts()),
        map(runs => MeteoForecastActions.readAvailableForecastRunsSuccess({forecastRuns: runs}))
    ));


    readMapTilesUrlAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(
            MeteoForecastActions.open,
            MeteoForecastActions.selectWeatherForecast,
            MeteoForecastActions.selectWindForecast,
            MeteoForecastActions.selectStep,
            MeteoForecastActions.previousStep,
            MeteoForecastActions.nextStep,
            MeteoForecastActions.readAvailableForecastRunsSuccess,
            MeteoForecastActions.changeForecastRun
        ),
        withLatestFrom(this.meteoForecastState$),
        filter(([action, meteoFcState]) => meteoFcState.selectedFcRun !== undefined && meteoFcState.selectedStep !== undefined),
        map(([action, meteoFcState]) => {
            switch (meteoFcState.showLayer) {
                case MeteoForecastLayer.WeatherLayer:
                    return this.meteoForecastService.getWeatherMapTilesUrl(meteoFcState.selectedFcRun, meteoFcState.selectedStep);
                case MeteoForecastLayer.WindLayer:
                    return this.meteoForecastService.getWindMapTilesUrl(meteoFcState.selectedFcRun, meteoFcState.selectedStep);
            }
        }),
        map(url => MeteoForecastActions.readMapTilesUrlSuccess({mapTilesUrl: url}))
    ));


    readWeatherGridAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(
            MeteoForecastActions.open,
            MeteoForecastActions.selectWeatherForecast,
            MeteoForecastActions.selectStep,
            MeteoForecastActions.previousStep,
            MeteoForecastActions.nextStep,
            BaseMapActions.mapMoved,
            MeteoForecastActions.readAvailableForecastRunsSuccess,
            MeteoForecastActions.changeForecastRun
        ),
        withLatestFrom(this.meteoForecastState$, this.mapState$),
        filter(([action, meteoFcState, mapState]) => meteoFcState.showLayer === MeteoForecastLayer.WeatherLayer),
        filter(([action, meteoFcState]) => meteoFcState.selectedFcRun !== undefined && meteoFcState.selectedStep !== undefined),
        switchMap(([action, meteoFcState, mapState]) => {
            const grid = this.getGridDefinition(mapState);

            return this.meteoForecastService.readWeatherGrid(meteoFcState.selectedFcRun, meteoFcState.selectedStep, grid);
        }),
        map(weatherValues => MeteoForecastActions.readWeatherValuesSuccess({weatherValues: weatherValues}))
    ));


    readWindGridAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(
            MeteoForecastActions.open,
            MeteoForecastActions.selectWindForecast,
            MeteoForecastActions.selectStep,
            MeteoForecastActions.previousStep,
            MeteoForecastActions.nextStep,
            BaseMapActions.mapMoved,
            MeteoForecastActions.readAvailableForecastRunsSuccess,
            MeteoForecastActions.changeForecastRun
        ),
        withLatestFrom(this.meteoForecastState$, this.mapState$),
        filter(([action, meteoFcState, mapState]) => meteoFcState.showLayer === MeteoForecastLayer.WindLayer),
        filter(([action, meteoFcState]) => meteoFcState.selectedFcRun !== undefined && meteoFcState.selectedStep !== undefined),
        switchMap(([action, meteoFcState, mapState]) => {
            const grid = this.getGridDefinition(mapState);

            return this.meteoForecastService.readWindGrid(meteoFcState.selectedFcRun, meteoFcState.selectedStep, grid);
        }),
        map(windValues => MeteoForecastActions.readWindValuesSuccess({windValues: windValues}))
    ));


    private getGridDefinition(mapState: BaseMapState): GridDefinition {
        const gridWidth = Math.floor(mapState.widthPx / this.GRID_SPACING_PX_X);
        const gridHeight = Math.floor(mapState.heightPx / this.GRID_SPACING_PX_Y);
        const stepLat = (mapState.extent.maxLon - mapState.extent.minLon) / gridWidth;
        const stepLon = (mapState.extent.maxLat - mapState.extent.minLat) / gridHeight;
        const minPos = new Position2d(mapState.extent.minLon + stepLon / 2, mapState.extent.minLat + stepLat / 2);
        const offset = stepLat / 2;

        return new GridDefinition(gridWidth, gridHeight, minPos, stepLon, stepLat, offset);
    }
}
