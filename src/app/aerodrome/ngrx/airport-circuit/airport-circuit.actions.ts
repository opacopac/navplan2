import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {AirportCircuit} from '../../domain-model/airport-circuit';


export class AirportCircuitActions {
    public static readonly update = createAction(
        '[FlightMapEffects] Update airport circuits',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly updateSuccess = createAction(
        '[AirportCircuitEffects] Update airport circuits success',
        props<{ extent: Extent2d, zoom: number, airportCircuits: AirportCircuit[] }>()
    );
}
