import {createAction, props} from '@ngrx/store';
import {Position4d} from '../../../geo-physics/domain/model/geometry/position4d';


export class LocationActions {
    public static readonly toggleWatching = createAction(
        '[Location button] toggle watch'
    );
    public static readonly startWatching = createAction(
        '[LocationEffects] start watch'
    );
    public static readonly stopWatching = createAction(
        '[LocationEffects] stop watch'
    );
    public static readonly readTimerSuccess = createAction(
        '[LocationEffects] read location success',
        props<{ position: Position4d }>()
    );
    public static readonly readTimerError = createAction(
        '[LocationEffects] read location error',
        props<{ error: Error }>()
    );
}
