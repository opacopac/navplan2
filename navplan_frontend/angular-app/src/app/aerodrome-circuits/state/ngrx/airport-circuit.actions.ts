import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {AirportCircuit} from '../../domain/model/airport-circuit';


export class AirportCircuitActions {
    public static readonly readSuccess = createAction(
        '[AirportCircuitEffects] Read airport circuits success',
        props<{ extent: Extent2d, zoom: number, airportCircuits: AirportCircuit[] }>()
    );
}
