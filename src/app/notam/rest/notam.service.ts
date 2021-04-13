import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/use-case/logging/logging.service';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {INotamService} from '../use-case/i-notam-service';
import {RestNotamList} from './rest-notam-list';
import {IRestNotamResponse} from './i-rest-notam-response';
import {NotamList} from '../domain/notam-list';


const NOTAM_BASE_URL = environment.restApiBaseUrl + 'php/Navplan/Notam/RestService/NotamService.php';


@Injectable({
    providedIn: 'root'
})
export class NotamService implements INotamService {
    constructor(private http: HttpClient) {
    }


    public readByExtent(
        extent: Extent2d,
        zoom: number,
        starttimestamp: number,
        endtimestamp: number
    ): Observable<NotamList> {
        const url = NOTAM_BASE_URL + '?action=searchByExtent&starttimestamp=' + starttimestamp + '&endtimestamp=' + endtimestamp +
            '&minlon=' + extent.minLon + '&minlat=' + extent.minLat + '&maxlon=' + extent.maxLon + '&maxlat=' + extent.maxLat +
            '&zoom=' + zoom;

        return this.http
            .get<IRestNotamResponse>(url)
            .pipe(
                map(response => RestNotamList.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by extent!', error);
                    return throwError(error);
                })
            );
    }


    public readByIcao(
        icaoList: string[],
        starttimestamp: number,
        endtimestamp: number
    ): Observable<NotamList> {
        const url = NOTAM_BASE_URL + '?action=searchByIcao&searchItems=notams&icao=' + icaoList.join(',')
            + '&minnotamtime=' + starttimestamp + '&maxnotamtime=' + endtimestamp;

        return this.http
            .get<IRestNotamResponse>(url)
            .pipe(
                map(response => RestNotamList.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by icao!', error);
                    return throwError(error);
                })
            );
    }
}
