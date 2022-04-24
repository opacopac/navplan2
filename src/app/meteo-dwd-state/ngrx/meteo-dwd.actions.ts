import {createAction} from '@ngrx/store';


export class MeteoDwdActions {
    public static readonly toggle = createAction(
        '[MeteoDwdButton] Toggle Dwd Forecast',
    );
    public static readonly open = createAction(
        '[MeteoDwdButton] Open Dwd Forecast',
    );
    public static readonly close = createAction(
        '[MeteoDwdEffects] Close Dwd Forecast',
    );
}
