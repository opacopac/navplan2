import {createAction, props} from '@ngrx/store';
import {ValueGrid} from '../../domain/model/value-grid';
import {WindInfo} from '../../domain/model/wind-info';
import {WeatherInfo} from '../../domain/model/weather-info';
import {ForecastRun} from '../../domain/model/forecast-run';


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

    public static readonly selectWindForecast = createAction(
        '[MeteoDwdContainer] Select Wind Forecast',
    );

    public static readonly selectWeatherForecast = createAction(
        '[MeteoDwdContainer] Select Weather Forecast',
    );

    public static readonly selectInterval = createAction(
        '[MeteoDwdTimeline] Select Interval',
        props<{ interval: number }>()
    );

    public static readonly readAvailableForecastRunsSuccess = createAction(
        '[MeteoDwdEffects] Read Available Forecast Runs success',
        props<{ forecastRuns: ForecastRun[] }>()
    );

    public static readonly readMapTilesUrlSuccess = createAction(
        '[MeteoDwdEffects] Read Map Tiles Url success',
        props<{ mapTilesUrl: string }>()
    );

    public static readonly readWeatherGridSuccess = createAction(
        '[MeteoDwdEffects] Read Weather Grid success',
        props<{ weatherGrid: ValueGrid<WeatherInfo> }>()
    );

    public static readonly readWindGridSuccess = createAction(
        '[MeteoDwdEffects] Read Wind Grid success',
        props<{ windGrid: ValueGrid<WindInfo> }>()
    );
}
