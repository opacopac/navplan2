import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {tap, withLatestFrom} from 'rxjs/operators';
import {TrafficService} from './services/traffic.service';
import {TrafficActionTypes} from './traffic.actions';
import {getTrafficIsWatching} from './traffic.selectors';


@Injectable()
export class TrafficEffects {
    private trafficIsWatching$: Observable<boolean> = this.appStore.select(getTrafficIsWatching);


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private trafficService: TrafficService) {
    }


    @Effect({ dispatch: false })
    toggleTrafficWatch$: Observable<any> = this.actions$
        .pipe(
            ofType(TrafficActionTypes.TRAFFIC_TOGGLE_WATCH),
            withLatestFrom(this.trafficIsWatching$),
            tap(([action, isWatching]) => {
                if (isWatching) {
                    // this.trafficService.stopWatching();
                } else {
                    // this.trafficService.startWatching();
                }
            })
        );
}
