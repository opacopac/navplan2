import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, filter, flatMap, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {
    ReadAdsbExTrafficSuccessAction, ReadAdsbExTrafficSuccessError,
    ReadOgnTrafficSuccessAction, ReadOgnTrafficSuccessError,
    ReadTrafficTimerAction, StartWatchTrafficAction, StopWatchTrafficAction,
    TrafficActionTypes
} from './traffic.actions';
import {getTrafficIsWatching, getTrafficState} from './traffic.selectors';
import {TrafficOgnService} from './services/traffic-ogn.service';
import {TrafficAdsbexchangeService} from './services/traffic-adsbexchange.service';
import {TrafficState} from './traffic-state';
import {timer} from 'rxjs/internal/observable/timer';
import {of} from 'rxjs/internal/observable/of';


const TRAFFIC_UPDATE_INTERVALL_MS = 5000;
const TRAFFIC_MAX_AGE_SEC = 120;
const TRAFFIC_OGN_FIRST_TIME_WAIT_SEC = 1;
const TRAFFIC_IDLE_TIMEOUT_MS = 10 * 60 * 1000;


@Injectable()
export class TrafficEffects {
    private trafficState$: Observable<TrafficState> = this.appStore.pipe(select(getTrafficState));
    private isWatching$: Observable<boolean> = this.appStore.pipe(select(getTrafficIsWatching));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private trafficOgnService: TrafficOgnService,
        private trafficAdsbExService: TrafficAdsbexchangeService) {
    }


    @Effect()
    toggleTrafficWatch$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_WATCH_TOGGLE),
            withLatestFrom(this.isWatching$),
            map(([action, isWatching]) => {
                if (!isWatching) {
                    return new StartWatchTrafficAction();
                } else {
                    return new StopWatchTrafficAction();
                }
            })
        );


    @Effect()
    startTrafficWatch$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_WATCH_START),
            switchMap(() => timer(0, TRAFFIC_UPDATE_INTERVALL_MS)),
            withLatestFrom(this.isWatching$),
            filter(([tim, isWatching]) => tim === 0 || isWatching),
            map(([tim, isWatching]) => new ReadTrafficTimerAction(tim))
        );


    @Effect()
    readOgnTraffic$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            map(action => action as ReadTrafficTimerAction),
            withLatestFrom(this.trafficState$),
            mergeMap(([action, trafficState]) => this.trafficOgnService.readTraffic(
                trafficState.extent,
                TRAFFIC_MAX_AGE_SEC,
                action.count === 0 ? TRAFFIC_OGN_FIRST_TIME_WAIT_SEC : 0,
                trafficState.sessionId
                )
            ),
            map(traffic => new ReadOgnTrafficSuccessAction(traffic)),
            catchError(error => of(new ReadOgnTrafficSuccessError(error)))
        );


    @Effect()
    readAdsbExTraffic$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            withLatestFrom(this.trafficState$),
            mergeMap(([action, trafficState]) => this.trafficAdsbExService.readTraffic(
                trafficState.extent,
                '12345'  // TODO
                )
            ),
            map(traffic => new ReadAdsbExTrafficSuccessAction(traffic)),
            catchError(error => of(new ReadAdsbExTrafficSuccessError(error)))
        );
}



