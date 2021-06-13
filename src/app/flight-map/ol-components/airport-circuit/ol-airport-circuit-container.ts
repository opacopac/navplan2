import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {AirportCircuit} from '../../../aerodrome/domain-model/airport-circuit';
import {OlAirportCircuit} from './ol-airport-circuit';


export class OlAirportCircuitContainer {
    private readonly circuitsSubscription: Subscription;


    constructor(
        private readonly circuitLayer: VectorLayer,
        circuits$: Observable<AirportCircuit[]>
    ) {
        this.circuitsSubscription = circuits$.subscribe((circuits) => {
            this.clearFeatures();
            this.addFeatures(circuits);
        });
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
