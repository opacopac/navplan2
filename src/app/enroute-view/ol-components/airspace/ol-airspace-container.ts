import {Observable, Subscription} from 'rxjs';
import {Airspace} from '../../../enroute/domain-model/airspace';
import {OlAirspace} from './ol-airspace';
import {OlVectorLayer} from '../../../base-map-view/ol-model/ol-vector-layer';


export class OlAirspaceContainer {
    private readonly airspaceSubscription: Subscription;


    constructor(
        private readonly airspaceLayer: OlVectorLayer,
        airspace$: Observable<Airspace[]>
    ) {
        this.airspaceSubscription = airspace$.subscribe((airspace) => {
            this.clearFeatures();
            this.drawFeatures(airspace);
        });
    }


    public destroy() {
        this.airspaceSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(airspaces: Airspace[]) {
        if (airspaces) {
            airspaces.forEach(airspace => OlAirspace.draw(airspace, this.airspaceLayer));
        }
    }


    private clearFeatures() {
        this.airspaceLayer.clear();
    }
}
