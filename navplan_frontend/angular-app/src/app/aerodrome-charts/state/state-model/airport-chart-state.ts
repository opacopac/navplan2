import {AirportChart} from '../../domain/model/airport-chart';
import {UploadedChartInfo} from '../../domain/model/uploaded-chart-info';
import {PdfParameters} from '../../domain/model/pdf-parameters';
import {XyCoord} from '../../../geo-physics/domain/model/geometry/xyCoord';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';


export interface AirportChartState {
    airportCharts: AirportChart[];
    selectedChartFile: File;
    pdfParameters: PdfParameters;
    uploadedChartInfo: UploadedChartInfo;
    isUploading: boolean;
    chartReference1: XyCoord;
    chartReference2: XyCoord;
    mapReference1: Position2d;
    mapReference2: Position2d;
}
