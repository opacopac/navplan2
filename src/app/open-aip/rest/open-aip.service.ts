import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {OpenAipItems} from '../domain/open-aip-items';
import {LoggingService} from '../../system/use-case/logging/logging.service';
import {RestMapperOpenAipItems} from './rest-mapper-open-aip-items';
import {IRestOpenAipItems} from './i-rest-open-aip-items';


const OPEN_AIP_BASE_URL = environment.restApiBaseUrl + 'php/Navplan/Search/RestService/SearchService.php';


@Injectable({
    providedIn: 'root'
})
export class OpenAipService {
    constructor(
        private http: HttpClient
    ) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<OpenAipItems> {
        return this.http
            .get<IRestOpenAipItems>(this.buildRequestUrl(extent, zoom))
            .pipe(
                map(response => RestMapperOpenAipItems.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading map features', error);
                    return throwError(error);
                }),
            );
    }


    private buildRequestUrl(extent: Extent2d, zoom: number): string {
        let url = OPEN_AIP_BASE_URL + '?action=searchByExtent' + '&minlon=' + extent.minLon + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon + '&maxlat=' + extent.maxLat + '&zoom=' + zoom
            + '&searchItems=airports,navaids,airspaces';

        if (zoom >= 10) {
            url += ',webcams';
        }

        if (zoom >= 11) {
            url += ',reportingpoints';
        }

        return url;
    }
}
