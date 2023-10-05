import {Extent2d} from '../../../../geo-physics/domain/model/geometry/extent2d';
import {AirportCircuit} from '../../../domain/model/airport-circuit';


export interface AirportCircuitState {
    extent: Extent2d;
    zoom: number;
    airportCircuits: AirportCircuit[];
}
