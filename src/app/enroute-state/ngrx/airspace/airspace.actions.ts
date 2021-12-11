import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../geo-physics/domain-model/geometry/extent2d';
import {Airspace} from '../../../enroute/domain-model/airspace';


export class AirspaceActions {
    public static readonly update = createAction(
        '[FlightmapEffects] Update airspaces',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly updateSuccess = createAction(
        '[AirspaceEffects] Update airspaces success',
        props<{ extent: Extent2d, zoom: number, airspaces: Airspace[] }>()
    );
}
