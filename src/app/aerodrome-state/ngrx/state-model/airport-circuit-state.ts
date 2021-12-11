import {Extent2d} from '../../../geo-physics/domain-model/geometry/extent2d';
import {AirportCircuit} from '../../../aerodrome/domain-model/airport-circuit';


export interface AirportCircuitState {
    extent: Extent2d;
    zoom: number;
    airportCircuits: AirportCircuit[];
}
