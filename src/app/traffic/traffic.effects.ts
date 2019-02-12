import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {
    ReadTrafficTimerAction,
    StartWatchTrafficAction,
    StopWatchTrafficAction,
    TrafficActionTypes,
    ReadTrafficSuccessAction,
    ReadTrafficErrorAction,
} from './traffic.actions';
import {getTrafficIsWatching, getTrafficState} from './traffic.selectors';
import {TrafficOgnService} from './services/traffic-ogn.service';
import {TrafficAdsbexchangeService} from './services/traffic-adsbexchange.service';
import {TrafficState} from './traffic-state';
import {of} from 'rxjs/internal/observable/of';
import {TrafficOpenskyService} from './services/traffic-opensky.service';
import {TrafficTimerService} from './services/traffic-timer.service';
import {TrafficAdsbexchangeService2} from './services/traffic-adsbexchange2.service';
import {TrafficDetailsService} from './services/traffic-details.service';
import {Traffic} from './model/traffic';


const TRAFFIC_MAX_AGE_SEC = 120;
const TRAFFIC_OGN_FIRST_TIME_WAIT_SEC = 1;
const TRAFFIC_IDLE_TIMEOUT_MS = 10 * 60 * 1000;


@Injectable()
export class TrafficEffects {
    private trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);
    private isWatching$: Observable<boolean> = this.appStore.select<boolean>(getTrafficIsWatching);


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private trafficOgnService: TrafficOgnService,
        private trafficOpenSkyService: TrafficOpenskyService,
        private trafficAdsbExService: TrafficAdsbexchangeService,
        private trafficAdsbExService2: TrafficAdsbexchangeService2,
        private trafficDetailsService: TrafficDetailsService,
        private trafficTimerService: TrafficTimerService) {
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

    @Effect({dispatch: false})
    startTrafficWatch$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_WATCH_START),
            tap(() => this.trafficTimerService.start())
        );


    @Effect({dispatch: false})
    stopTrafficWatch$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_WATCH_STOP),
            tap(() => this.trafficTimerService.stop())
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
                ).pipe(
                    map(traffic => new ReadTrafficSuccessAction(traffic)),
                    catchError(error => of(new ReadTrafficErrorAction(error)))
                )
            )
        );


    @Effect()
    readOpenSkyTraffic$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            map(action => action as ReadTrafficTimerAction),
            withLatestFrom(this.trafficState$),
            mergeMap(([action, trafficState]) => this.trafficOpenSkyService.readTraffic(trafficState.extent).pipe(
                map(traffic => new ReadTrafficSuccessAction(traffic)),
                catchError(error => of(new ReadTrafficErrorAction(error)))
            ))
        );


    /*@Effect()
    readAdsbExTraffic$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            map(action => action as ReadTrafficTimerAction),
            withLatestFrom(this.trafficState$),
            mergeMap(([action, trafficState]) => this.trafficAdsbExService.readTraffic(
                    trafficState.extent,
                    '15000'  // TODO
                ).pipe(
                    map(traffic => new ReadTrafficSuccessAction(traffic)),
                    catchError(error => of(new ReadTrafficErrorAction(error)))
                )
            )
        );*/


    @Effect()
    readAdsbEx2Traffic$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            map(action => action as ReadTrafficTimerAction),
            withLatestFrom(this.trafficState$),
            mergeMap(([action, trafficState]) => this.trafficAdsbExService2.readTraffic(
                    trafficState.extent
                ).pipe(
                    map(traffic => new ReadTrafficSuccessAction(traffic)),
                    catchError(error => of(new ReadTrafficErrorAction(error)))
                )
            )
        );


    @Effect()
    readTrafficDetails$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            map(action => action as ReadTrafficTimerAction),
            withLatestFrom(this.trafficState$),
            mergeMap(([action, trafficState]) => {
                return this.trafficDetailsService.readDetails(this.getMissingTrafficDetailsAcList(trafficState)).pipe(
                    map(trafficList => new ReadTrafficSuccessAction(trafficList)),
                    catchError(error => of(new ReadTrafficErrorAction(error)))
                );
            })
        );


    private getMissingTrafficDetailsAcList(trafficState: TrafficState): Traffic[] {
        const missingTrafficAcList: Traffic[] = [];

        if (trafficState.trafficMap) {
            trafficState.trafficMap.forEach(ac => missingTrafficAcList.push(ac)); // TODO: temp
        }

        return missingTrafficAcList;
    }
}
