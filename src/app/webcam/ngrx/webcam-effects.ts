import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {ReadWebcamsByExtentAction, ReadWebcamsByExtentSuccessAction, WebcamActionTypes} from './webcam-actions';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {WebcamService} from '../rest-service/webcam.service';


@Injectable()
export class WebcamEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly webcamService: WebcamService
    ) {
    }


    readWebcamsByExtentAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(WebcamActionTypes.READ_WEBCAMS_BY_EXTENT),
        map(action => action as ReadWebcamsByExtentAction),
        switchMap(action => this.webcamService.readWebcamsByExtent(action.extent, action.zoom).pipe(
            map(result => new ReadWebcamsByExtentSuccessAction(result)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading webcams by extent', error);
                return throwError(error);
            })
        ))
    ));
}
