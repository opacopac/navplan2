import {Observable} from 'rxjs';
import {AirportChart} from '../domain-model/airport-chart';


export abstract class IAirportChartRepo {
    public abstract readAdChartById(chartId: number): Observable<AirportChart>;
}
