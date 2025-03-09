import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Airspace} from '../../domain/model/airspace';
import {IRestAirspace} from '../model/i-rest-airspace';
import {RestAirspaceConverter} from '../model/rest-airspace-converter';
import {IAirspaceRepo} from '../../domain/service/i-airspace-repo';
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';
import {RestZoomConverter} from '../../../geo-physics/rest/model/rest-zoom-converter';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';


@Injectable()
export class RestAirspaceService implements IAirspaceRepo {
    constructor(private http: HttpClient) {
    }


    public readAirspacesByExtent(extent: Extent2d, zoom: number): Observable<Airspace[]> {
        const params = HttpHelper.mergeParameters([
            RestExtent2dConverter.getUrlParams(extent),
            RestZoomConverter.getUrlParam(zoom)
        ]);
        const url: string = environment.airspaceApiBaseUrl;

        return this.http
            .get<IRestAirspace[]>(url, {params})
            .pipe(
                map((response) => RestAirspaceConverter.fromRestList(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airspace list by extent', err);
                    return throwError(err);
                })
            );
    }
}
