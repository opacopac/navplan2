import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {IRestAdsbexTrafficResponse} from '../model/adsbex/i-rest-adsbex-traffic-response';
import {RestAdsbexTrafficResponseConverter} from '../model/adsbex/rest-adsbex-traffic-response-converter';
import {AdsbexTraffic} from '../../domain/model/adsbex-traffic';
import {IAdsbexTrafficService} from '../../domain/service/adsbex-traffic/i-adsbex-traffic-service';
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';


@Injectable({
    providedIn: 'root'
})
export class AdsbexTrafficService implements IAdsbexTrafficService {
    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent2d): Observable<AdsbexTraffic[]> {
        const params = RestExtent2dConverter.getUrlParams(extent);
        const url = environment.trafficAdsbexServiceUrl;

        return this.http
            .get<IRestAdsbexTrafficResponse>(url, {params})
            .pipe(
                map((response) => RestAdsbexTrafficResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading adsbex traffic', err);
                    return throwError(err);
                })
            );
    }
}
