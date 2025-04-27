import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Track} from '../../domain/model/track';
import {catchError, map} from 'rxjs/operators';
import {IRestTrackListResponse} from '../model/i-rest-track-list-response';
import {IRestTrackResponse} from '../model/i-rest-track-response';
import {RestTrackListResponseConverter} from '../model/rest-track-list-response-converter';
import {RestTrackResponseConverter} from '../model/rest-track-response-converter';
import {ITrackRepoService} from '../../domain/service/i-track-repo.service';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';
import {ExportedFile} from '../../../exporter/domain/model/exported-file';
import {IRestExportedFile} from '../../../exporter/rest/model/i-rest-exported-file';
import {RestExportedFileConverter} from '../../../exporter/rest/model/rest-exported-file-converter';
import {IRestSuccessResponse} from '../../../flightroute/rest/model/i-rest-success-response';
import {Position4d} from '../../../geo-physics/domain/model/geometry/position4d';


@Injectable()
export class RestTrackRepoService implements ITrackRepoService {
    constructor(private http: HttpClient) {
    }


    readUserTrackList(): Observable<Track[]> {
        const url: string = environment.trackApiBaseUrl;

        return this.http
            .get<IRestTrackListResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map(response => RestTrackListResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading user track list', err);
                    return throwError(err);
                })
            );
    }


    readUserTrack(trackid: number): Observable<Track> {
        const url: string = environment.trackApiBaseUrl + '/' + trackid;
        return this.http
            .get<IRestTrackResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map(response => RestTrackResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading user track', err);
                    return throwError(err);
                })
            );
    }


    createUserTrack(timestamp, name: string, positions: Position4d[]): Observable<Track> {
        return of(null);
    }


    updateUserTrack(track: Track): Observable<Track> {
        const url = environment.trackApiBaseUrl + '/' + track.id;
        const body = RestTrackResponseConverter.toRest(track);

        return this.http
            .put<IRestTrackResponse>(
                url,
                body,
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            )
            .pipe(
                map(response => RestTrackResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR updating user track', err);
                    return throwError(err);
                })
            );
    }


    deleteUserTrack(trackid: number): Observable<boolean> {
        const url = environment.trackApiBaseUrl + '/' + trackid;

        return this.http
            .delete<IRestSuccessResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map(response => response.success),
                catchError(err => {
                    LoggingService.logResponseError('ERROR deleting user track', err);
                    return throwError(err);
                })
            );
    }


    exportTrackKml(trackid: number): Observable<ExportedFile> {
        const url = environment.trackApiBaseUrl + '/' + trackid + '/exportkml';

        return this.http
            .get<IRestExportedFile>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map(response => RestExportedFileConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR exporting KML', err);
                    return throwError(err);
                })
            );
    }
}
