import {Observable} from 'rxjs';
import {AirportChart} from '../model/airport-chart';
import {UploadedChartInfo} from '../model/uploaded-chart-info';
import {ChartUploadParameters} from '../model/chart-upload-parameters';
import {ChartSaveParameters} from '../model/chart-save-parameters';


export abstract class IAirportChartService {
    public abstract readAdChartById(chartId: number): Observable<AirportChart>;

    public abstract uploadAdChart(adIcao: string, chartUploadParameters: ChartUploadParameters): Observable<UploadedChartInfo>;

    public abstract saveAdChart(adIcao: string, chartSaveParameters: ChartSaveParameters): Observable<AirportChart>;
}
