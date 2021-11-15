import {createAction, props} from '@ngrx/store';
import {VerticalMap} from '../domain-model/vertical-map';


export class VerticalMapActions {
    public static readonly toggle = createAction(
        '[VerticalMapButton] Toggle vertical map',
    );
    public static readonly open = createAction(
        '[VerticalMapEffects] Open vertical map',
    );
    public static readonly show = createAction(
        '[VerticalMapEffects] Show vertical map',
        props<{ verticalMap: VerticalMap }>()
    );
    public static readonly close = createAction(
        '[VerticalMapEffects] Close vertical map',
    );
    public static readonly error = createAction(
        '[VerticalMapEffects] Error loading vertical map',
        props<{ message: string, error: Error }>()
    );
}
