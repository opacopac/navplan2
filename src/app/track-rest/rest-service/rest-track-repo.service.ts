import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Track} from '../../track/domain-model/track';
import {User} from '../../user/domain-model/user';
import {catchError, map} from 'rxjs/operators';
import {IRestTrackListResponse} from '../rest-model/i-rest-track-list-response';
import {IRestTrackResponse} from '../rest-model/i-rest-track-response';
import {RestTrackListResponseConverter} from '../rest-model/rest-track-list-response-converter';
import {RestTrackResponseConverter} from '../rest-model/rest-track-response-converter';
import {ITrackRepoService} from '../../track/domain-service/i-track-repo.service';


@Injectable()
export class RestTrackRepoService implements ITrackRepoService {
    constructor(private http: HttpClient) {
    }


    readUserTrackList(user: User): Observable<Track[]> {
        const url: string = environment.trackServiceUrl + '?action=readtracklist&token=' + user.token;
        return this.http
            .jsonp<IRestTrackListResponse>(url, 'callback')
            .pipe(
                map(response => RestTrackListResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading tracks', err);
                    return throwError(err);
                })
            );
    }


    readUserTrack(trackid, user: User): Observable<Track> {
        const url: string = environment.trackServiceUrl + '?action=readtrack&trackid=' + encodeURI(trackid) + '&token=' + user.token;
        return this.http
            .jsonp<IRestTrackResponse>(url, 'callback')
            .pipe(
                map(response => RestTrackResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading track', err);
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
