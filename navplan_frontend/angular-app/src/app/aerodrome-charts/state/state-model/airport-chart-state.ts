import {AirportChart} from '../../domain/model/airport-chart';
import {UploadedChartInfo} from '../../domain/model/uploaded-chart-info';
import {PdfParameters} from '../../domain/model/pdf-parameters';
import {XyCoord} from '../../../geo-physics/domain/model/geometry/xyCoord';


export interface AirportChartState {
    airportCharts: AirportChart[];
    selectedChartFile: File;
    pdfParameters: PdfParameters;
    uploadedChartInfo: UploadedChartInfo;
    isUploading: boolean;
    chartReference1: XyCoord;
    chartReference2: XyCoord;
}
