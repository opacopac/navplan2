import {createAction, props} from '@ngrx/store';
import {SmaMeasurement} from '../domain-model/sma-measurement';


export class MeteoSmaActions {
    public static readonly toggle = createAction(
        '[MeteoSmaButton] Toggle SMA measurements',
    );
    public static readonly read = createAction(
        '[MeteoSmaEffects] Read SMA measurements',
    );
    public static readonly update = createAction(
        '[MeteoSmaEffects] Update SMA measurements',
    );
    public static readonly readSuccess = createAction(
        '[MeteoSmaEffects] Success reading SMA measurements',
        props<{ smaMeasurements: SmaMeasurement[], zoom: number }>()
    );
    public static readonly readError = createAction(
        '[MeteoSmaEffects] Error reading SMA measurements',
        props<{ message: string, error: Error }>()
    );
    public static readonly close = createAction(
        '[MeteoSmaEffects] Close SMA measurements',
    );
}
