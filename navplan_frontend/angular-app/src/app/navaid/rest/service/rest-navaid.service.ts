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
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';
import {RestZoomConverter} from '../../../geo-physics/rest/model/rest-zoom-converter';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';


@Injectable()
export class RestNavaidService implements INavaidRepo {
    constructor(private http: HttpClient) {
    }


    public readNavaidsByExtent(extent: Extent2d, zoom: number): Observable<Navaid[]> {
        const params = HttpHelper.mergeParameters([
            RestExtent2dConverter.getUrlParams(extent),
            RestZoomConverter.getUrlParam(zoom)
        ]);
        const url: string = environment.navaidApiBaseUrl;

        return this.http
            .get<IRestNavaid[]>(url, {params})
            .pipe(
                map((response) => RestNavaidConverter.fromRestList(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading navaid list by extent', err);
                    return throwError(err);
                })
            );
    }
}
