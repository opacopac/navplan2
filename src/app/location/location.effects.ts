import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LocationService} from './services/location/location.service';
import {getLocationIsWatching} from './location.selectors';
import {
    LocationActionTypes,
    ReadLocationErrorAction,
    ReadLocationSuccessAction,
    ReadTrackAction, ReadTrackErrorAction,
    ReadTrackListErrorAction,
    ReadTrackListSuccessAction, ReadTrackSuccessAction,
    StartWatchLocationAction,
    StopWatchLocationAction
} from './location.actions';
import {of} from 'rxjs/internal/observable/of';
import {TrackService} from './services/track/track.service';
import {User} from '../user/model/user';
import {getCurrentUser} from '../user/user.selectors';


@Injectable()
export class LocationEffects {
    private locationIsWatching$: Observable<boolean> = this.appStore.select(getLocationIsWatching);
    private currentUser$: Observable<User> = this.appStore.select(getCurrentUser);



    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private locationService: LocationService,
        private trackService: TrackService) {
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


    @Effect()
    readTrackList$: Observable<Action> = this.actions$
        .pipe(
            ofType(LocationActionTypes.LOCATION_READ_TRACK_LIST),
            switchMap(action => this.currentUser$),
            filter(currentUser => currentUser !== undefined),
            switchMap(currentUser => this.trackService.readUserTrackList(currentUser).pipe(
                map(trackList => new ReadTrackListSuccessAction(trackList)),
                catchError(error => of(new ReadTrackListErrorAction(error)))
            ))
        );


    @Effect()
    readTrack$: Observable<Action> = this.actions$
        .pipe(
            ofType(LocationActionTypes.LOCATION_READ_TRACK),
            map(action => action as ReadTrackAction),
            withLatestFrom(this.currentUser$),
            filter(([action, currentUser]) => currentUser !== undefined),
            switchMap(([action, currentUser]) => this.trackService.readUserTrack(action.id, currentUser).pipe(
                map(track => new ReadTrackSuccessAction(track)),
                catchError(error => of(new ReadTrackErrorAction(error)))
            ))
        );
}
