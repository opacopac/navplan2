import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {OpenAipItems} from '../domain-model/open-aip-items';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {OpenAipItemsConverter} from '../rest-model/open-aip-items-converter';
import {IRestOpenAipItems} from '../rest-model/i-rest-open-aip-items';


@Injectable({
    providedIn: 'root'
})
export class OpenAipRepo {
    constructor(
        private http: HttpClient
    ) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<OpenAipItems> {
        return this.http
            .get<IRestOpenAipItems>(this.buildRequestUrl(extent, zoom))
            .pipe(
                map(response => OpenAipItemsConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading map features', error);
                    return throwError(error);
                }),
            );
    }


    private buildRequestUrl(extent: Extent2d, zoom: number): string {
        let url = environment.openAipServiceUrl + '?action=searchByExtent' + '&minlon=' + extent.minLon + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon + '&maxlat=' + extent.maxLat + '&zoom=' + zoom
            + '&searchItems=airports,navaids,airspaces';

        if (zoom >= 10) {
            url += ',webcams';
        }

        if (zoom >= 11) {
            url += ',reportingpoints';
        }

        if (zoom >= 12) {
            url += ',circuits';
        }

        return url;
    }
}
