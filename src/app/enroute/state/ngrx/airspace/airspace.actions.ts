import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../../geo-physics/domain/model/geometry/extent2d';
import {Airspace} from '../../../domain/model/airspace';


export class AirspaceActions {
    public static readonly readSuccess = createAction(
        '[AirspaceEffects] Read airspaces success',
        props<{ extent: Extent2d, zoom: number, airspaces: Airspace[] }>()
    );
}
