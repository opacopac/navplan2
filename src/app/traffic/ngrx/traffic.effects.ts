import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {
    StartWatchTrafficAction,
    StopWatchTrafficAction,
    TrafficActionTypes,
    ReadTrafficErrorAction,
    ReadTrafficSuccessAction,
} from './traffic.actions';
import {getTrafficIsWatching, getTrafficState} from './traffic.selectors';
import {TrafficOgnService} from '../rest/ogn/traffic-ogn.service';
import {TrafficState} from '../domain/traffic-state';
import {TrafficOpenskyService} from '../rest/opensky/traffic-opensky.service';
import {TrafficTimerService} from '../use-case/traffic-timer.service';
import {TrafficDetailsService} from '../rest/traffic-details/traffic-details.service';
import {TrafficDetailsReader} from '../use-case/traffic-details/traffic-details-reader';
import {TrafficAdsbexService} from '../rest/adsbex/traffic-adsbex.service';
import {OgnTrafficReader} from '../use-case/ogn-traffic/ogn-traffic-reader';
import {OpenskyTrafficReader} from '../use-case/opensky-traffic/opensky-traffic-reader';
import {AdsbexTrafficReader} from '../use-case/adsbex-traffic/adsbex-traffic-reader';
import {JsDate} from '../../shared/services/date/js-date';
import {OgnTrafficMerger} from '../use-case/ogn-traffic/ogn-traffic-merger';
import {TrafficDetailsMerger} from '../use-case/traffic-details/traffic-details-merger';
import {OpenskyTrafficMerger} from '../use-case/opensky-traffic/opensky-traffic-merger';
import {AdsbexTrafficMerger} from '../use-case/adsbex-traffic/adsbex-traffic-merger';


@Injectable()
export class TrafficEffects {
    private trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);
    private isWatching$: Observable<boolean> = this.appStore.select<boolean>(getTrafficIsWatching);
    private ognTrafficReader: OgnTrafficReader;
    private adsbexTrafficReader: AdsbexTrafficReader;
    private openskyTrafficReader: OpenskyTrafficReader;
    private trafficDetailsReader: TrafficDetailsReader;
    private ognTrafficMerger: OgnTrafficMerger;
    private adsbexTrafficMerger: AdsbexTrafficMerger;
    private openskyTrafficMerger: OpenskyTrafficMerger;


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        trafficOgnService: TrafficOgnService,
        trafficAdsbexService: TrafficAdsbexService,
        trafficOpenSkyService: TrafficOpenskyService,
        trafficDetailsService: TrafficDetailsService,
        private trafficTimerService: TrafficTimerService
    ) {
        const date = new JsDate();
        this.ognTrafficReader = new OgnTrafficReader(trafficOgnService);
        this.adsbexTrafficReader = new AdsbexTrafficReader(trafficAdsbexService);
        this.openskyTrafficReader = new OpenskyTrafficReader(trafficOpenSkyService);
        this.trafficDetailsReader = new TrafficDetailsReader(trafficDetailsService);
        this.ognTrafficMerger = new OgnTrafficMerger(date);
        this.adsbexTrafficMerger = new AdsbexTrafficMerger(date);
        this.openskyTrafficMerger = new OpenskyTrafficMerger(date);
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
            withLatestFrom(this.trafficState$),
            mergeMap(([action, trafficState]) => {
                return this.ognTrafficReader.read(
                    trafficState.extent,
                    trafficState.sessionId,
                    trafficState.maxTrafficAgeSec
                ).pipe(
                    withLatestFrom(this.trafficState$),
                    map(([ognTraffic, trafficState2]) => this.ognTrafficMerger.merge(trafficState2, ognTraffic)),
                    map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
                    catchError(error => of(new ReadTrafficErrorAction(error)))
                );
            })
        );


    @Effect()
    readAdsbexTraffic$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            withLatestFrom(this.trafficState$),
            mergeMap(([action, trafficState]) => {
                return this.adsbexTrafficReader.read(trafficState.extent).pipe(
                    withLatestFrom(this.trafficState$),
                    map(([adsbTraffic, trafficState2]) => this.adsbexTrafficMerger.merge(trafficState2, adsbTraffic)),
                    map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
                    catchError(error => of(new ReadTrafficErrorAction(error)))
                );
            })
        );


    @Effect()
    readOpenSkyTraffic$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            withLatestFrom(this.trafficState$),
            mergeMap(([action, trafficState]) => {
                return this.openskyTrafficReader.read(trafficState.extent).pipe(
                    withLatestFrom(this.trafficState$),
                    map(([openskyTraffic, trafficState2]) => this.openskyTrafficMerger.merge(trafficState2, openskyTraffic)),
                    map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
                    catchError(error => of(new ReadTrafficErrorAction(error)))
                );
            })
        );


    @Effect()
    readTrafficDetails$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_READ_TIMER),
            withLatestFrom(this.trafficState$),
            mergeMap(([action, trafficState]) => {
                return this.trafficDetailsReader.read(trafficState.trafficMap).pipe(
                    withLatestFrom(this.trafficState$),
                    map(([trafficDetails, trafficState2]) => TrafficDetailsMerger.merge(trafficState2, trafficDetails)),
                    map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
                    catchError(error => of(new ReadTrafficErrorAction(error)))
                );
            })
        );
}
