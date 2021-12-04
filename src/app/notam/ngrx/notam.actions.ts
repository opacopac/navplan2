import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Notam} from '../domain-model/notam';


export class NotamActions {
    public static readonly readNotams = createAction(
        '[FlightMapEffects] Read NOTAMs',
        props<{ extent: Extent2d, zoom: number }>()
    );


    public static readonly readNotamsSuccess = createAction(
        '[NotamEffects] Read NOTAMs success',
        props<{ extent: Extent2d, zoom: number, notamList: Notam[], timestampMs: number }>()
    );
}
