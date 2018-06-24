import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../utils/logging.service';
import { Track } from '../../model/track';
import { SessionService } from '../session/session.service';
import { Sessioncontext } from '../../model/session/sessioncontext';
import { RestMapperTrack, TrackListResponse } from '../../model/rest-mapper/rest-mapper-track';

const userTrackBaseUrl =  environment.restApiBaseUrl + 'php/userTrack.php';


@Injectable()
export class TrackService {
    private session: Sessioncontext;


    constructor(private http: HttpClient, private sessionService: SessionService) {
        this.session = sessionService.getSessionContext();
    }


    readUserTrackList(
        successCallback: (trackList: Track[]) => void,
        errorCallback: (message: string) => void) {

        const url: string = userTrackBaseUrl + '?email=' + this.session.user.email + '&token=' + this.session.user.token;
        let message: string;
        this.http
            .jsonp<TrackListResponse>(url, 'callback')
            .subscribe(
                response => {
                    const trackList = RestMapperTrack.getTrackListFromResponse(response);
                    successCallback(trackList);
                },
                err => {
                    message = 'ERROR reading tracks!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }


    readUserTrack(trackid) {
        // return $http.get(userTrackBaseUrlGet + '&id=' + encodeURI(trackid));
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
