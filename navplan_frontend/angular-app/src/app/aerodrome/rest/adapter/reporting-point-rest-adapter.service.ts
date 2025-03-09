import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {IRestReportingpoint} from '../model/i-rest-reportingpoint';
import {RestReportingpointConverter} from '../converter/rest-reportingpoint-converter';
import {RestReportingsectorConverter} from '../converter/rest-reportingsector-converter';
import {ReportingPointsAndSectors} from '../../domain/model/reporting-points-and-sectors';
import {IReportingPointRepoService} from '../../domain/service/i-reporting-point-repo.service';
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';


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
                map((response) => {
                    return new ReportingPointsAndSectors(
                        response
                            .filter(rp => rp.type === 'POINT')
                            .map(rp => RestReportingpointConverter.fromRest(rp)),
                        response
                            .filter(rp => rp.type === 'SECTOR')
                            .map(rp => RestReportingsectorConverter.fromRest(rp))
                    );
                }),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport list by extent', err);
                    return throwError(err);
                })
            );
    }
}
