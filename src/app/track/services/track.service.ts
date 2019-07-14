import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/use-case/logging/logging.service';
import {Track} from '../domain/track';
import {User} from '../../user/domain/user';
import {catchError, map} from 'rxjs/operators';
import {IRestTrackListResponse} from '../rest/i-rest-track-list-response';
import {IRestTrackResponse} from '../rest/i-rest-track-response';
import {RestTrackList} from '../rest/rest-track-list';
import {RestTrackResponse} from '../rest/rest-track-response';

const userTrackBaseUrl =  environment.restApiBaseUrl + 'php/userTrack.php';


@Injectable({
    providedIn: 'root'
})
export class TrackService {
    constructor(private http: HttpClient) {
    }


    readUserTrackList(user: User): Observable<Track[]> {

        const url: string = userTrackBaseUrl + '?email=' + user.email + '&token=' + user.token;
        return this.http
            .jsonp<IRestTrackListResponse>(url, 'callback')
            .pipe(
                map(response => RestTrackList.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading tracks', err);
                    return throwError(err);
                })
            );
    }


    readUserTrack(trackid, user: User): Observable<Track> {
        const url: string = userTrackBaseUrl + '?email=' + user.email + '&token=' + user.token + '&id=' + encodeURI(trackid);
        return this.http
            .jsonp<IRestTrackResponse>(url, 'callback')
            .pipe(
                map(response => RestTrackResponse.fromRest(response)),
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
