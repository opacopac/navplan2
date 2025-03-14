import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {User} from '../../../user/domain/model/user';
import {getCurrentUser} from '../../../user/state/ngrx/user.selectors';
import {TrackActions} from './track.actions';
import {TrackState} from '../state-model/track-state';
import {getTrackState} from './track.selectors';
import {ITrackService} from '../../domain/service/i-track.service';


@Injectable()
export class TrackEffects {
    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));
    private trackState$: Observable<TrackState> = this.appStore.pipe(select(getTrackState));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private trackService: ITrackService
    ) {
    }


    readTrackList$ = createEffect(() => this.actions$.pipe(
        ofType(TrackActions.readList),
        switchMap(action => this.currentUser$),
        filter(currentUser => currentUser !== undefined),
        switchMap(currentUser => this.trackService.readUserTrackList().pipe(
            map(trackList => TrackActions.readListSuccess({trackList: trackList})),
            catchError(error => of(TrackActions.readListError({error: error})))
        ))
    ));


    toggleSelectTrack$ = createEffect(() => this.actions$.pipe(
        ofType(TrackActions.toggleSelect),
        withLatestFrom(this.trackState$),
        map(([action, trackState]) => {
            if (!trackState.showTrack || trackState.showTrack.id !== action.trackId) {
                return TrackActions.read({trackId: action.trackId});
            } else {
                return TrackActions.readSuccess({track: undefined});
            }
        })
    ));


    readTrack$ = createEffect(() => this.actions$.pipe(
        ofType(TrackActions.read),
        switchMap(action => this.trackService.readUserTrack(action.trackId).pipe(
            map(track => TrackActions.readSuccess({track: track})),
            catchError(error => of(TrackActions.readError({error: error})))
        ))
    ));
}
