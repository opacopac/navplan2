import {createAction, props} from '@ngrx/store';
import {WindInfo} from '../../domain/model/wind-info';
import {WeatherInfo} from '../../domain/model/weather-info';
import {ForecastRun} from '../../domain/model/forecast-run';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {CloudMeteogram} from '../../../meteo-gram/domain/model/cloud-meteogram';


export class MeteoDwdActions {
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

    public static readonly previousStep = createAction(
        '[MeteoDwdTimeline] Previous Step',
    );

    public static readonly nextStep = createAction(
        '[MeteoDwdTimeline] Next Step',
    );

    public static readonly selectStep = createAction(
        '[MeteoDwdTimeline] Select Step',
        props<{ step: number }>()
    );

    public static readonly readAvailableForecastRuns = createAction(
        '[MeteoDwdEffects] Read Available Forecast Runs',
    );

    public static readonly readAvailableForecastRunsSuccess = createAction(
        '[MeteoDwdEffects] Read Available Forecast Runs success',
        props<{ forecastRuns: ForecastRun[] }>()
    );

    public static readonly readMapTilesUrlSuccess = createAction(
        '[MeteoDwdEffects] Read Map Tiles Url success',
        props<{ mapTilesUrl: string }>()
    );

    public static readonly readWeatherValuesSuccess = createAction(
        '[MeteoDwdEffects] Read weather values success',
        props<{ weatherValues: WeatherInfo[] }>()
    );

    public static readonly readWindValuesSuccess = createAction(
        '[MeteoDwdEffects] Read wind values success',
        props<{ windValues: WindInfo[] }>()
    );

    // TODO: move to own module
    public static readonly readCloudMeteogram = createAction(
        '[TBD] Read cloud meteogram',
        props<{ position: Position2d }>()
    );

    // TODO: move to own module
    public static readonly readCloudMeteogramSuccess = createAction(
        '[MeteoDwdEffects] Read cloud meteogram success',
        props<{ cloudMeteogram: CloudMeteogram }>()
    );
}
