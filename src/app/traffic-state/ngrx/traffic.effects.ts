import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, timer} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {TrafficActions} from './traffic.actions';
import {getTrafficState} from './traffic.selectors';
import {TrafficState} from '../state-model/traffic-state';


@Injectable()
export class TrafficEffects {
    private readonly TRAFFIC_UPDATE_INTERVALL_MS = 5000;
    private trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);


    constructor(
        private actions$: Actions,
        private appStore: Store<any>
    ) {
    }



    toggleTrafficWatchAction$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(TrafficActions.toggleWatch),
            withLatestFrom(this.trafficState$),
            map(([action, trafficState]) => {
                if (!trafficState.isWatching) {
                    return TrafficActions.startWatch();
                } else {
                    return TrafficActions.stopWatch();
                }
            })
        ));



    trafficTickAction$: Observable<Action> = createEffect(() => timer(
        1,
        this.TRAFFIC_UPDATE_INTERVALL_MS
    ).pipe(
        withLatestFrom(this.trafficState$),
        filter(([count, state]) => state.isWatching === true),
        map(([count, state]) => TrafficActions.timerTicked({ count: count }))
    ));
}
