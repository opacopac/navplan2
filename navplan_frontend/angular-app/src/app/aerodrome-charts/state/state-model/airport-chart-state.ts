import {AirportChart} from '../../domain/model/airport-chart';
import {UploadAirportChartState} from './upload-airport-chart-state';


export interface AirportChartState {
    airportCharts: AirportChart[];
    uploadAirportChartState: UploadAirportChartState;
}
