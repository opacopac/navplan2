import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {
    ReadAdsbExTrafficSuccessAction,
    ReadOgnTrafficSuccessAction,
    ReadTrafficTimerAction, StartWatchTrafficAction, StopWatchTrafficAction,
    TrafficActionTypes
} from './traffic.actions';
import {getTrafficIsWatching, getTrafficState} from './traffic.selectors';
import {TrafficOgnService} from './services/traffic-ogn.service';
import {TrafficAdsbexchangeService} from './services/traffic-adsbexchange.service';
import {TrafficState} from './model/traffic-state';
import {timer} from 'rxjs/internal/observable/timer';


@Injectable()
export class TrafficEffects {
    private trafficState$: Observable<TrafficState> = this.appStore.select(getTrafficState);
    private isWatching$: Observable<boolean> = this.appStore.select(getTrafficIsWatching);


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
            switchMap(() => timer(0, 5000)),
            withLatestFrom(this.isWatching$),
            filter(([tim, isWatching]) => tim === 0 || isWatching),
            map(() => new ReadTrafficTimerAction())
        );


    @Effect()
    readOgnTraffic$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            withLatestFrom(this.trafficState$),
            switchMap(([action, trafficState]) => this.trafficOgnService.readTraffic(
                trafficState.extent,
                120, // TODO
                0, // TODO
                '12345'  // TODO
                )
            ),
            map(traffic => new ReadOgnTrafficSuccessAction(traffic))
        );


    @Effect()
    readAdsbExTraffic$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            withLatestFrom(this.trafficState$),
            switchMap(([action, trafficState]) => this.trafficAdsbExService.readTraffic(
                trafficState.extent,
                '12345'  // TODO
                )
            ),
            map(traffic => new ReadAdsbExTrafficSuccessAction(traffic))
        );
}
