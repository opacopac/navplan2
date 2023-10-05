import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {WebcamActions} from './webcam.actions';
import {Observable, of, pipe} from 'rxjs';
import {WebcamState} from '../state-model/webcam-state';
import {Store} from '@ngrx/store';
import {getWebcamState} from './webcam.selectors';
import {environment} from '../../../../environments/environment';
import {IWebcamService} from '../../domain/service/i-webcam.service';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';


@Injectable()
export class WebcamEffects {
    private readonly WEBCAM_MIN_ZOOM = 10;
    private readonly webcamState$: Observable<WebcamState> = this.appStore.select(pipe(getWebcamState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly webcamService: IWebcamService,
    ) {
    }


    updateWebcams$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMovedDebounced),
        withLatestFrom(this.webcamState$),
        filter(([action, currentState]) => !currentState.extent || !action.extent ||
            !currentState.extent.containsExtent2d(action.extent) ||
            (currentState.zoom < this.WEBCAM_MIN_ZOOM && action.zoom >= this.WEBCAM_MIN_ZOOM)),
        switchMap(([action, currentState]) => {
            if (action.zoom < this.WEBCAM_MIN_ZOOM) {
                return of({ extent: action.extent, zoom: action.zoom, webcams: [] });
            } else {
                return this.webcamService.readWebcamsByExtent(
                    action.extent.getOversizeExtent(environment.mapOversizeFactor)
                ).pipe(
                    map(webcams => ({
                        extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                        zoom: action.zoom,
                        webcams: webcams,
                    }))
                );
            }
        }),
        map(newState => WebcamActions.readSuccess(newState))
    ));


    openWebcamAction$ = createEffect(() => this.actions$.pipe(
        ofType(WebcamActions.show),
        tap(action => {
            window.open(action.webcam.url);
        }),
    ), { dispatch: false });
}
