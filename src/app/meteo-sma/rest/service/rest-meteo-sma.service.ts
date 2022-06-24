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


@Injectable()
export class RestMeteoSmaService implements IMeteoSmaRepoService {
    constructor(private http: HttpClient) {
    }


    public readSmaMeasurements(extent: Extent2d): Observable<SmaMeasurement[]> {
        const url = environment.meteoSmaServiceUrl +
            '?minlon=' + extent.minLon +
            '&minlat=' + extent.minLat +
            '&maxlon=' + extent.maxLon +
            '&maxlat=' + extent.maxLat;
        return this.http
            .get<IRestSmaMeasurementResponse>(url)
            .pipe(
                map(response => RestSmaMeasurementConverter.fromRestList(response.smameasurements)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading SMA Measurements!', error);
                    return throwError(error);
                }),
            );
    }
}
