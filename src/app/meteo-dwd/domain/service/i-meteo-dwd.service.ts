import {Observable} from 'rxjs/internal/Observable';
import {ValueGrid} from '../model/value-grid';
import {WindSpeedDir} from '../model/wind-speed-dir';
import {GridDefinition} from '../model/grid-definition';


export abstract class IMeteoDwdService {
    public abstract readWindGrid(grid: GridDefinition): Observable<ValueGrid<WindSpeedDir>>;
}
