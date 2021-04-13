import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {LocationService} from './services/location.service';
import {getLocationIsWatching} from './location.selectors';
import {
    LocationActionTypes,
    ReadLocationErrorAction,
    ReadLocationSuccessAction,
    StartWatchLocationAction,
    StopWatchLocationAction
} from './location.actions';


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
            ofType(LocationActionTypes.LOCATION_WATCH_TOGGLE),
            withLatestFrom(this.locationIsWatching$),
            map(([action, isWatching]) => {
                if (!isWatching) {
                    return new StartWatchLocationAction();
                } else {
                    return new StopWatchLocationAction();
                }
            })
        ));


    
    startLocationWatch$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(LocationActionTypes.LOCATION_WATCH_START),
            tap(() => this.locationService.startWatching()),
            switchMap(() => {
                return this.locationService.position$
                    .pipe(
                        map(pos => new ReadLocationSuccessAction(pos)),
                        catchError(error => of(new ReadLocationErrorAction(error)))
                    );
            })
        ));

    
    stopLocationWatch$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(LocationActionTypes.LOCATION_WATCH_STOP),
        ), { dispatch: false });
}
