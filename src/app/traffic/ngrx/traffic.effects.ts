import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, timer} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {StartWatchTrafficAction, StopWatchTrafficAction, TrafficActionTypes, ReadTrafficTimerAction} from './traffic.actions';
import {getTrafficState} from './traffic.selectors';
import {TrafficState} from '../domain/traffic-state';


@Injectable()
export class TrafficEffects {
    private readonly TRAFFIC_UPDATE_INTERVALL_MS = 5000;
    private trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);


    constructor(
        private actions$: Actions,
        private appStore: Store<any>
    ) {
    }


    @Effect()
    toggleTrafficWatchAction$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_WATCH_TOGGLE),
            withLatestFrom(this.trafficState$),
            map(([action, trafficState]) => {
                if (!trafficState.isWatching) {
                    return new StartWatchTrafficAction();
                } else {
                    return new StopWatchTrafficAction();
                }
            })
        );


    @Effect()
    trafficTickAction$: Observable<Action> = timer(
        1,
        this.TRAFFIC_UPDATE_INTERVALL_MS
    ).pipe(
        withLatestFrom(this.trafficState$),
        filter(([count, state]) => state.isWatching === true),
        map(([count, state]) => new ReadTrafficTimerAction(count))
    );
}
