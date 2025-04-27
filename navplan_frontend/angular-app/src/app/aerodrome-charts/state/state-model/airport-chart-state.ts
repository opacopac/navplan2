import {AirportChart} from '../../domain/model/airport-chart';
import {UploadedChartInfo} from '../../domain/model/uploaded-chart-info';


export interface AirportChartState {
    airportCharts: AirportChart[];
    selectedChartFile: File;
    uploadedChartInfo: UploadedChartInfo;
    isUploading: boolean;
}
