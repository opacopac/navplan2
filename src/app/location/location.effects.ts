import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LocationService} from './services/location/location.service';
import {getLocationIsWatching} from './location.selectors';
import {
    LocationActionTypes, ReadLocationErrorAction,
    ReadLocationSuccessAction,
    StartWatchLocationAction,
    StopWatchLocationAction
} from './location.actions';
import {of} from 'rxjs/internal/observable/of';


@Injectable()
export class LocationEffects {
    private locationIsWatching$: Observable<boolean> = this.appStore.select(getLocationIsWatching);


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private locationService: LocationService) {
    }


    @Effect()
    toggleLocationWatch$: Observable<Action> = this.actions$
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
        );


    @Effect()
    startLocationWatch$: Observable<Action> = this.actions$
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
        );

    @Effect({ dispatch: false })
    stopLocationWatch$: Observable<Action> = this.actions$
        .pipe(
            ofType(LocationActionTypes.LOCATION_WATCH_STOP),
        );
}
