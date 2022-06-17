import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Notam} from '../../domain/model/notam';


export class NotamActions {
    public static readonly readSuccess = createAction(
        '[NotamEffects] Read NOTAMs success',
        props<{ extent: Extent2d, zoom: number, notamList: Notam[], timestampMs: number }>()
    );
}
