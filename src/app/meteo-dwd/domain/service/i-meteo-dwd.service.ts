import {Observable} from 'rxjs/internal/Observable';
import {ValueGrid} from '../model/value-grid';
import {WindInfo} from '../model/wind-info';
import {GridDefinition} from '../model/grid-definition';
import {WeatherInfo} from '../model/weather-info';
import {ForecastRun} from '../model/forecast-run';


export abstract class IMeteoDwdService {
    public abstract readAvailableForecasts(): Observable<ForecastRun[]>;

    public abstract readWeatherGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<ValueGrid<WeatherInfo>>;

    public abstract readWindGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<ValueGrid<WindInfo>>;

    public abstract getWeatherMapTilesUrl(forecast: ForecastRun, step: number): string;

    public abstract getWindMapTilesUrl(forecast: ForecastRun, step: number): string;
}
