import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {NotamList} from '../model/notam';
import {Extent} from '../../shared/model/extent';
import {NotamResponse, RestMapperNotam} from '../model/rest-mapper-notam';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';


const NOTAM_BASE_URL = environment.restApiBaseUrl + 'php/notam.php'; // TODO: move to searchservice
const NOTAM_BASE_URL2 = environment.restApiBaseUrl + 'php/Navplan/Search/SearchService.php';


@Injectable({
    providedIn: 'root'
})
export class NotamService {
    constructor(private http: HttpClient) {
    }


    public getOversizeFactor(): number {
        return environment.mapOversizeFactor;
    }


    public isTimedOut(ageSec: number): boolean {
        return false;
    }


    public load(extent: Extent, zoom: number): Observable<NotamList> {

        const startEndTime = this.getDefaultNotamTimeslot();
        const url = NOTAM_BASE_URL + '?starttimestamp=' + startEndTime[0] + '&endtimestamp=' + startEndTime[1] +
            '&minlon=' + extent.minLon + '&minlat=' + extent.minLat + '&maxlon=' + extent.maxLon + '&maxlat=' + extent.maxLat +
            '&zoom=' + zoom;

        return this.http
            .jsonp<NotamResponse>(url, 'callback')
            .pipe(
                map(response => RestMapperNotam.getNotamListFromResponse(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs!', error);
                    return throwError(error);
                })
            );
    }


    public loadByIcao(
        icaoList: string[],
        successCallback: (NotamList) => void,
        errorCallback: (string) => void) {

        // const startEndTime = this.getDefaultNotamTimeslot();
        /* const url = NOTAM_BASE_URL2 + '?action=searchByIcao&searchItems=notams&icao=' + icaoList.join(',')
            + '&minnotamtime=' + startEndTime[0] + '&maxnotamtime=' + startEndTime[1];*/
        /*const url = NOTAM_BASE_URL + '?icaolist=' + icaoList.join(',')
            + '&starttimestamp=' + startEndTime[0] + '&endtimestamp=' + startEndTime[1];*/

        /* this.http
            .jsonp<NotamResponse2>(url, 'callback')
            .subscribe(
                response => {
                    const notamList = RestMapperNotam.getNotamListFromResponse2(response);
                    successCallback(notamList);
                },
                err => {
                    const message = 'ERROR reading NOTAMs!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                });*/
    }


    public getDefaultNotamTimeslot(): [number, number] {
        const now = new Date();
        const minTime = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000); // beginning of today LT (notam timestamps from icao have day granularity...)
        const maxTime = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2).getTime() / 1000); // end of tomorrow LT

        return [minTime, maxTime];
    }
}
