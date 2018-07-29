import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {TrackService} from './services/track.service';
import {User} from '../user/model/user';
import {getCurrentUser} from '../user/user.selectors';
import {
    ReadTrackAction, ReadTrackErrorAction,
    ReadTrackListErrorAction,
    ReadTrackListSuccessAction,
    ReadTrackSuccessAction,
    TrackActionTypes
} from './track.actions';


@Injectable()
export class TrackEffects {
    private currentUser$: Observable<User> = this.appStore.select(getCurrentUser);



    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private trackService: TrackService) {
    }


    @Effect()
    readTrackList$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrackActionTypes.TRACK_READ_LIST),
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
            ofType(TrackActionTypes.TRACK_READ),
            map(action => action as ReadTrackAction),
            withLatestFrom(this.currentUser$),
            filter(([action, currentUser]) => currentUser !== undefined),
            switchMap(([action, currentUser]) => this.trackService.readUserTrack(action.id, currentUser).pipe(
                map(track => new ReadTrackSuccessAction(track)),
                catchError(error => of(new ReadTrackErrorAction(error)))
            ))
        );
}
