import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {AirportChart} from '../../domain/model/airport-chart';
import {IAirportChartRepoService} from '../../domain/service/i-airport-chart-repo.service';
import {RestAirportChartConverter} from '../converter/rest-airport-chart-converter';
import {IRestAirportChart} from '../model/i-rest-airport-chart';
import {IRestUploadAdChartInfo} from '../model/i-rest-upload-ad-chart-info';
import {UploadedChartInfo} from '../../domain/model/uploaded-chart-info';
import {RestUploadedChartInfoConverter} from '../converter/rest-uploaded-chart-info-converter';
import {ChartUploadParameters} from '../../domain/model/chart-upload-parameters';
import {ChartSaveParameters} from '../../domain/model/chart-save-parameters';
import {RestChartSaveParametersConverter} from '../converter/rest-chart-save-parameters-converter';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';
import {IRestSuccessResponse} from '../../../flightroute/rest/model/i-rest-success-response';


@Injectable()
export class AirportChartRestAdapter implements IAirportChartRepoService {
    constructor(private http: HttpClient) {
    }


    public readAdChartById(chartId: number): Observable<AirportChart> {
        const url: string = environment.airportChartApiBaseUrl + '/' + chartId;

        return this.http
            .get<IRestAirportChart>(
                url,
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            )
            .pipe(
                map(response => RestAirportChartConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport chart by id', err);
                    return throwError(err);
                })
            );
    }


    public uploadAdChart(adIcao: string, chartUploadParameters: ChartUploadParameters): Observable<UploadedChartInfo> {
        const url = environment.airportApiBaseUrl + '/' + adIcao + '/charts/upload';

        const formData = new FormData();
        formData.append('file', chartUploadParameters.file);
        formData.append('page', chartUploadParameters.pdfParameters.page.toString());
        formData.append('rotationDeg', chartUploadParameters.pdfParameters.rotation.deg.toString());
        formData.append('dpi', chartUploadParameters.pdfParameters.dpi.toString());

        return this.http
            .post<IRestUploadAdChartInfo>(
                url,
                formData,
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            )
            .pipe(
                map(response => RestUploadedChartInfoConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR uploading airport chart', err);
                    return throwError(err);
                })
            );
    }


    public reprojectAndSaveAdChart(adIcao: string, chartSaveParameters: ChartSaveParameters): Observable<AirportChart> {
        const url = environment.airportApiBaseUrl + '/' + adIcao + '/charts/save';
        const requestBody = RestChartSaveParametersConverter.toRest(chartSaveParameters);

        return this.http
            .post<IRestAirportChart>(
                url,
                requestBody,
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            )
            .pipe(
                map(response => RestAirportChartConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR saving airport chart', err);
                    return throwError(err);
                })
            );
    }


    public deleteAdChart(chartId: number): Observable<boolean> {
        const url: string = environment.airportChartApiBaseUrl + '/' + chartId;

        return this.http
            .delete<IRestSuccessResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map(response => response.success),
                catchError(err => {
                    LoggingService.logResponseError('ERROR deleting airport chart', err);
                    return throwError(err);
                })
            );
    }
}
