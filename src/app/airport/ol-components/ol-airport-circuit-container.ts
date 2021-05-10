import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {AirportCircuit} from '../domain-model/airport-circuit';
import {OlAirportCircuit} from './ol-airport-circuit';


export class OlAirportCircuitContainer extends OlComponentBase {
    private readonly circuitsSubscription: Subscription;


    constructor(
        private readonly circuitLayer: VectorLayer,
        circuits$: Observable<AirportCircuit[]>
    ) {
        super();

        this.circuitsSubscription = circuits$.subscribe((circuits) => {
            this.clearFeatures();
            this.addFeatures(circuits);
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.circuitsSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(circuits: AirportCircuit[]) {
        if (circuits) {
            circuits.forEach(circuit => new OlAirportCircuit(circuit, this.circuitLayer));
        }
    }


    private clearFeatures() {
        this.circuitLayer.getSource().clear(true);
    }
}
