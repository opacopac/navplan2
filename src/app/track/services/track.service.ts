import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../shared/services/logging/logging.service';
import {RestMapperTrack, SingleTrackResponse, TrackListResponse} from '../model/rest-mapper-track';
import {Track} from '../model/track';
import {User} from '../../user/model/user';
import {catchError, map} from 'rxjs/operators';

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
            .jsonp<TrackListResponse>(url, 'callback')
            .pipe(
                map(response => RestMapperTrack.getTrackListFromResponse(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading tracks', err);
                    return throwError(err);
                })
            );
    }


    readUserTrack(trackid, user: User): Observable<Track> {
        const url: string = userTrackBaseUrl + '?email=' + user.email + '&token=' + user.token + '&id=' + encodeURI(trackid);
        return this.http
            .jsonp<SingleTrackResponse>(url, 'callback')
            .pipe(
                map(response => RestMapperTrack.getTrackFromResponse(response)),
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
