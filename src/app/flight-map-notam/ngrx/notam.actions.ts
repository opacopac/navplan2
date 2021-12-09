import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Notam} from '../../notam/domain-model/notam';


export class NotamActions {
    public static readonly update = createAction(
        '[FlightMapEffects] Update NOTAMs',
        props<{ extent: Extent2d, zoom: number }>()
    );


    public static readonly updateSuccess = createAction(
        '[NotamEffects] Update NOTAMs success',
        props<{ extent: Extent2d, zoom: number, notamList: Notam[], timestampMs: number }>()
    );
}
