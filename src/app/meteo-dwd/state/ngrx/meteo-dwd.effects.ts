import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MeteoDwdActions} from './meteo-dwd.actions';
import {Observable} from 'rxjs';
import {MeteoDwdState} from '../model/meteo-dwd-state';
import {getMeteoDwdState} from './meteo-dwd.selectors';
import {IMeteoDwdService} from '../../domain/service/i-meteo-dwd.service';
import {GridDefinition} from '../../domain/model/grid-definition';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {BaseMapState} from '../../../base-map/state/state-model/base-map-state';
import {getMapState} from '../../../base-map/state/ngrx/base-map.selectors';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';
import {MeteoDwdLayer} from '../../domain/model/meteo-dwd-layer';


@Injectable()
export class MeteoDwdEffects {
    private readonly GRID_SPACING_PX_X = 100;
    private readonly GRID_SPACING_PX_Y = 86;

    private readonly meteoDwdstate$: Observable<MeteoDwdState> = this.appStore.pipe(select(getMeteoDwdState));
    private readonly mapState$: Observable<BaseMapState> = this.appStore.pipe(select(getMapState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly meteoDwdService: IMeteoDwdService
    ) {
    }


    readForecastRunAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoDwdActions.open, MeteoDwdActions.readAvailableForecastRuns),
        switchMap(action => this.meteoDwdService.readAvailableForecasts()),
        map(runs => MeteoDwdActions.readAvailableForecastRunsSuccess({ forecastRuns: runs }))
    ));


    readMapTilesUrlAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoDwdActions.open, MeteoDwdActions.selectWeatherForecast, MeteoDwdActions.selectWindForecast,
            MeteoDwdActions.selectStep, MeteoDwdActions.previousStep, MeteoDwdActions.nextStep,
            MeteoDwdActions.readAvailableForecastRunsSuccess),
        withLatestFrom(this.meteoDwdstate$),
        filter(([action, meteoDwdState]) => meteoDwdState.forecastRun !== undefined && meteoDwdState.selectedStep !== undefined),
        map(([action, meteoDwdState]) => {
            switch (meteoDwdState.showLayer) {
                case MeteoDwdLayer.WeatherLayer:
                    return this.meteoDwdService.getWeatherMapTilesUrl(meteoDwdState.forecastRun, meteoDwdState.selectedStep);
                case MeteoDwdLayer.WindLayer:
                    return this.meteoDwdService.getWindMapTilesUrl(meteoDwdState.forecastRun, meteoDwdState.selectedStep);
            }
        }),
        map(url => MeteoDwdActions.readMapTilesUrlSuccess({ mapTilesUrl: url }))
    ));


    readWeatherGridAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoDwdActions.open, MeteoDwdActions.selectWeatherForecast, MeteoDwdActions.selectStep, MeteoDwdActions.previousStep,
            MeteoDwdActions.nextStep, BaseMapActions.mapMoved, MeteoDwdActions.readAvailableForecastRunsSuccess),
        withLatestFrom(this.meteoDwdstate$, this.mapState$),
        filter(([action, meteoDwdState, mapState]) => meteoDwdState.showLayer === MeteoDwdLayer.WeatherLayer),
        filter(([action, meteoDwdState]) => meteoDwdState.forecastRun !== undefined && meteoDwdState.selectedStep !== undefined),
        switchMap(([action, meteoDwdState, mapState]) => {
            const grid = this.getGridDefinition(mapState);

            return this.meteoDwdService.readWeatherGrid(meteoDwdState.forecastRun, meteoDwdState.selectedStep, grid);
        }),
        map(weatherValues => MeteoDwdActions.readWeatherValuesSuccess({ weatherValues: weatherValues }))
    ));


    readWindGridAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoDwdActions.open, MeteoDwdActions.selectWindForecast, MeteoDwdActions.selectStep, MeteoDwdActions.previousStep,
            MeteoDwdActions.nextStep, BaseMapActions.mapMoved, MeteoDwdActions.readAvailableForecastRunsSuccess),
        withLatestFrom(this.meteoDwdstate$, this.mapState$),
        filter(([action, meteoDwdState, mapState]) => meteoDwdState.showLayer === MeteoDwdLayer.WindLayer),
        filter(([action, meteoDwdState]) => meteoDwdState.forecastRun !== undefined && meteoDwdState.selectedStep !== undefined),
        switchMap(([action, meteoDwdState, mapState]) => {
            const grid = this.getGridDefinition(mapState);

            return this.meteoDwdService.readWindGrid(meteoDwdState.forecastRun, meteoDwdState.selectedStep, grid);
        }),
        map(windValues => MeteoDwdActions.readWindValuesSuccess({ windValues: windValues }))
    ));


    readMeteogramAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoDwdActions.readCloudMeteogram),
        withLatestFrom(this.meteoDwdstate$),
        switchMap(([action, meteoDwdState]) => {
            return this.meteoDwdService.readCloudMeteoGram(meteoDwdState.forecastRun, action.position);
        }),
        map(response => MeteoDwdActions.readCloudMeteogramSuccess({ cloudMeteogram: response }))
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
