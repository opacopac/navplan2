import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {TrafficActionTypes, ReadTrafficErrorAction, ReadTrafficSuccessAction} from './traffic.actions';
import {getTrafficState} from './traffic.selectors';
import {TrafficState} from '../domain/traffic-state';
import {TrafficOgnService} from '../rest/ogn/traffic-ogn.service';
import {OgnTrafficMerger} from '../use-case/ogn-traffic/ogn-traffic-merger';
import {SystemConfig} from '../../system/system-config';


@Injectable()
export class OgnTrafficEffects {
    private readonly trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);
    private readonly ognTrafficMerger: OgnTrafficMerger;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly ognTrafficService: TrafficOgnService,
        config: SystemConfig,
    ) {
        this.ognTrafficMerger = new OgnTrafficMerger(config.getDate());
    }


    @Effect()
    readOgnTrafficAction$: Observable<Action> = this.actions$.pipe(
        ofType(TrafficActionTypes.TRAFFIC_TIMER_TICK),
        withLatestFrom(this.trafficState$),
        mergeMap(([action, state]) => this.ognTrafficService.readTraffic(
            state.extent,
            state.maxTrafficAgeSec,
            0,
            state.sessionId
        ).pipe(
            withLatestFrom(this.trafficState$),
            map(([ognTraffic, state2]) => this.ognTrafficMerger.merge(state2, ognTraffic)),
            map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
            catchError(error => of(new ReadTrafficErrorAction(error)))
        ))
    );
}
