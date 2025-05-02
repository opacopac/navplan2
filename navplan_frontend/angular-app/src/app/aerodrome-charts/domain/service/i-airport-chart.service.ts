import {Observable} from 'rxjs';
import {AirportChart} from '../model/airport-chart';
import {UploadedChartInfo} from '../model/uploaded-chart-info';
import {ChartUploadParameters} from '../model/chart-upload-parameters';
import {ChartSaveParameters} from '../model/chart-save-parameters';


export abstract class IAirportChartService {
    public abstract readAdChartById(chartId: number): Observable<AirportChart>;

    public abstract uploadAdChart(airportId: number, chartUploadParameters: ChartUploadParameters): Observable<UploadedChartInfo>;

    public abstract saveAdChart(airportId: number, chartSaveParameters: ChartSaveParameters): Observable<AirportChart>;
}
