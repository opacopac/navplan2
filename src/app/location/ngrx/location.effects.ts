import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {LocationService} from '../domain-service/location.service';
import {getLocationIsWatching} from './location.selectors';
import {LocationActions} from './location.actions';


@Injectable()
export class LocationEffects {
    private locationIsWatching$: Observable<boolean> = this.appStore.pipe(select(getLocationIsWatching));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private locationService: LocationService) {
    }



    toggleLocationWatch$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(LocationActions.toggleWatching),
            withLatestFrom(this.locationIsWatching$),
            map(([action, isWatching]) => {
                if (!isWatching) {
                    return LocationActions.startWatching();
                } else {
                    return LocationActions.stopWatching();
                }
            })
        ));



    startLocationWatch$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(LocationActions.startWatching),
            tap(() => this.locationService.startWatching()),
            switchMap(() => {
                return this.locationService.position$
                    .pipe(
                        map(pos => LocationActions.readTimerSuccess({ position: pos })),
                        catchError(error => of(LocationActions.readTimerError({ error: error })))
                    );
            })
        ));


    stopLocationWatch$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(LocationActions.stopWatching),
        ), { dispatch: false });
}
