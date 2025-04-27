import {Observable} from 'rxjs';
import {AirportChart} from '../model/airport-chart';
import {UploadedChartInfo} from '../model/uploaded-chart-info';
import {ChartUploadParameters} from '../model/chart-upload-parameters';


export abstract class IAirportChartService {
    public abstract readAdChartById(chartId: number): Observable<AirportChart>;

    public abstract uploadAdChart(chartUploadParameters: ChartUploadParameters): Observable<UploadedChartInfo>;
}
