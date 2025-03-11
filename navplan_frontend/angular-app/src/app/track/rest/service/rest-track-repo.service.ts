import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Track} from '../../domain/model/track';
import {User} from '../../../user/domain/model/user';
import {catchError, map} from 'rxjs/operators';
import {IRestTrackListResponse} from '../model/i-rest-track-list-response';
import {IRestTrackResponse} from '../model/i-rest-track-response';
import {RestTrackListResponseConverter} from '../model/rest-track-list-response-converter';
import {RestTrackResponseConverter} from '../model/rest-track-response-converter';
import {ITrackRepoService} from '../../domain/service/i-track-repo.service';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';


@Injectable()
export class RestTrackRepoService implements ITrackRepoService {
    constructor(private http: HttpClient) {
    }


    readUserTrackList(): Observable<Track[]> {
        const url: string = environment.trackServiceUrl;

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
        const url: string = environment.trackServiceUrl + '/' + trackid;
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


    createUserTrack(timestamp, name, positions) {
        // return $http.post(userTrackBaseUrl, obj2json({ timestamp: timestamp, name: name, positions: positions }));
    }


    updateUserTrack(id, name) {
        // return $http.put(userTrackBaseUrl, obj2json({ id: id, name: name }));
    }


    deleteUserTrack(trackid) {
        // return $http.delete(userTrackBaseUrlGet + '&id=' + encodeURI(trackid));
    }
}
