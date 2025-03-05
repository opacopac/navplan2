import {environment} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IExporterService} from '../../domain/service/i-exporter.service';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {Track} from '../../../track/domain/model/track';
import {RestExportPdfRequestConverter} from '../model/rest-export-pdf-request-converter';
import {IRestExportedFile} from '../model/i-rest-exported-file';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {catchError, map} from 'rxjs/operators';
import {ExportedFile} from '../../domain/model/exported-file';
import {RestExportedFileConverter} from '../model/rest-exported-file-converter';
import {RestExportKmlRequestConverter} from '../model/rest-export-kml-request-converter';
import {RestExportGpxRequestConverter} from '../model/rest-export-gpx-request-converter';
import {RestExportFplRequestConverter} from '../model/rest-export-fpl-request-converter';
import {RestExportExcelRequestConverter} from '../model/rest-export-excel-request-converter';


@Injectable()
export class ExporterRestService implements IExporterService {
    constructor(private http: HttpClient) {
    }


    exportPdf(flightroute: Flightroute): Observable<ExportedFile> {
        const requestBody = RestExportPdfRequestConverter.toRest(flightroute);
        return this.http
            .post<IRestExportedFile>(
                environment.exporterBaseUrl,
                JSON.stringify(requestBody)
            ).pipe(
                map(response => RestExportedFileConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR exporting PDF', err);
                    return throwError(err);
                })
            );
    }


    exportExcel(flightroute: Flightroute): Observable<ExportedFile> {
        const requestBody = RestExportExcelRequestConverter.toRest(flightroute);
        return this.http
            .post<IRestExportedFile>(
                environment.exporterBaseUrl,
                JSON.stringify(requestBody)
            ).pipe(
                map(response => RestExportedFileConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR exporting Excel', err);
                    return throwError(err);
                })
            );
    }


    exportKml(flightroute: Flightroute, track: Track): Observable<ExportedFile> {
        const requestBody = RestExportKmlRequestConverter.toRest(flightroute, track);
        return this.http
            .post<IRestExportedFile>(
                environment.exporterBaseUrl,
                JSON.stringify(requestBody)
            ).pipe(
                map(response => RestExportedFileConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR exporting KML', err);
                    return throwError(err);
                })
            );
    }


    exportGpx(flightroute: Flightroute, track: Track): Observable<ExportedFile> {
        const requestBody = RestExportGpxRequestConverter.toRest(flightroute, track);
        return this.http
            .post<IRestExportedFile>(
                environment.exporterBaseUrl,
                JSON.stringify(requestBody)
            ).pipe(
                map(response => RestExportedFileConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR exporting GPX', err);
                    return throwError(err);
                })
            );
    }


    exportFpl(flightroute: Flightroute): Observable<ExportedFile> {
        const requestBody = RestExportFplRequestConverter.toRest(flightroute);
        return this.http
            .post<IRestExportedFile>(
                environment.exporterBaseUrl,
                JSON.stringify(requestBody)
            ).pipe(
                map(response => RestExportedFileConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR exporting FPL', err);
                    return throwError(err);
                })
            );
    }
}
