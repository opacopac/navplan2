import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Subscription} from 'rxjs';
import {OlTraffic} from './ol-traffic';
import {getTrafficState} from '../traffic.selectors';
import {Traffic} from '../model/traffic';


export class OlTrafficContainer extends OlComponent {
    private readonly trafficSubscription: Subscription;
    private readonly trafficLayer: ol.layer.Vector;
    private olTrafficList: OlTraffic[] = [];


    constructor(mapContext: MapContext) {
        super();

        this.trafficLayer = mapContext.mapService.addVectorLayer(false, false);
        const trafficState$ = mapContext.appStore.select(getTrafficState);
        this.trafficSubscription = trafficState$.subscribe((trafficState) => {
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


    private addFeatures(trafficList: Traffic[], source: ol.source.Vector) {
        if (trafficList) {
            trafficList.forEach(traffic => this.olTrafficList.push(new OlTraffic(traffic, source)));
        }
    }


    private destroyFeatures() {
        this.olTrafficList = [];
        this.trafficLayer.getSource().clear(true);
    }
}
