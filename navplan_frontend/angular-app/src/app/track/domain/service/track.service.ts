import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Track} from '../model/track';
import {ITrackRepoService} from './i-track-repo.service';
import {ITrackService} from './i-track.service';


@Injectable()
export class TrackService implements ITrackService {
    public constructor(private trackRepo: ITrackRepoService) {
    }


    public readUserTrackList(): Observable<Track[]> {
        return this.trackRepo.readUserTrackList();
    }


    public readUserTrack(trackid: number): Observable<Track> {
        return this.trackRepo.readUserTrack(trackid);
    }


    public createUserTrack(timestamp, name, positions): void {
        return this.trackRepo.createUserTrack(timestamp, name, positions);
    }
}
