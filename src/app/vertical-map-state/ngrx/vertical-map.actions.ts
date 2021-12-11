import {createAction, props} from '@ngrx/store';
import {VerticalMap} from '../../vertical-map/domain-model/vertical-map';


export class VerticalMapActions {
    public static readonly toggle = createAction(
        '[VerticalMapButton] Toggle vertical map',
    );
    public static readonly read = createAction(
        '[VerticalMapEffects] Read vertical map',
    );
    public static readonly update = createAction(
        '[VerticalMapEffects] Update vertical map',
    );
    public static readonly readSuccess = createAction(
        '[VerticalMapEffects] Success reading vertical map',
        props<{ verticalMap: VerticalMap }>()
    );
    public static readonly readError = createAction(
        '[VerticalMapEffects] Error reading vertical map',
        props<{ message: string, error: Error }>()
    );
    public static readonly close = createAction(
        '[VerticalMapEffects] Close vertical map',
    );
}
