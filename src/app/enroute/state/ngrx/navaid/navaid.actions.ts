import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../../geo-physics/domain/model/geometry/extent2d';
import {Navaid} from '../../../domain/model/navaid';


export class NavaidActions {
    public static readonly readSuccess = createAction(
        '[NavaidEffects] Read navaids success',
        props<{ extent: Extent2d, zoom: number, navaids: Navaid[] }>()
    );
}
