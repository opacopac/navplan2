import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {AirportCircuit} from '../../domain-model/airport-circuit';


export class AirportCircuitActions {
    public static readonly readAirportCircuits = createAction(
        '[FlightMapEffects] Read airport circuits',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly readAirportCircuitsSuccess = createAction(
        '[AirportCircuitEffects] Read airport circuits success',
        props<{ extent: Extent2d, zoom: number, airportCircuits: AirportCircuit[] }>()
    );
}
