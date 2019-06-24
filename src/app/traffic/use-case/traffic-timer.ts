import {Observable, timer} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {TrafficState} from '../domain/traffic-state';


export class TrafficTimer {
    public readonly TRAFFIC_UPDATE_INTERVALL_MS = 5000;

    public readonly timerTick$: Observable<number>;


    constructor(
        private trafficState$: Observable<TrafficState>
    ) {
        this.timerTick$ = timer(1, this.TRAFFIC_UPDATE_INTERVALL_MS).pipe(
            withLatestFrom(this.trafficState$),
            filter(([count, state]) => state.isWatching === true),
            map(([count, state]) => count)
        );
    }
}
