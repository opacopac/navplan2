import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Navaid} from '../../enroute/domain-model/navaid';
import {IRestNavaid} from '../rest-model/i-rest-navaid';
import {RestNavaidConverter} from '../rest-model/rest-navaid-converter';
import {INavaidRepo} from '../../enroute/domain-service/i-navaid-repo';


@Injectable()
export class RestNavaidService implements INavaidRepo {
    constructor(private http: HttpClient) {
    }


    public readNavaidsByExtent(extent: Extent2d, zoom: number): Observable<Navaid[]> {
        const url: string = environment.navaidServiceUrl + '?action=getNavaidsByExtent'
            + '&minlon=' + extent.minLon
            + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon
            + '&maxlat=' + extent.maxLat
            + '&zoom=' + zoom;

        return this.http
            .get<IRestNavaid[]>(url, {observe: 'response'})
            .pipe(
                map((response) => RestNavaidConverter.fromRestList(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading navaid list by extent', err);
                    return throwError(err);
                })
            );
    }
}
