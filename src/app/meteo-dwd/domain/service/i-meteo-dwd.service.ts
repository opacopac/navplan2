import {Observable} from 'rxjs/internal/Observable';
import {WindInfo} from '../model/wind-info';
import {GridDefinition} from '../model/grid-definition';
import {WeatherInfo} from '../model/weather-info';
import {ForecastRun} from '../model/forecast-run';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {CloudMeteogram} from '../../../meteo-gram/domain/model/cloud-meteogram';


export abstract class IMeteoDwdService {
    public abstract readAvailableForecasts(): Observable<ForecastRun[]>;

    public abstract readWeatherGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<WeatherInfo[]>;

    public abstract readWindGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<WindInfo[]>;

    public abstract readCloudMeteoGram(forecast: ForecastRun, position: Position2d): Observable<CloudMeteogram>;

    public abstract getWeatherMapTilesUrl(forecast: ForecastRun, step: number): string;

    public abstract getWindMapTilesUrl(forecast: ForecastRun, step: number): string;
}
