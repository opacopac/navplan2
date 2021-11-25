import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IExporterService} from '../domain-service/i-exporter-service';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {Track} from '../../track/domain-model/track';
import {RestExportPdfRequestConverter} from '../rest-model/rest-export-pdf-request-converter';
import {IRestExportedFile} from '../rest-model/i-rest-exported-file';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {catchError, map} from 'rxjs/operators';
import {ExportedFile} from '../domain-model/exported-file';
import {RestExportedFileConverter} from '../rest-model/rest-exported-file-converter';


@Injectable()
export class ExporterRestService implements IExporterService {
    constructor(
        private http: HttpClient
    ) {
    }


    exportPdf(flightroute: Flightroute): Observable<ExportedFile> {
        const requestBody = RestExportPdfRequestConverter.toRest(flightroute);
        return this.http
            .post<IRestExportedFile>(environment.exporterBaseUrl, JSON.stringify(requestBody), { observe: 'response' }).pipe(
                map(response => RestExportedFileConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR exporting PDF', err);
                    return throwError(err);
                })
            );
    }


    exportKml(flightroute: Flightroute, track: Track): Observable<ExportedFile> {
        return undefined;
    }
}
