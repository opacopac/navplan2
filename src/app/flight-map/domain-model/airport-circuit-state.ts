import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {AirportCircuit} from '../../aerodrome/domain-model/airport-circuit';


export interface AirportCircuitState {
    extent: Extent2d;
    zoom: number;
    airportCircuits: AirportCircuit[];
}