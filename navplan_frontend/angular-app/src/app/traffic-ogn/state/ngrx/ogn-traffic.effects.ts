import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {TrafficActions} from '../../../traffic/state/ngrx/traffic.actions';
import {getTrafficState} from '../../../traffic/state/ngrx/traffic.selectors';
import {TrafficState} from '../../../traffic/state/state-model/traffic-state';
import {OgnTrafficMerger} from '../../domain/service/ogn-traffic-merger';
import {SystemConfig} from '../../../system/domain/service/system-config';
import {IOgnTrafficService} from '../../domain/service/i-ogn-traffic-service';


@Injectable()
export class OgnTrafficEffects {
    private readonly trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);
    private readonly ognTrafficMerger: OgnTrafficMerger;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly ognTrafficService: IOgnTrafficService,
        config: SystemConfig,
    ) {
        this.ognTrafficMerger = new OgnTrafficMerger(config.getDate());
    }



    readOgnTrafficAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(TrafficActions.timerTicked),
        withLatestFrom(this.trafficState$),
        mergeMap(([action, state]) => this.ognTrafficService.readTraffic(
            state.extent,
            state.maxTrafficAgeSec,
            0,
            state.sessionId
        ).pipe(
            withLatestFrom(this.trafficState$),
            map(([ognTraffic, state2]) => this.ognTrafficMerger.merge(state2, ognTraffic)),
            map(newTrafficMap => TrafficActions.readSuccess({ newTrafficMap: newTrafficMap })),
            catchError(error => of(TrafficActions.readError({ error: error })))
        ))
    ));
}
