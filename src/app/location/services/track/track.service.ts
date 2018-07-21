import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../shared/services/logging/logging.service';
import {Track} from '../../model/track';
import {RestMapperTrack, TrackListResponse} from '../../model/rest-mapper-track';
import {User} from '../../../user/model/user';

const userTrackBaseUrl =  environment.restApiBaseUrl + 'php/userTrack.php';


@Injectable()
export class TrackService {
    constructor(private http: HttpClient) {
    }


    readUserTrackList(
        user: User,
        successCallback: (trackList: Track[]) => void,
        errorCallback: (message: string) => void) {

        const url: string = userTrackBaseUrl + '?email=' + user.email + '&token=' + user.token;
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