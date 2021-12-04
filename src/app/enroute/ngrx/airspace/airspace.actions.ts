import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {Airspace} from '../../domain-model/airspace';


export class AirspaceActions {
    public static readonly readAirspaces = createAction(
        '[FlightmapEffects] Read airspaces',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly readAirspacesSuccess = createAction(
        '[AirspaceEffects] Show airspaces on map',
        props<{ extent: Extent2d, zoom: number, airspaces: Airspace[] }>()
    );
}
