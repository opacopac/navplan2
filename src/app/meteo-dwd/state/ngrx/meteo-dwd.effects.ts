import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MeteoDwdActions} from './meteo-dwd.actions';
import {Observable} from 'rxjs';
import {MeteoDwdState} from '../model/meteo-dwd-state';
import {getMeteoDwdState} from './meteo-dwd.selectors';
import {MeteoDwdButtonStatus} from '../../domain/model/meteo-dwd-button-status';
import {IMeteoDwdService} from '../../domain/service/i-meteo-dwd.service';
import {GridDefinition} from '../../domain/model/grid-definition';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {BaseMapState} from '../../../base-map/state/state-model/base-map-state';
import {getMapState} from '../../../base-map/state/ngrx/base-map.selectors';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';
import {MeteoDwdLayer} from '../../domain/model/meteo-dwd-layer';


@Injectable()
export class MeteoDwdEffects {
    private readonly GRID_SPACING_PX = 100;

    private readonly meteoDwdstate$: Observable<MeteoDwdState> = this.appStore.pipe(select(getMeteoDwdState));
    private readonly mapState$: Observable<BaseMapState> = this.appStore.pipe(select(getMapState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly meteoDwdService: IMeteoDwdService
    ) {
    }


    toggleAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoDwdActions.toggle),
        withLatestFrom(this.meteoDwdstate$),
        map(([action, meteoDwdState]) => {
            if (meteoDwdState.buttonStatus === MeteoDwdButtonStatus.OFF) {
                return MeteoDwdActions.open();
            } else {
                return MeteoDwdActions.close();
            }
        })
    ));


    readForecastRunAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoDwdActions.open),
        switchMap(action => this.meteoDwdService.readAvailableForecasts()),
        map(runs => MeteoDwdActions.readAvailableForecastRunsSuccess({ forecastRuns: runs }))
    ));


    readMapTilesUrlAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoDwdActions.open, MeteoDwdActions.selectWeatherForecast, MeteoDwdActions.selectWindForecast,
            MeteoDwdActions.selectInterval, MeteoDwdActions.readAvailableForecastRunsSuccess),
        withLatestFrom(this.meteoDwdstate$),
        filter(([action, meteoDwdState]) => meteoDwdState.forecastRun !== undefined),
        map(([action, meteoDwdState]) => {
            switch (meteoDwdState.showLayer) {
                case MeteoDwdLayer.WeatherLayer:
                    return this.meteoDwdService.getWeatherMapTilesUrl(meteoDwdState.forecastRun, meteoDwdState.selectedInterval);
                case MeteoDwdLayer.WindLayer:
                    return this.meteoDwdService.getWindMapTilesUrl(meteoDwdState.forecastRun, meteoDwdState.selectedInterval);
            }
        }),
        map(url => MeteoDwdActions.readMapTilesUrlSuccess({ mapTilesUrl: url }))
    ));


    readWeatherGridAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoDwdActions.open, MeteoDwdActions.selectWeatherForecast, MeteoDwdActions.selectInterval,
            BaseMapActions.mapMoved, MeteoDwdActions.readAvailableForecastRunsSuccess),
        withLatestFrom(this.meteoDwdstate$, this.mapState$),
        filter(([action, meteoDwdState, mapState]) => meteoDwdState.showLayer === MeteoDwdLayer.WeatherLayer),
        filter(([action, meteoDwdState]) => meteoDwdState.forecastRun !== undefined),
        switchMap(([action, meteoDwdState, mapState]) => {
            const grid = this.getGridDefinition(mapState);

            return this.meteoDwdService.readWeatherGrid(meteoDwdState.forecastRun, meteoDwdState.selectedInterval, grid);
        }),
        map(weatherGrid => MeteoDwdActions.readWeatherGridSuccess({ weatherGrid: weatherGrid }))
    ));


    readWindGridAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoDwdActions.open, MeteoDwdActions.selectWindForecast, MeteoDwdActions.selectInterval,
            BaseMapActions.mapMoved, MeteoDwdActions.readAvailableForecastRunsSuccess),
        withLatestFrom(this.meteoDwdstate$, this.mapState$),
        filter(([action, meteoDwdState, mapState]) => meteoDwdState.showLayer === MeteoDwdLayer.WindLayer),
        filter(([action, meteoDwdState]) => meteoDwdState.forecastRun !== undefined),
        switchMap(([action, meteoDwdState, mapState]) => {
            const grid = this.getGridDefinition(mapState);

            return this.meteoDwdService.readWindGrid(meteoDwdState.forecastRun, meteoDwdState.selectedInterval, grid);
        }),
        map(windGrid => MeteoDwdActions.readWindGridSuccess({ windGrid: windGrid }))
    ));


    private getGridDefinition(mapState: BaseMapState): GridDefinition {
        const gridWidth = Math.floor(mapState.widthPx / this.GRID_SPACING_PX);
        const gridHeight = Math.floor(mapState.heightPx / this.GRID_SPACING_PX);
        const stepLat = (mapState.extent.maxLon - mapState.extent.minLon) / gridWidth;
        const stepLon = (mapState.extent.maxLat - mapState.extent.minLat) / gridHeight;
        const minPos = new Position2d(mapState.extent.minLon + stepLon / 2, mapState.extent.minLat + stepLat / 2);

        return new GridDefinition(gridWidth, gridHeight, minPos, stepLon, stepLat);
    }
}
