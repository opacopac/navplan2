import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription, timer} from 'rxjs';
import {ReadTrafficTimerAction} from '../traffic.actions';
import {getTrafficIsWatching} from '../traffic.selectors';
import {filter, map, withLatestFrom} from 'rxjs/operators';


export const TRAFFIC_UPDATE_INTERVALL_MS = 5000;

@Injectable({
    providedIn: 'root'
})
export class TrafficTimerServiceConfig {
    public trafficUpdateIntervallMs = TRAFFIC_UPDATE_INTERVALL_MS;


    public static create(intervallMs: number = TRAFFIC_UPDATE_INTERVALL_MS): TrafficTimerServiceConfig {
        const config = new TrafficTimerServiceConfig();
        config.trafficUpdateIntervallMs = intervallMs;
        return config;
    }
}


@Injectable({
    providedIn: 'root'
})
export class TrafficTimerService {
    private isWatching$: Observable<boolean>;
    private readonly timer$: Observable<number>;
    private readonly isWatchingAndTimer$: Observable<number>;
    private timerSubscription: Subscription;


    constructor(
        private appStore: Store<any>,
        private config: TrafficTimerServiceConfig) {

        this.isWatching$ = this.appStore.select<boolean>(getTrafficIsWatching);
        this.timer$ = timer(1, config.trafficUpdateIntervallMs);
        this.isWatchingAndTimer$ = this.timer$.pipe(
            withLatestFrom(this.isWatching$),
            filter(([tim, isWatching]) => isWatching === true),
            map(([tim, isWatching]) => tim)
        );
    }


    public start() {
        this.timerSubscription = this.isWatchingAndTimer$.subscribe((count) => {
            this.appStore.dispatch(
                new ReadTrafficTimerAction(count)
            );
        });
    }


    public stop() {
        this.timerSubscription.unsubscribe();
    }
}
