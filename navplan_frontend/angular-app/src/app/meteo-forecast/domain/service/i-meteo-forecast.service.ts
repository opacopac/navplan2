import {Observable} from 'rxjs/internal/Observable';
import {WindInfo} from '../model/wind-info';
import {GridDefinition} from '../model/grid-definition';
import {WeatherInfo} from '../model/weather-info';
import {ForecastRun} from '../model/forecast-run';


export abstract class IMeteoForecastService {
    public abstract readAvailableForecasts(): Observable<ForecastRun[]>;

    public abstract readWeatherGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<WeatherInfo[]>;

    public abstract readWindGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<WindInfo[]>;

    public abstract getWeatherMapTilesUrl(forecast: ForecastRun, step: number): string;

    public abstract getWindMapTilesUrl(forecast: ForecastRun, step: number): string;
}
