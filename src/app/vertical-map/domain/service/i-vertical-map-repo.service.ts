import {Observable} from 'rxjs';
import {VerticalMap} from '../model/vertical-map';
import {ForecastSelection} from '../model/forecast-selection';


export abstract class IVerticalMapRepoService {
    abstract readVerticalMap(wpPositions: [number, number][], fcSelection: ForecastSelection): Observable<VerticalMap>;
}
