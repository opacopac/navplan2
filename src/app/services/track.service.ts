import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggingService } from './logging.service';
import { Track } from '../model/track';
import { Timestamp } from '../model/timestamp';
import { SessionService } from './session.service';
import { Sessioncontext } from '../model/sessioncontext';

const userTrackBaseUrl =  environment.restApiBaseUrl + 'php/userTrack.php';


interface TrackListResponse {
    tracks: TrackListEntry[];
}

interface TrackListEntry {
    id: number;
    timestamp: number;
    name: string;
}


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
            .get<TrackListResponse>(url, {observe: 'response'})
            .subscribe(
                response => {
                    const trackList = this.getTrackListFromResponse(response.body);
                    successCallback(trackList);
                },
                err => {
                    message = 'ERROR reading tracks!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }


    private getTrackListFromResponse(response: TrackListResponse): Track[] {
        if (!response.tracks || response.tracks.length === 0) {
            return [];
        }

        const trackList: Track[] = [];
        for (let i = 0; i < response.tracks.length; i++) {
            const entry: TrackListEntry = response.tracks[i];
            const track = new Track(
                entry.id,
                entry.name,
                null,
                new Timestamp(entry.timestamp));
            trackList.push(track);
        }

        return trackList;
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
