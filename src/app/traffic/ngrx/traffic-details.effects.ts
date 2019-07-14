import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {TrafficActionTypes, ReadTrafficErrorAction, ReadTrafficSuccessAction} from './traffic.actions';
import {getTrafficState} from './traffic.selectors';
import {TrafficState} from '../domain/traffic-state';
import {TrafficDetailsMerger} from '../use-case/traffic-details/traffic-details-merger';
import {TrafficDetailsService} from '../rest/traffic-details/traffic-details.service';
import {TrafficMap} from '../domain/traffic-map';
import {Traffic} from '../domain/traffic';


@Injectable()
export class TrafficDetailsEffects {
    private readonly trafficState$: Observable<TrafficState> = this.appStore.select<TrafficState>(getTrafficState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly trafficDetailsService: TrafficDetailsService,
    ) {
    }


    @Effect()
    readTrafficDetailsAction$: Observable<Action> = this.actions$.pipe(
        ofType(TrafficActionTypes.TRAFFIC_TIMER_TICK),
        withLatestFrom(this.trafficState$),
        map(([action, state]) => this.getMissingTrafficDetailsAcList(state.trafficMap)),
        filter(trafficList => trafficList.length > 0),
        mergeMap(trafficList => this.trafficDetailsService.readDetails(
            trafficList
        ).pipe(
            withLatestFrom(this.trafficState$),
            map(([trafficDetails, state2]) => TrafficDetailsMerger.merge(state2, trafficDetails)),
            map(newTrafficMap => new ReadTrafficSuccessAction(newTrafficMap)),
            catchError(error => of(new ReadTrafficErrorAction(error)))
        ))
    );


    private getMissingTrafficDetailsAcList(trafficMap: TrafficMap): Traffic[] {
        const missingTrafficAcList: Traffic[] = [];

        if (trafficMap) {
            trafficMap.forEach(ac => {
                if (!ac.isDetailsLoaded) {
                    missingTrafficAcList.push(ac);
                }
            });
        }

        return missingTrafficAcList;
    }
}
