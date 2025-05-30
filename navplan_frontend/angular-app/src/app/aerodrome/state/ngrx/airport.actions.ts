import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {ShortAirport} from '../../domain/model/short-airport';


export class AirportActions {
    public static readonly readSuccess = createAction(
        '[AirportEffects] Read airports success',
        props<{ extent: Extent2d, zoom: number, airports: ShortAirport[] }>()
    );
}
