import {interval, Observable, Subscription} from 'rxjs';
import {OlTraffic} from './ol-traffic';
import {Traffic} from '../domain-model/traffic';
import {debounce, switchMap} from 'rxjs/operators';
import {TrafficState} from '../ngrx/traffic-state';
import VectorLayer from 'ol/layer/Vector';


const UPDATE_TRAFFIC_DISPLAY_DEBOUNCE_MS = 1000;

export class OlTrafficContainer {
    private readonly trafficSubscription: Subscription;


    constructor(
        private readonly trafficLayer: VectorLayer,
        trafficState$: Observable<TrafficState>
    ) {
        const debounceTime$: Observable<number> = trafficState$.pipe(
            switchMap(trafficState => interval(
                trafficState.isWatching
                    ? UPDATE_TRAFFIC_DISPLAY_DEBOUNCE_MS
                    : 0
            )) // 0 debounce time if turned off
        );
        const debouncedTrafficState$ = trafficState$.pipe(
            debounce(() => debounceTime$)
        );
        this.trafficSubscription = debouncedTrafficState$.subscribe((trafficState) => {
            this.destroyFeatures();
            if (trafficState.isWatching) {
                this.addFeatures(Array.from(trafficState.trafficMap.values()));
            }
        });
    }


    public destroy() {
        this.trafficSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(trafficList: Traffic[]) {
        if (trafficList) {
            trafficList.forEach(traffic => {
                const olTraffic = new OlTraffic(traffic);
                olTraffic.draw(this.trafficLayer);
            });
        }
    }


    private destroyFeatures() {
        this.trafficLayer.getSource().clear(true);
    }
}
