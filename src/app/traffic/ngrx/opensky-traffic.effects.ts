import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ReadTrafficErrorAction, ReadTrafficSuccessAction, TrafficActionTypes} from './traffic.actions';
import {getTrafficState} from './traffic.selectors';
import {TrafficState} from '../domain/traffic-state';
import {TrafficOpenskyService} from '../rest/opensky/traffic-opensky.service';
import {OpenskyTrafficMerger} from '../use-case/opensky-traffic/opensky-traffic-merger';
import {SystemConfig} from '../../system/system-config';


@Injectable()
export class OpenskyTrafficEffects {
    private readonly trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);
    private readonly openskyTrafficMerger: OpenskyTrafficMerger;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly openskyTrafficService: TrafficOpenskyService,
        config: SystemConfig
    ) {
        this.openskyTrafficMerger = new OpenskyTrafficMerger(config.getDate());
    }


    
    readOpenSkyTrafficAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(TrafficActionTypes.TRAFFIC_TIMER_TICK),
        withLatestFrom(this.trafficState$),
        mergeMap(([action, state]) => this.openskyTrafficService.readTraffic(
            state.extent
        ).pipe(
            withLatestFrom(this.trafficState$),
            map(([openskyTraffic, state2]) => this.openskyTrafficMerger.merge(state2, openskyTraffic)),
            map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
            catchError(error => of(new ReadTrafficErrorAction(error)))
        ))
    ));
}
