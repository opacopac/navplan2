import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {IRestAdsbexTrafficResponse} from '../rest-model/adsbex/i-rest-adsbex-traffic-response';
import {RestAdsbexTrafficResponseConverter} from '../rest-model/adsbex/rest-adsbex-traffic-response-converter';
import {AdsbexTraffic} from '../../traffic/domain-model/adsbex-traffic';
import {IAdsbexTrafficService} from '../../traffic/domain-service/adsbex-traffic/i-adsbex-traffic-service';


@Injectable({
    providedIn: 'root'
})
export class AdsbexTrafficService implements IAdsbexTrafficService {
    constructor(private http: HttpClient) {
    }


    public readTraffic(extent: Extent2d): Observable<AdsbexTraffic[]> {
        const url = environment.trafficAdsbexServiceUrl
            + '&minlon=' + extent.minLon + '&minlat=' + extent.minLat + '&maxlon=' + extent.maxLon + '&maxlat=' + extent.maxLat;


        return this.http
            .get<IRestAdsbexTrafficResponse>(url)
            .pipe(
                map((response) => RestAdsbexTrafficResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading ogn traffic', err);
                    return throwError(err);
                })
            );
    }
}
