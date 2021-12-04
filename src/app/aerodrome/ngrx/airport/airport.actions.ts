import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {ShortAirport} from '../../domain-model/short-airport';


export class AirportActions {
    public static readonly readAirports = createAction(
        '[FlightMapEffects] Read airports',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly readAirportsSuccess = createAction(
        '[AirportEffects] Read airports success',
        props<{ extent: Extent2d, zoom: number, airports: ShortAirport[] }>()
    );
}
