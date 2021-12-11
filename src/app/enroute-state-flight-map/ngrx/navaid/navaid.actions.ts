import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {Navaid} from '../../../enroute/domain-model/navaid';


export class NavaidActions {
    public static readonly update = createAction(
        '[FlightmapEffects] Update navaids',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly updateSuccess = createAction(
        '[NavaidEffects] Update navaids success',
        props<{ extent: Extent2d, zoom: number, navaids: Navaid[] }>()
    );
}
