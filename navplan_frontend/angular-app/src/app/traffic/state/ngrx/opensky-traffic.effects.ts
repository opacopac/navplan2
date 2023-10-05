import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {TrafficActions} from './traffic.actions';
import {getTrafficState} from './traffic.selectors';
import {TrafficState} from '../state-model/traffic-state';
import {OpenskyTrafficMerger} from '../../domain/service/opensky-traffic/opensky-traffic-merger';
import {SystemConfig} from '../../../system/domain/service/system-config';
import {IOpenskyTrafficService} from '../../domain/service/opensky-traffic/i-opensky-traffic-service';


@Injectable()
export class OpenskyTrafficEffects {
    private readonly trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);
    private readonly openskyTrafficMerger: OpenskyTrafficMerger;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly openskyTrafficService: IOpenskyTrafficService,
        config: SystemConfig
    ) {
        this.openskyTrafficMerger = new OpenskyTrafficMerger(config.getDate());
    }



    readOpenSkyTrafficAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(TrafficActions.timerTicked),
        withLatestFrom(this.trafficState$),
        mergeMap(([action, state]) => this.openskyTrafficService.readTraffic(state.extent).pipe(
            withLatestFrom(this.trafficState$),
            map(([openskyTraffic, state2]) => this.openskyTrafficMerger.merge(state2, openskyTraffic)),
            map(newTrafficMap => TrafficActions.readSuccess({ newTrafficMap: newTrafficMap })),
            catchError(error => of(TrafficActions.readError({ error: error })))
        ))
    ));
}
