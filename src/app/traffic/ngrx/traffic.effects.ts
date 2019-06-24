import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {
    StartWatchTrafficAction,
    StopWatchTrafficAction,
    TrafficActionTypes,
    ReadTrafficErrorAction,
    ReadTrafficSuccessAction, ReadTrafficTimerAction,
} from './traffic.actions';
import {getTrafficState} from './traffic.selectors';
import {TrafficOgnService} from '../rest/ogn/traffic-ogn.service';
import {TrafficState} from '../domain/traffic-state';
import {TrafficOpenskyService} from '../rest/opensky/traffic-opensky.service';
import {TrafficDetailsService} from '../rest/traffic-details/traffic-details.service';
import {TrafficDetailsReader} from '../use-case/traffic-details/traffic-details-reader';
import {TrafficAdsbexService} from '../rest/adsbex/traffic-adsbex.service';
import {OgnTrafficReader} from '../use-case/ogn-traffic/ogn-traffic-reader';
import {OpenskyTrafficReader} from '../use-case/opensky-traffic/opensky-traffic-reader';
import {AdsbexTrafficReader} from '../use-case/adsbex-traffic/adsbex-traffic-reader';
import {JsDate} from '../../shared/services/date/js-date';
import {TrafficTimer} from '../use-case/traffic-timer';


@Injectable()
export class TrafficEffects {
    private trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);
    private ognTrafficReader: OgnTrafficReader;
    private adsbexTrafficReader: AdsbexTrafficReader;
    private openskyTrafficReader: OpenskyTrafficReader;
    private trafficDetailsReader: TrafficDetailsReader;


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        trafficOgnService: TrafficOgnService,
        trafficAdsbexService: TrafficAdsbexService,
        trafficOpenSkyService: TrafficOpenskyService,
        trafficDetailsService: TrafficDetailsService,
    ) {
        const date = new JsDate();
        this.ognTrafficReader = new OgnTrafficReader(trafficOgnService, this.trafficState$, date);
        this.adsbexTrafficReader = new AdsbexTrafficReader(trafficAdsbexService, this.trafficState$, date);
        this.openskyTrafficReader = new OpenskyTrafficReader(trafficOpenSkyService, this.trafficState$, date);
        this.trafficDetailsReader = new TrafficDetailsReader(trafficDetailsService, this.trafficState$);
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
    trafficTickAction$: Observable<Action> = new TrafficTimer(this.trafficState$).timerTick$.pipe(
        map(count => new ReadTrafficTimerAction(count))
    );


    @Effect()
    readOgnTrafficAction$: Observable<Action> = this.actions$.pipe(
        ofType(TrafficActionTypes.TRAFFIC_TIMER_TICK),
        mergeMap(() => {
            return this.ognTrafficReader.read().pipe(
                map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
                catchError(error => of(new ReadTrafficErrorAction(error)))
            );
        })
    );


    @Effect()
    readAdsbexTrafficAction$: Observable<Action> = this.actions$.pipe(
        ofType(TrafficActionTypes.TRAFFIC_TIMER_TICK),
        mergeMap(() => {
            return this.adsbexTrafficReader.read().pipe(
                map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
                catchError(error => of(new ReadTrafficErrorAction(error)))
            );
        })
    );


    @Effect()
    readOpenSkyTrafficAction$: Observable<Action> = this.actions$.pipe(
        ofType(TrafficActionTypes.TRAFFIC_TIMER_TICK),
        mergeMap(() => {
            return this.openskyTrafficReader.read().pipe(
                map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
                catchError(error => of(new ReadTrafficErrorAction(error)))
            );
        })
    );


    @Effect()
    readTrafficDetailsAction$: Observable<Action> = this.actions$.pipe(
        ofType(TrafficActionTypes.TRAFFIC_TIMER_TICK),
        mergeMap(() => {
            return this.trafficDetailsReader.read().pipe(
                map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
                catchError(error => of(new ReadTrafficErrorAction(error)))
            );
        })
    );
}
