import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {TrafficActionTypes, ReadTrafficErrorAction, ReadTrafficSuccessAction} from './traffic.actions';
import {getTrafficState} from './traffic.selectors';
import {TrafficState} from '../domain/traffic-state';
import {TrafficAdsbexService} from '../rest/adsbex/traffic-adsbex.service';
import {AdsbexTrafficMerger} from '../use-case/adsbex-traffic/adsbex-traffic-merger';
import {SystemConfig} from '../../system/system-config';


@Injectable()
export class AdsbexTrafficEffects {
    private trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);
    private readonly adsbexTrafficMerger: AdsbexTrafficMerger;


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private readonly adsbexTrafficService: TrafficAdsbexService,
        config: SystemConfig
    ) {
        this.adsbexTrafficMerger = new AdsbexTrafficMerger(config.getDate());
    }


    @Effect()
    readAdsbexTrafficAction$: Observable<Action> = this.actions$.pipe(
        ofType(TrafficActionTypes.TRAFFIC_TIMER_TICK),
        withLatestFrom(this.trafficState$),
        mergeMap(([action, state]) => this.adsbexTrafficService.readTraffic(
            state.extent
        ).pipe(
            withLatestFrom(this.trafficState$),
            map(([adsbexTraffic, state2]) => this.adsbexTrafficMerger.merge(state2, adsbexTraffic)),
            map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
            catchError(error => of(new ReadTrafficErrorAction(error)))
        ))
    );
}
