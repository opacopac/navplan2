import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {Airspace} from '../domain-model/airspace';
import {OlAirspace} from './ol-airspace';


export class OlAirspaceContainer extends OlComponentBase {
    private readonly airspaceSubscription: Subscription;


    constructor(
        private readonly airspaceLayer: VectorLayer,
        airspace$: Observable<Airspace[]>
    ) {
        super();

        this.airspaceSubscription = airspace$.subscribe((airspace) => {
            this.clearFeatures();
            this.addFeatures(airspace);
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.airspaceSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(airspaces: Airspace[]) {
        if (airspaces) {
            airspaces.forEach(airspace => new OlAirspace(airspace, this.airspaceLayer));
        }
    }


    private clearFeatures() {
        this.airspaceLayer.getSource().clear(true);
    }
}
