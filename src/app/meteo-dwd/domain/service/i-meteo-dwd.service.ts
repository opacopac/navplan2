import {Observable} from 'rxjs/internal/Observable';
import {ValueGrid} from '../model/value-grid';
import {WindInfo} from '../model/wind-info';
import {GridDefinition} from '../model/grid-definition';
import {WeatherInfo} from '../model/weather-info';


export abstract class IMeteoDwdService {
    public abstract readWeatherGrid(grid: GridDefinition, interval: number): Observable<ValueGrid<WeatherInfo>>;

    public abstract readWindGrid(grid: GridDefinition, interval: number): Observable<ValueGrid<WindInfo>>;
}
