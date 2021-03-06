import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {IRestReportingpoint} from '../rest-model/i-rest-reportingpoint';
import {RestReportingpointConverter} from '../rest-model/rest-reportingpoint-converter';
import {RestReportingsectorConverter} from '../rest-model/rest-reportingsector-converter';
import {ReportingPointsAndSectors} from '../domain-model/reporting-points-and-sectors';
import {IReportingPointRepo} from '../domain-service/i-reporting-point-repo';


@Injectable()
export class ReportingPointRestService implements IReportingPointRepo {
    constructor(private http: HttpClient) {
    }


    public readReportingPointsByExtent(extent: Extent2d): Observable<ReportingPointsAndSectors> {
        const url: string = environment.airportServiceUrl + '?action=getRpByExtent'
            + '&minlon=' + extent.minLon
            + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon
            + '&maxlat=' + extent.maxLat;

        return this.http
            .get<IRestReportingpoint[]>(url, {observe: 'response'})
            .pipe(
                map((response) => {
                    return new ReportingPointsAndSectors(
                        response.body
                            .filter(rp => rp.type === 'POINT')
                            .map(rp => RestReportingpointConverter.fromRest(rp)),
                        response.body
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
