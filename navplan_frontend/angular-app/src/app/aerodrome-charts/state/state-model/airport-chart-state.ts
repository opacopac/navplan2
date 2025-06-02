import {AirportChart} from '../../domain/model/airport-chart';
import {UploadedChartInfo} from '../../domain/model/uploaded-chart-info';
import {PdfParameters} from '../../domain/model/pdf-parameters';
import {XyCoord} from '../../../geo-physics/domain/model/geometry/xyCoord';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Airport} from '../../../aerodrome/domain/model/airport';
import {ChartRegistrationType} from '../../domain/model/chart-registration-type';
import {GeoCoordinateType} from '../../domain/model/geo-coordinate-type';


export interface AirportChartState {
    airportCharts: AirportChart[];
    selectedAirport: Airport;
    selectedChartFile: File;
    pdfParameters: PdfParameters;
    uploadedChartInfo: UploadedChartInfo;
    isUploading: boolean;
    chartName: string;
    chartRegistrationType: ChartRegistrationType;
    chartReference1: XyCoord;
    chartReference2: XyCoord;
    chartScale: number;
    geoCoordinateType: GeoCoordinateType;
    mapReference1: Position2d;
    mapReference2: Position2d;
}
