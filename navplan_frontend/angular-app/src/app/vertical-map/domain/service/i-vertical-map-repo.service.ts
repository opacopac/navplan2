import {Observable} from 'rxjs';
import {VerticalMap} from '../model/vertical-map';
import {ForecastSelection} from '../../../meteo-forecast/domain/model/forecast-selection';


export abstract class IVerticalMapRepoService {
    abstract readVerticalMap(wpPositions: [number, number][], fcSelection: ForecastSelection): Observable<VerticalMap>;
}
