import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Navaid} from '../domain-model/navaid';


export class NavaidActions {
    public static readonly readNavaids = createAction(
        '[Flight Map] Read navaids by extent',
        props<{ extent: Extent2d, zoom: number }>()
    );
    public static readonly showNavaids = createAction(
        '[NavaidEffects] Show navaids on map',
        props<{ extent: Extent2d, zoom: number, navaids: Navaid[] }>()
    );
}
