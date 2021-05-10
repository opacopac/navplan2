import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {NavaidActionTypes, ReadNavaidsByExtentAction, ReadNavaidsByExtentSuccessAction} from './navaid-actions';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {NavaidService} from '../rest-service/navaid.service';


@Injectable()
export class NavaidEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly navaidService: NavaidService
    ) {
    }


    readNavaidsByExtentAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(NavaidActionTypes.READ_NAVAID_BY_EXTENT),
        map(action => action as ReadNavaidsByExtentAction),
        switchMap(action => this.navaidService.readNavaidsByExtent(action.extent, action.zoom).pipe(
            map(result => new ReadNavaidsByExtentSuccessAction(result)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading navaids by extent', error);
                return throwError(error);
            })
        ))
    ));
}
