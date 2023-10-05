import {Observable} from 'rxjs/internal/Observable';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {CloudMeteogram} from '../model/cloud-meteogram';
import {ForecastRun} from '../../../meteo-dwd/domain/model/forecast-run';


export abstract class IMeteoGramService {
    public abstract readCloudMeteoGram(forecast: ForecastRun, position: Position2d): Observable<CloudMeteogram>;
}
