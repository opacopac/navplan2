import {Observable} from 'rxjs/internal/Observable';
import {ValueGrid} from '../model/value-grid';
import {WindInfo} from '../model/wind-info';
import {GridDefinition} from '../model/grid-definition';
import {WeatherInfo} from '../model/weather-info';
import {ForecastRun} from '../model/forecast-run';


export abstract class IMeteoDwdService {
    public abstract readAvailableForecasts(): Observable<ForecastRun[]>;

    public abstract readWeatherGrid(grid: GridDefinition, step: number): Observable<ValueGrid<WeatherInfo>>;

    public abstract readWindGrid(grid: GridDefinition, step: number): Observable<ValueGrid<WindInfo>>;

    public abstract getWeatherMapTilesUrl(step: number): Observable<string>;

    public abstract getWindMapTilesUrl(step: number): Observable<string>;
}
