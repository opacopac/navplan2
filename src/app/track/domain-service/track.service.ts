import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../user/domain-model/user';
import {Track} from '../domain-model/track';
import {ITrackRepoService} from './i-track-repo.service';


@Injectable()
export class TrackService {
    public constructor(private trackRepo: ITrackRepoService) {
    }


    public readUserTrackList(user: User): Observable<Track[]> {
        return this.trackRepo.readUserTrackList(user);
    }


    public readUserTrack(trackid, user: User): Observable<Track> {
        return this.trackRepo.readUserTrack(trackid, user);
    }


    public createUserTrack(timestamp, name, positions): void {
        return this.trackRepo.createUserTrack(timestamp, name, positions);
    }
}
