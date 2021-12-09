import {createAction, props} from '@ngrx/store';
import {SmaMeasurement} from '../../meteo-sma/domain-model/sma-measurement';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


export class MeteoSmaActions {
    public static readonly toggle = createAction(
        '[MeteoSmaButton] Toggle SMA measurements',
    );
    public static readonly read = createAction(
        '[MeteoSmaEffects] Read SMA measurements',
    );
    public static readonly readSuccess = createAction(
        '[MeteoSmaEffects] Read SMA measurements success',
        props<{ smaMeasurements: SmaMeasurement[], zoom: number }>()
    );
    public static readonly readError = createAction(
        '[MeteoSmaEffects] Read SMA measurements error',
        props<{ message: string, error: Error }>()
    );
    public static readonly update = createAction(
        '[FlightPlanEffects] Update SMA measurements',
        props<{ extent: Extent2d, zoom: number }>()
    );
    public static readonly updateSuccess = createAction(
        '[MeteoSmaEffects] Update SMA measurements success',
        props<{ smaMeasurements: SmaMeasurement[], zoom: number }>()
    );
    public static readonly close = createAction(
        '[MeteoSmaEffects] Close SMA measurements',
    );
}
