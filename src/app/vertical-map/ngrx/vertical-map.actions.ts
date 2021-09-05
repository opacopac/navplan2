import {createAction, props} from '@ngrx/store';


export class VerticalMapActions {
    public static readonly show = createAction(
        '[VerticalMapEffects] Show vertical map',
        props<{ dummy: number }>()
    );
    public static readonly hide = createAction(
        '[VerticalMapEffects] Hide vertical map',
    );
}
