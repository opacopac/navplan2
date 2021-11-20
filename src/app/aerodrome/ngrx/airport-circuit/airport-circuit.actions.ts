import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {AirportCircuit} from '../../domain-model/airport-circuit';


export class AirportCircuitActions {
    public static readonly showAirportCircuits = createAction(
        '[AirportCircuitEffects] Show airport circuits on map',
        props<{ extent: Extent2d, zoom: number, airportCircuits: AirportCircuit[] }>()
    );
}
