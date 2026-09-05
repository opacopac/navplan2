import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseMapState} from '../../../base-map/state/state-model/base-map-state';
import {getMapState} from '../../../base-map/state/ngrx/base-map.selectors';
import {MeteoRadarState} from './meteo-radar-state';
import {getMeteoRadarState} from './meteo-radar.selectors';
import {IMeteoRadarImageService} from '../../domain/service/i-meteo-radar-image.service';
import {MeteoRadarActions} from './meteo-radar.actions';


@Injectable()
export class MeteoRadarEffects {
    private readonly meteoRadarState$: Observable<MeteoRadarState> = this.appStore.pipe(select(getMeteoRadarState));
    private readonly mapState$: Observable<BaseMapState> = this.appStore.pipe(select(getMapState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly meteoRadarService: IMeteoRadarImageService
    ) {
    }


    readForecastRunAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(
            MeteoRadarActions.open,
            MeteoRadarActions.readAvailableRadarImages
        ),
        switchMap(action => this.meteoRadarService.readAvailableRadarImages()),
        map(images => MeteoRadarActions.readAvailableRadarImagesSuccess({images: images}))
    ));


    selectForecastRunOnOpenAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MeteoRadarActions.open),
        switchMap(() => this.meteoRadarService.readAvailableRadarImages()),
        withLatestFrom(this.mapState$),
        map(([runs, mapState]) => {
            const selectedRun = runs[runs.length - 1]; // TODO: select run based on mapState.time
            return MeteoRadarActions.selectStep({image: selectedRun});
        }),
        filter(action => action.image !== undefined)
    ));


    readMapTilesUrlAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(
            MeteoRadarActions.open,
            MeteoRadarActions.selectStep,
            MeteoRadarActions.previousStep,
            MeteoRadarActions.nextStep,
            MeteoRadarActions.readAvailableRadarImagesSuccess
        ),
        withLatestFrom(this.meteoRadarState$),
        filter(([action, meteoRadarState]) => meteoRadarState.showLayer && meteoRadarState.selectedRadarImage !== undefined),
        map(([action, meteoRadarState]) => {
            return this.meteoRadarService.getRadarImageMapTilesUrl(meteoRadarState.selectedRadarImage);
        }),
        map(url => MeteoRadarActions.readMapTilesUrlSuccess({mapTilesUrl: url}))
    ));
}
