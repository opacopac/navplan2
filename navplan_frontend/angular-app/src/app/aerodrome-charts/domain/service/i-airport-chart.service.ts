import {Observable} from 'rxjs';
import {AirportChart} from '../model/airport-chart';
import {UploadedChartInfo} from '../model/uploaded-chart-info';


export abstract class IAirportChartService {
    public abstract readAdChartById(chartId: number): Observable<AirportChart>;

    public abstract uploadAdChart(file: File): Observable<UploadedChartInfo>;
}
