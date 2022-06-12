import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {NotamActions} from './notam.actions';
import {NotamState} from '../state-model/notam-state';
import {getNotamState} from './notam.selectors';
import {IDate} from '../../../system/domain/service/date/i-date';
import {SystemConfig} from '../../../system/domain/service/system-config';
import {environment} from '../../../../environments/environment';
import {INotamService} from '../../domain/service/i-notam.service';


@Injectable()
export class NotamEffects {
    private readonly NOTAMS_TIMEOUT_SEC = 60 * 60 * 3;
    private readonly date: IDate;
    private readonly notamState$: Observable<NotamState> = this.appStore.select(getNotamState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly notamService: INotamService,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    updateNotamsAction$ = createEffect(() => this.actions$.pipe(
        ofType(NotamActions.update),
        withLatestFrom(this.notamState$),
        filter(([action, notamState]) => !action.extent
            || !notamState.extent
            || notamState.zoom !== action.zoom
            || !notamState.extent.containsExtent2d(action.extent)
            || notamState.timestampMs + this.NOTAMS_TIMEOUT_SEC * 1000 < this.date.nowMs()),
        switchMap(([action, notamState]) => this.notamService.readByExtent(
            action.extent.getOversizeExtent(environment.mapOversizeFactor),
            action.zoom,
            this.date.getDayStartTimestamp(0),
            this.date.getDayEndTimestamp(2)
        ).pipe(
            map(notams => NotamActions.updateSuccess(
                {
                    extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                    zoom: action.zoom,
                    timestampMs: this.date.nowMs(),
                    notamList: notams
                }
            ))
        ))
    ));
}
