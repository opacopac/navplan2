import {createAction, props} from '@ngrx/store';
import {TrafficMap} from '../../domain/model/traffic-map';


export class TrafficActions {
    public static readonly toggleWatch = createAction(
        '[Traffic button] toggle watch'
    );
    public static readonly startWatch = createAction(
        '[TrafficEffects] start watch'
    );
    public static readonly stopWatch = createAction(
        '[TrafficEffects] stop watch',
    );
    public static readonly timerTicked = createAction(
        '[TrafficEffects] timer tick',
        props<{ count: number }>()
    );
    public static readonly readSuccess = createAction(
        '[TrafficEffects] read traffic success',
        props<{ newTrafficMap: TrafficMap }>()
    );
    public static readonly readError = createAction(
        '[TrafficEffects] read traffic error',
        props<{ error: Error }>()
    );
}
