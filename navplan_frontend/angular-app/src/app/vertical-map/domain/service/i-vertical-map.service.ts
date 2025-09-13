import {Observable} from 'rxjs';
import {VerticalMap} from '../model/vertical-map';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {ForecastSelection} from '../../../meteo-forecast/domain/model/forecast-selection';


export abstract class IVerticalMapService {
    abstract readVerticalMap(flightroute: Flightroute, fcSelection: ForecastSelection): Observable<VerticalMap>;
}
