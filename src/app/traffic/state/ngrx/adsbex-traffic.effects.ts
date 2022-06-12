import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {TrafficActions} from './traffic.actions';
import {getTrafficState} from './traffic.selectors';
import {TrafficState} from '../state-model/traffic-state';
import {AdsbexTrafficMerger} from '../../domain/service/adsbex-traffic/adsbex-traffic-merger';
import {SystemConfig} from '../../../system/domain/service/system-config';
import {IAdsbexTrafficService} from '../../domain/service/adsbex-traffic/i-adsbex-traffic-service';


@Injectable()
export class AdsbexTrafficEffects {
    private trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);
    private readonly adsbexTrafficMerger: AdsbexTrafficMerger;


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private readonly adsbexTrafficService: IAdsbexTrafficService,
        config: SystemConfig
    ) {
        this.adsbexTrafficMerger = new AdsbexTrafficMerger(config.getDate());
    }



    readAdsbexTrafficAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(TrafficActions.timerTicked),
        withLatestFrom(this.trafficState$),
        mergeMap(([action, state]) => this.adsbexTrafficService.readTraffic(
            state.extent
        ).pipe(
            withLatestFrom(this.trafficState$),
            map(([adsbexTraffic, state2]) => this.adsbexTrafficMerger.merge(state2, adsbexTraffic)),
            map(newTrafficMap => TrafficActions.readSuccess({ newTrafficMap: newTrafficMap })),
            catchError(error => of(TrafficActions.readError({ error: error })))
        ))
    ));
}
