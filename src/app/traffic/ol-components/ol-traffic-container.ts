import {Vector} from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import {OlComponentBase} from '../../base-map/ol/ol-component-base';
import {BaseMapContext} from '../../base-map/domain/base-map-context';
import {interval, Observable, Subscription} from 'rxjs';
import {OlTraffic} from './ol-traffic';
import {getTrafficState} from '../traffic.selectors';
import {Traffic} from '../domain/traffic';
import {select} from '@ngrx/store';
import {debounce, debounceTime, map, switchMap} from 'rxjs/operators';


const UPDATE_TRAFFIC_DISPLAY_DEBOUNCE_MS = 1000;

export class OlTrafficContainer extends OlComponentBase {
    private readonly trafficSubscription: Subscription;
    private readonly trafficLayer: VectorLayer;
    private olTrafficList: OlTraffic[] = [];


    constructor(mapContext: BaseMapContext) {
        super();

        this.trafficLayer = mapContext.mapService.addVectorLayer(false);
        const trafficState$ = mapContext.appStore.pipe(select(getTrafficState));
        const debounceTime$: Observable<number> = trafficState$.pipe(
            switchMap(trafficState => interval(trafficState.isWatching ? UPDATE_TRAFFIC_DISPLAY_DEBOUNCE_MS : 0)) // 0 debounce time if turned off
        );
        const debouncedTrafficState$ = trafficState$.pipe(
            debounce(() => debounceTime$)
        );
        this.trafficSubscription = debouncedTrafficState$.subscribe((trafficState) => {
            this.destroyFeatures();
            if (trafficState.isWatching) {
                this.addFeatures(Array.from(trafficState.trafficMap.values()), this.trafficLayer.getSource());
            }
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.trafficSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(trafficList: Traffic[], source: Vector) {
        if (trafficList) {
            trafficList.forEach(traffic => this.olTrafficList.push(new OlTraffic(traffic, source)));
        }
    }


    private destroyFeatures() {
        this.olTrafficList = [];
        this.trafficLayer.getSource().clear(true);
    }
}
