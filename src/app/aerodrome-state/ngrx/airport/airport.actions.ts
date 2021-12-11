import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {ShortAirport} from '../../../aerodrome/domain-model/short-airport';


export class AirportActions {
    public static readonly update = createAction(
        '[FlightMapEffects] Update airports',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly updateSuccess = createAction(
        '[AirportEffects] Update airports success',
        props<{ extent: Extent2d, zoom: number, airports: ShortAirport[] }>()
    );
}
