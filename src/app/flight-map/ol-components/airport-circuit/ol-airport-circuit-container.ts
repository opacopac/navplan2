import {Observable, Subscription} from 'rxjs';
import {AirportCircuit} from '../../../aerodrome/domain-model/airport-circuit';
import {OlAirportCircuit} from './ol-airport-circuit';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';


export class OlAirportCircuitContainer {
    private readonly circuitsSubscription: Subscription;


    constructor(
        private readonly circuitLayer: OlVectorLayer,
        circuits$: Observable<AirportCircuit[]>
    ) {
        this.circuitsSubscription = circuits$.subscribe((circuits) => {
            this.clearFeatures();
            this.drawFeatures(circuits);
        });
    }


    public destroy() {
        this.circuitsSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(circuits: AirportCircuit[]) {
        if (circuits) {
            circuits.forEach(circuit => OlAirportCircuit.draw(circuit, this.circuitLayer));
        }
    }


    private clearFeatures() {
        this.circuitLayer.clear();
    }
}
