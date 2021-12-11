import {interval, Observable, Subscription} from 'rxjs';
import {OlTraffic} from './ol-traffic';
import {Traffic} from '../../traffic/domain-model/traffic';
import {debounce, switchMap} from 'rxjs/operators';
import {TrafficState} from '../../traffic-state/state-model/traffic-state';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';


const UPDATE_TRAFFIC_DISPLAY_DEBOUNCE_MS = 1000;

export class OlTrafficContainer {
    private readonly trafficSubscription: Subscription;


    constructor(
        private readonly trafficLayer: OlVectorLayer,
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
            this.clearFeatures();
            if (trafficState.isWatching) {
                this.drawFeatures(Array.from(trafficState.trafficMap.values()));
            }
        });
    }


    public destroy() {
        this.trafficSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(trafficList: Traffic[]) {
        if (trafficList) {
            trafficList.forEach(traffic => {
                const olTraffic = new OlTraffic(traffic);
                olTraffic.draw(this.trafficLayer);
            });
        }
    }


    private clearFeatures() {
        this.trafficLayer.clear();
    }
}
