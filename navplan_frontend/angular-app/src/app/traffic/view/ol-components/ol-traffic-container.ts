import {combineLatest, interval, Observable, Subscription} from 'rxjs';
import {OlTraffic} from './ol-traffic';
import {Traffic} from '../../domain/model/traffic';
import {debounce, switchMap} from 'rxjs/operators';
import {TrafficState} from '../../state/state-model/traffic-state';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import { LengthUnit } from '../../../geo-physics/domain/model/quantities/length-unit';


const UPDATE_TRAFFIC_DISPLAY_DEBOUNCE_MS = 1000;

export class OlTrafficContainer {
    private readonly trafficSubscription: Subscription;


    constructor(
        private readonly trafficLayer: OlVectorLayer,
        trafficState$: Observable<TrafficState>,
        altitudeUnit$: Observable<LengthUnit>
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
        this.trafficSubscription = combineLatest([debouncedTrafficState$, altitudeUnit$])
            .subscribe(([trafficState, altitudeUnit]) => {
                this.clearFeatures();
                if (trafficState.isWatching) {
                    this.drawFeatures(
                        Array.from(trafficState.trafficMap.values()),
                        altitudeUnit
                    );
                }
            });
   }


    public destroy() {
        this.trafficSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(trafficList: Traffic[], altitudeUnit: LengthUnit) {
        if (trafficList) {
            trafficList.forEach(traffic => {
                const olTraffic = new OlTraffic(traffic, altitudeUnit);
                olTraffic.draw(this.trafficLayer);
            });
        }
    }


    private clearFeatures() {
        this.trafficLayer.clear();
    }
}
