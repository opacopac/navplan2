import {createAction, props} from '@ngrx/store';
import {SmaMeasurement} from '../../domain/model/sma-measurement';


export class MeteoSmaActions {
    public static readonly open = createAction(
        '[MeteoSmaEffects] Open SMA measurements',
    );
    public static readonly readSuccess = createAction(
        '[MeteoSmaEffects] Read SMA measurements success',
        props<{ smaMeasurements: SmaMeasurement[], zoom: number }>()
    );
    public static readonly readError = createAction(
        '[MeteoSmaEffects] Read SMA measurements error',
        props<{ message: string, error: Error }>()
    );
    public static readonly close = createAction(
        '[MeteoSmaEffects] Close SMA measurements',
    );
}
