import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {WebcamActions} from './webcam.actions';
import {WebcamService} from '../domain-service/webcam.service';
import {Observable, pipe} from 'rxjs';
import {WebcamState} from '../domain-model/webcam-state';
import {Store} from '@ngrx/store';
import {getWebcamState} from './webcam.selectors';
import {environment} from '../../../environments/environment';


@Injectable()
export class WebcamEffects {
    private readonly webcamState$: Observable<WebcamState> = this.appStore.select(pipe(getWebcamState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly webcamService: WebcamService,
    ) {
    }


    readWebcams$ = createEffect(() => this.actions$.pipe(
        ofType(WebcamActions.readWebcams),
        withLatestFrom(this.webcamState$),
        filter(([action, currentState]) => this.webcamService.isReloadRequired(action, currentState)),
        switchMap(([action, currentState]) => {
            return this.webcamService.readByExtent(
                action.extent.getOversizeExtent(environment.mapOversizeFactor),
                action.zoom
            ).pipe(
                map(newState => WebcamActions.showWebcams(newState))
            );
        })
    ));


    openWebcam$ = createEffect(() => this.actions$.pipe(
        ofType(WebcamActions.openWebcam),
        tap(action => {
            window.open(action.webcam.url);
        })
    ), { dispatch: false });
}
