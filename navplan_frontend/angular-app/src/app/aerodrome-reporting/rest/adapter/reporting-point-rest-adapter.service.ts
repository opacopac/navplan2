import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {IRestReportingpoint} from '../model/i-rest-reportingpoint';
import {ReportingPointsAndSectors} from '../../domain/model/reporting-points-and-sectors';
import {IReportingPointRepoService} from '../../domain/service/i-reporting-point-repo.service';
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';
import {RestReportingPointsAndSectorsConverter} from '../converter/rest-reportingpoints-and-sectors-converter';


@Injectable()
export class ReportingPointRestAdapterService implements IReportingPointRepoService {
    constructor(private http: HttpClient) {
    }


    public readReportingPointsByExtent(extent: Extent2d): Observable<ReportingPointsAndSectors> {
        const params = RestExtent2dConverter.getUrlParams(extent);
        const url: string = environment.airportReportingPointApiBaseUrl;

        return this.http
            .get<IRestReportingpoint[]>(url, {params})
            .pipe(
                map(response => RestReportingPointsAndSectorsConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport list by extent', err);
                    return throwError(err);
                })
            );
    }


    public readReportingPointsByAirportIcao(airportIcao: string): Observable<ReportingPointsAndSectors> {
        const url = environment.airportApiBaseUrl + '/' + airportIcao + '/reportingpoints';

        return this.http
            .get<IRestReportingpoint[]>(url)
            .pipe(
                map(response => RestReportingPointsAndSectorsConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading reporting points by airport ICAO', err);
                    return throwError(err);
                })
            );
    }
}
