import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {IRestMetarTafResponse} from '../rest-model/i-rest-metar-taf-response';
import {RestMetarTafConverter} from '../rest-model/rest-metar-taf-converter';
import {environment} from '../../../environments/environment';
import {IMetarTafRepoService} from '../../metar-taf/domain-service/i-metar-taf-repo.service';


@Injectable()
export class RestMetarTafService implements IMetarTafRepoService {
    constructor(private http: HttpClient) {
    }


    public load(extent: Extent2d): Observable<MetarTaf[]> {
        const url = environment.metarTafBaseUrl + extent.minLon + ',' + extent.minLat + ',' + extent.maxLon + ',' + extent.maxLat;
        return this.http.jsonp<IRestMetarTafResponse>(url, 'jsonp')
            .pipe(
                map(response => RestMetarTafConverter.listFromRest(response.features)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading METAR/TAF!', error);
                    return throwError(error);
                }),
            );
    }
}
