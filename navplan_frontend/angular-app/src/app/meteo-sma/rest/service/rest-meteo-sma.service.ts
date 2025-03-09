import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {environment} from '../../../../environments/environment';
import {SmaMeasurement} from '../../domain/model/sma-measurement';
import {IRestSmaMeasurementResponse} from '../model/i-rest-sma-measurement-response';
import {RestSmaMeasurementConverter} from '../model/rest-sma-measurement-converter';
import {IMeteoSmaRepoService} from '../../domain/service/i-meteo-sma-repo.service';
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';


@Injectable()
export class RestMeteoSmaService implements IMeteoSmaRepoService {
    constructor(private http: HttpClient) {
    }


    public readSmaMeasurements(extent: Extent2d): Observable<SmaMeasurement[]> {
        const params = RestExtent2dConverter.getUrlParams(extent);
        const url = environment.meteoSmaApiBaseUrl;
        return this.http
            .get<IRestSmaMeasurementResponse>(url, {params})
            .pipe(
                map(response => RestSmaMeasurementConverter.fromRestList(response.smameasurements)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading SMA Measurements!', error);
                    return throwError(error);
                }),
            );
    }
}
