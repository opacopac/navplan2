import {Actions, createEffect, ofType} from '@ngrx/effects';
import {debounceTime, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {WebcamActions} from './webcam.actions';
import {Observable, of, pipe} from 'rxjs';
import {WebcamState} from '../../../webcam/domain-model/webcam-state';
import {Store} from '@ngrx/store';
import {getWebcamState} from './webcam.selectors';
import {environment} from '../../../../environments/environment';
import {IWebcamRepo} from '../../../webcam/domain-service/i-webcam-repo';
import {BaseMapActions} from '../../../base-map/ngrx/base-map.actions';
import {DataItemType} from '../../../common/model/data-item';
import {Webcam} from '../../../webcam/domain-model/webcam';


@Injectable()
export class WebcamEffects {
    private readonly WEBCAM_MIN_ZOOM = 10;
    private readonly webcamState$: Observable<WebcamState> = this.appStore.select(pipe(getWebcamState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly webcamRepo: IWebcamRepo,
    ) {
    }


    readWebcams$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(250),
        withLatestFrom(this.webcamState$),
        filter(([action, currentState]) => !currentState.extent || !action.extent ||
            !currentState.extent.containsExtent2d(action.extent) ||
            (currentState.zoom < this.WEBCAM_MIN_ZOOM && action.zoom >= this.WEBCAM_MIN_ZOOM)),
        switchMap(([action, currentState]) => {
            if (action.zoom < this.WEBCAM_MIN_ZOOM) {
                return of({ extent: action.extent, zoom: action.zoom, webcams: [] });
            } else {
                return this.webcamRepo.readWebcamsByExtent(
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
        map(newState => WebcamActions.showWebcams(newState))
    ));


    openWebcamAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem?.dataItemType === DataItemType.webcam),
        map(action => action.dataItem as Webcam),
        tap(webcam => {
            window.open(webcam.url);
        }),
    ), { dispatch: false });
}
