import {Observable} from 'rxjs';
import {AirportChart} from '../domain-model/airport-chart';


export abstract class IAirportChartService {
    public abstract readAdChartById(chartId: number): Observable<AirportChart>;

    public abstract readAdChart2ById(chartId: number): Observable<AirportChart>;
}
