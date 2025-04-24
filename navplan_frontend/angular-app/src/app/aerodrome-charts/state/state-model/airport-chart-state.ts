import {AirportChart} from '../../domain/model/airport-chart';
import {UploadedChartInfo} from '../../domain/model/uploaded-chart-info';


export interface AirportChartState {
    airportCharts: AirportChart[];
    uploadedChartInfo: UploadedChartInfo;
}
