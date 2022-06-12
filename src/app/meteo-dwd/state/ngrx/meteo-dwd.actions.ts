import {createAction, props} from '@ngrx/store';
import {ValueGrid} from '../../domain/model/value-grid';
import {WindSpeedDir} from '../../domain/model/wind-speed-dir';


export class MeteoDwdActions {
    public static readonly toggle = createAction(
        '[MeteoDwdButton] Toggle Dwd Forecast',
    );
    public static readonly open = createAction(
        '[MeteoDwdButton] Open Dwd Forecast',
    );
    public static readonly selectInterval = createAction(
        '[MeteoDwdTimeline] Select Interval',
        props<{ interval: number }>()
    );
    public static readonly close = createAction(
        '[MeteoDwdEffects] Close Dwd Forecast',
    );

    public static readonly readWindGridSuccess = createAction(
        '[MeteoDwdEffects] Read Wind Grid success',
        props<{ windGrid: ValueGrid<WindSpeedDir> }>()
    );
}