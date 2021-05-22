import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {NotamList} from '../domain-model/notam-list';


export class NotamActions {
    public static readonly readNotams = createAction(
        '[Flight Map] Read NOTAMS by extent',
        props<{ extent: Extent2d, zoom: number }>()
    );
    public static readonly showNotams = createAction(
        '[NotamEffects] Show NOTAMS on map',
        props<{ extent: Extent2d, zoom: number, notamList: NotamList, timestampMs: number }>()
    );
}
