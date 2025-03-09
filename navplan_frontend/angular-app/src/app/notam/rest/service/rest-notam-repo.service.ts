import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {INotamRepoService} from '../../domain/service/i-notam-repo.service';
import {IRestNotamResponse} from '../model/i-rest-notam-response';
import {environment} from '../../../../environments/environment';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Notam} from '../../domain/model/notam';
import {RestNotamConverter} from '../model/rest-notam-converter';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';
import {RestExtent2dConverter} from '../../../geo-physics/rest/model/rest-extent2d-converter';
import {RestZoomConverter} from '../../../geo-physics/rest/model/rest-zoom-converter';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';


@Injectable()
export class RestNotamRepo implements INotamRepoService {
    constructor(private http: HttpClient) {
    }


    public readByExtent(extent: Extent2d, zoom: number, starttimestamp: number, endtimestamp: number): Observable<Notam[]> {
        const params = HttpHelper.mergeParameters([
            RestExtent2dConverter.getUrlParams(extent),
            RestZoomConverter.getUrlParam(zoom),
            this.getTimestampParams(starttimestamp, endtimestamp)
        ]);
        const url = environment.notamRestApiBaseUrl;

        return this.http
            .get<IRestNotamResponse>(url, {params})
            .pipe(
                map(response => RestNotamConverter.fromRestList(response.notams)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by extent!', error);
                    return throwError(error);
                })
            );
    }


    public readByPosition(position: Position2d, starttimestamp: number, endtimestamp: number): Observable<Notam[]> {
        const params = HttpHelper.mergeParameters([
            Position2dConverter.getUrlParams(position),
            this.getTimestampParams(starttimestamp, endtimestamp)
        ]);
        const url = environment.notamRestApiBaseUrl;

        return this.http
            .get<IRestNotamResponse>(url, {params})
            .pipe(
                map(response => RestNotamConverter.fromRestList(response.notams)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by position!', error);
                    return throwError(error);
                })
            );
    }


    public readByIcao(airportIcao: string, starttimestamp: number, endtimestamp: number): Observable<Notam[]> {
        const params = HttpHelper.mergeParameters([
            new HttpParams().set('icao', airportIcao),
            this.getTimestampParams(starttimestamp, endtimestamp)
        ]);
        const url = environment.notamRestApiBaseUrl;

        return this.http
            .get<IRestNotamResponse>(url, {params})
            .pipe(
                map(response => RestNotamConverter.fromRestList(response.notams)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading NOTAMs by icao!', error);
                    return throwError(error);
                })
            );
    }


    private getTimestampParams(starttimestamp: number, endtimestamp: number): HttpParams {
        return new HttpParams()
            .set('starttimestamp', starttimestamp.toString())
            .set('endtimestamp', endtimestamp.toString());
    }
}
