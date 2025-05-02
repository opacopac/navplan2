import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {AirportChart} from '../../domain/model/airport-chart';
import {IAirportChartRepoService} from '../../domain/service/i-airport-chart-repo.service';
import {RestAirportChart2Converter} from '../converter/rest-airport-chart2-converter';
import {IRestAirportChart2} from '../model/i-rest-airport-chart2';
import {IRestUploadAdChartInfo} from '../model/i-rest-upload-ad-chart-info';
import {UploadedChartInfo} from '../../domain/model/uploaded-chart-info';
import {RestUploadedChartInfoConverter} from '../converter/rest-uploaded-chart-info-converter';
import {ChartUploadParameters} from '../../domain/model/chart-upload-parameters';
import {ChartSaveParameters} from '../../domain/model/chart-save-parameters';


@Injectable()
export class AirportChartRestAdapter implements IAirportChartRepoService {
    constructor(private http: HttpClient) {
    }


    public readAdChartById(chartId: number): Observable<AirportChart> {
        const url: string = environment.airportChartApiBaseUrl + '/' + chartId;

        return this.http
            .get<IRestAirportChart2>(url)
            .pipe(
                map(response => RestAirportChart2Converter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport chart by id', err);
                    return throwError(err);
                })
            );
    }


    public uploadAdChart(airportId: number, chartUploadParameters: ChartUploadParameters): Observable<UploadedChartInfo> {
        const url = environment.airportApiBaseUrl + '/' + airportId + '/charts/upload';

        const formData = new FormData();
        formData.append('file', chartUploadParameters.file);
        formData.append('page', chartUploadParameters.pdfParameters.page.toString());
        formData.append('rotation', chartUploadParameters.pdfParameters.rotation.deg.toString());
        formData.append('dpi', chartUploadParameters.pdfParameters.dpi.toString());

        return this.http
            .post<IRestUploadAdChartInfo>(url, formData)
            .pipe(
                map(response => RestUploadedChartInfoConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR uploading airport chart', err);
                    return throwError(err);
                })
            );
    }


    public saveAdChart(airportId: number, chartSaveParameters: ChartSaveParameters): Observable<AirportChart> {
        const url = environment.airportApiBaseUrl + '/' + airportId + '/charts/save';
        const requestBody = {
            filepath: chartSaveParameters.url
            // TODO
        };

        return this.http
            .post<IRestAirportChart2>(url, requestBody)
            .pipe(
                map(response => RestAirportChart2Converter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR saving airport chart', err);
                    return throwError(err);
                })
            );
    }
}
