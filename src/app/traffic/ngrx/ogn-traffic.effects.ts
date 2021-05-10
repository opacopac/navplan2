import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ReadTrafficErrorAction, ReadTrafficSuccessAction, TrafficActionTypes} from './traffic.actions';
import {getTrafficState} from './traffic.selectors';
import {TrafficState} from './traffic-state';
import {OgnTrafficService} from '../rest/ogn/ogn-traffic.service';
import {OgnTrafficMerger} from '../domain-service/ogn-traffic/ogn-traffic-merger';
import {SystemConfig} from '../../system/domain-service/system-config';


@Injectable()
export class OgnTrafficEffects {
    private readonly trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);
    private readonly ognTrafficMerger: OgnTrafficMerger;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly ognTrafficService: OgnTrafficService,
        config: SystemConfig,
    ) {
        this.ognTrafficMerger = new OgnTrafficMerger(config.getDate());
    }



    readOgnTrafficAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
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
    ));
}
