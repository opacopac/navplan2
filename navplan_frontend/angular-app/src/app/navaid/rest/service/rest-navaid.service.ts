import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Navaid} from '../../domain/model/navaid';
import {IRestNavaid} from '../model/i-rest-navaid';
import {RestNavaidConverter} from '../model/rest-navaid-converter';
import {INavaidRepo} from '../../domain/service/i-navaid-repo';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';


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
            .get<IRestNavaid[]>(url, HttpHelper.HTTP_OPTIONS_NO_CREDENTIALS)
            .pipe(
                map((response) => RestNavaidConverter.fromRestList(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading navaid list by extent', err);
                    return throwError(err);
                })
            );
    }
}
