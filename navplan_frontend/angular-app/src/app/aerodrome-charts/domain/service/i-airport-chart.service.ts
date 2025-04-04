import {Observable} from 'rxjs';
import {AirportChart} from '../model/airport-chart';


export abstract class IAirportChartService {
    public abstract readAdChartById(chartId: number): Observable<AirportChart>;
}
