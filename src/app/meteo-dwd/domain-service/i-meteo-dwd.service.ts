import {Observable} from 'rxjs/internal/Observable';
import {ValueGrid} from '../domain-model/value-grid';
import {WindSpeedDir} from '../domain-model/wind-speed-dir';
import {GridDefinition} from '../domain-model/grid-definition';


export abstract class IMeteoDwdService {
    public abstract readWindGrid(grid: GridDefinition): Observable<ValueGrid<WindSpeedDir>>;
}
