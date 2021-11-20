import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {ShortAirport} from '../../domain-model/short-airport';


export class AirportActions {
    public static readonly showAirports = createAction(
        '[AirportEffects] Show airports on map',
        props<{ extent: Extent2d, zoom: number, airports: ShortAirport[] }>()
    );
}
