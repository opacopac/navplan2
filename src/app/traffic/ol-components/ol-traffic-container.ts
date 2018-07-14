import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Subscription} from 'rxjs';
import {OlTraffic} from './ol-traffic';
import {getTrafficState} from '../traffic.selectors';
import {Traffic} from '../model/traffic';
import {ArrayService} from '../../shared/services/array/array.service';


export class OlTrafficContainer extends OlComponent {
    private readonly trafficSubscription: Subscription;
    private readonly olTrafficList: OlTraffic[] = [];


    constructor(mapContext: MapContext) {
        super();

        const source = mapContext.mapService.trafficLayer.getSource();
        const trafficState$ = mapContext.appStore.select(getTrafficState);
        this.trafficSubscription = trafficState$.subscribe((trafficState) => {
            this.destroyFeatures();
            if (trafficState.isWatching) {
                this.addFeatures(Array.from(trafficState.trafficMap.values()), source);
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


    private addFeatures(trafficList: Traffic[], source: ol.source.Vector) {
        this.destroyFeatures();
        if (trafficList) {
            trafficList.forEach(traffic => this.olTrafficList.push(new OlTraffic(traffic, source)));
        }
    }


    private destroyFeatures() {
        this.olTrafficList.forEach(olComponent => olComponent.destroy());
        ArrayService.clear<OlTraffic>(this.olTrafficList);
    }
}
