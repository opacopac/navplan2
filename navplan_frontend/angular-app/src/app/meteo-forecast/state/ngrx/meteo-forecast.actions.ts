import {createAction, props} from '@ngrx/store';
import {WindInfo} from '../../domain/model/wind-info';
import {WeatherInfo} from '../../domain/model/weather-info';
import {ForecastRun} from '../../domain/model/forecast-run';


export class MeteoForecastActions {
    public static readonly open = createAction(
        '[MeteoForecastButton] Open Meteo Forecast',
    );

    public static readonly close = createAction(
        '[MeteoForecastEffects] Close Meteo Forecast',
    );

    public static readonly selectWindForecast = createAction(
        '[MeteoForecastContainer] Select Wind Forecast',
    );

    public static readonly selectWeatherForecast = createAction(
        '[MeteoForecastContainer] Select Weather Forecast',
    );

    public static readonly previousStep = createAction(
        '[MeteoForecastTimeline] Previous Step',
    );

    public static readonly nextStep = createAction(
        '[MeteoForecastTimeline] Next Step',
    );

    public static readonly selectStep = createAction(
        '[MeteoForecastTimeline] Select Step',
        props<{ step: number }>()
    );

    public static readonly changeModel = createAction(
        '[MeteoForecastModelInfo] Change Model',
    );

    public static readonly readAvailableForecastRuns = createAction(
        '[MeteoForecastEffects] Read Available Forecast Runs',
    );

    public static readonly readAvailableForecastRunsSuccess = createAction(
        '[MeteoForecastEffects] Read Available Forecast Runs success',
        props<{ forecastRuns: ForecastRun[] }>()
    );

    public static readonly readMapTilesUrlSuccess = createAction(
        '[MeteoForecastEffects] Read Map Tiles Url success',
        props<{ mapTilesUrl: string }>()
    );

    public static readonly readWeatherValuesSuccess = createAction(
        '[MeteoForecastEffects] Read weather values success',
        props<{ weatherValues: WeatherInfo[] }>()
    );

    public static readonly readWindValuesSuccess = createAction(
        '[MeteoForecastEffects] Read wind values success',
        props<{ windValues: WindInfo[] }>()
    );
}
