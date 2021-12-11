import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {INotamRepoService} from '../../notam/domain-service/i-notam-repo.service';
import {IRestNotamResponse} from '../rest-model/i-rest-notam-response';
import {environment} from '../../../environments/environment';
import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {Notam} from '../../notam/domain-model/notam';
import {RestNotamConverter} from '../rest-model/rest-notam-converter';


@Injectable()
export class RestNotamRepo implements INotamRepoService {
    constructor(private http: HttpClient) {
    }


    public readByExtent(extent: Extent2d, zoom: number, starttimestamp: number, endtimestamp: number): Observable<Notam[]> {
        const url = environment.notamRestServiceUrl + '?action=searchByExtent'
            + '&starttimestamp=' + starttimestamp
            + '&endtimestamp=' + endtimestamp
            + '&minlon=' + extent.minLon
            + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon
            + '&maxlat=' + extent.maxLat
            + '&zoom=' + zoom;
        return this.http
            .get<IRestNotamResponse>(url)
            .pipe(
                map(response => RestNotamConverter.fromRestList(response.notams)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by extent!', error);
                    return throwError(error);
                })
            );
    }


    public readByPosition(position: Position2d, starttimestamp: number, endtimestamp: number): Observable<Notam[]> {
        const url = environment.notamRestServiceUrl + '?action=searchByPosition'
            + '&starttimestamp=' + starttimestamp
            + '&endtimestamp=' + endtimestamp
            + '&longitude=' + position.longitude
            + '&latitude=' + position.latitude;
        return this.http
            .get<IRestNotamResponse>(url)
            .pipe(
                map(response => RestNotamConverter.fromRestList(response.notams)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by position!', error);
                    return throwError(error);
                })
            );
    }


    public readByIcao(airportIcao: string, starttimestamp: number, endtimestamp: number): Observable<Notam[]> {
        const url = environment.notamRestServiceUrl + '?action=searchByIcao'
            + '&icao=' + airportIcao
            + '&starttimestamp=' + starttimestamp
            + '&endtimestamp=' + endtimestamp;
        return this.http
            .get<IRestNotamResponse>(url)
            .pipe(
                map(response => RestNotamConverter.fromRestList(response.notams)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by icao!', error);
                    return throwError(error);
                })
            );
    }
}
