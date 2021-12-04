import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {Navaid} from '../../domain-model/navaid';


export class NavaidActions {
    public static readonly readNavaids = createAction(
        '[FlightmapEffects] Read navaids',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly readNavaidsSuccess = createAction(
        '[NavaidEffects] Read navaids success',
        props<{ extent: Extent2d, zoom: number, navaids: Navaid[] }>()
    );
}
