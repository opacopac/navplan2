import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {TrackService} from '../services/track.service';
import {User} from '../../user/domain/user';
import {getCurrentUser} from '../../user/ngrx/user.selectors';
import {
    ReadTrackAction,
    ReadTrackErrorAction,
    ReadTrackListErrorAction,
    ReadTrackListSuccessAction,
    ReadTrackSuccessAction,
    TrackActionTypes
} from './track.actions';


@Injectable()
export class TrackEffects {
    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));



    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private trackService: TrackService) {
    }


    
    readTrackList$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(TrackActionTypes.TRACK_READ_LIST),
            switchMap(action => this.currentUser$),
            filter(currentUser => currentUser !== undefined),
            switchMap(currentUser => this.trackService.readUserTrackList(currentUser).pipe(
                map(trackList => new ReadTrackListSuccessAction(trackList)),
                catchError(error => of(new ReadTrackListErrorAction(error)))
            ))
        ));


    
    readTrack$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(TrackActionTypes.TRACK_READ),
            map(action => action as ReadTrackAction),
            withLatestFrom(this.currentUser$),
            filter(([action, currentUser]) => currentUser !== undefined),
            switchMap(([action, currentUser]) => this.trackService.readUserTrack(action.id, currentUser).pipe(
                map(track => new ReadTrackSuccessAction(track)),
                catchError(error => of(new ReadTrackErrorAction(error)))
            ))
        ));
}
