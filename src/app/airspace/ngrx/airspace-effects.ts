import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AirspaceActionTypes, ReadAirspacesByExtentAction, ReadAirspacesByExtentSuccessAction} from './airspace-actions';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {AirspaceService} from '../rest-service/airspace.service';


@Injectable()
export class AirspaceEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly airspaceService: AirspaceService
    ) {
    }


    readAirspacesByExtentAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(AirspaceActionTypes.READ_AIRSPACE_BY_EXTENT),
        map(action => action as ReadAirspacesByExtentAction),
        switchMap(action => this.airspaceService.readAirspacesByExtent(action.extent, action.zoom).pipe(
            map(result => new ReadAirspacesByExtentSuccessAction(result)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading airspaces by extent', error);
                return throwError(error);
            })
        ))
    ));
}
