import {Observable} from 'rxjs/internal/Observable';
import {ValueGrid} from '../model/value-grid';
import {WindSpeedDir} from '../model/wind-speed-dir';
import {GridDefinition} from '../model/grid-definition';
import {WwValue} from '../model/ww-value';


export abstract class IMeteoDwdService {
    public abstract readWeatherGrid(grid: GridDefinition, interval: number): Observable<ValueGrid<WwValue>>;

    public abstract readWindGrid(grid: GridDefinition, interval: number): Observable<ValueGrid<WindSpeedDir>>;
}
