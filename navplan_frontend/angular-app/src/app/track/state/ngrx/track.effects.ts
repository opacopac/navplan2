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
import {ExporterActions} from '../../../exporter/state/ngrx/exporter.actions';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {ITrackRepoService} from '../../domain/service/i-track-repo.service';


@Injectable()
export class TrackEffects {
    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));
    private trackState$: Observable<TrackState> = this.appStore.pipe(select(getTrackState));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private trackService: ITrackService,
        private trackRepoService: ITrackRepoService
    ) {
    }


    readTrackList$ = createEffect(() => this.actions$.pipe(
        ofType(TrackActions.readList),
        switchMap(action => this.currentUser$),
        filter(currentUser => currentUser !== undefined),
        switchMap(currentUser => this.trackRepoService.readUserTrackList().pipe(
            map(trackList => TrackActions.readListSuccess({trackList: trackList})),
            catchError(error => of(TrackActions.readListError({error: error})))
        ))
    ));


    toggleSelectTrack$ = createEffect(() => this.actions$.pipe(
        ofType(TrackActions.toggleSelect),
        withLatestFrom(this.trackState$),
        map(([action, trackState]) => {
            if (!trackState.selectedTrack || trackState.selectedTrack.id !== action.trackId) {
                return TrackActions.read({trackId: action.trackId});
            } else {
                return TrackActions.readSuccess({track: undefined});
            }
        })
    ));


    readTrack$ = createEffect(() => this.actions$.pipe(
        ofType(TrackActions.read),
        switchMap(action => this.trackRepoService.readUserTrack(action.trackId).pipe(
            map(track => TrackActions.readSuccess({track: track})),
            catchError(error => of(TrackActions.readError({error: error})))
        ))
    ));


    readSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(TrackActions.readSuccess),
        map(action => this.trackService.calculateTrackProfile(action.track)),
        map(trackProfile => TrackActions.updateTrackProfile({trackProfile: trackProfile})),
    ));


    updateTrack$ = createEffect(() => this.actions$.pipe(
        ofType(TrackActions.update),
        switchMap(action => this.trackRepoService.updateUserTrack(action.track).pipe(
            switchMap((updatedTrack) => [
                TrackActions.updateSuccess({track: updatedTrack}),
                TrackActions.readList(),
                MessageActions.showMessage({
                    message: Message.success('Track updated successfully.')
                })
            ]),
            catchError(error => of(MessageActions.showMessage({
                    message: Message.error('Error updating track: ', error)
                }))
            ))
        )));


    deleteTrack$ = createEffect(() => this.actions$.pipe(
        ofType(TrackActions.delete),
        switchMap(action => this.trackRepoService.deleteUserTrack(action.trackId).pipe(
            switchMap((success) => [
                TrackActions.deleteSuccess({trackId: action.trackId}),
                TrackActions.readList(),
                MessageActions.showMessage({
                    message: Message.success('Track deleted successfully.')
                })
            ]),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error deleting track: ', error)
            })))
        ))
    ));


    exportTrackKml$ = createEffect(() => this.actions$.pipe(
        ofType(TrackActions.exportKml),
        switchMap(action => this.trackRepoService.exportTrackKml(action.trackId).pipe(
            map(exportedFile => ExporterActions.exportSuccess({exportedFile: exportedFile})),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error exporting track KML', error)
            })))
        ))
    ));
}
