import {Observable} from 'rxjs';
import {User} from '../../../user/domain/model/user';
import {Track} from '../model/track';


export abstract class ITrackService {
    abstract readUserTrackList(): Observable<Track[]>;

    abstract readUserTrack(trackid: number): Observable<Track>;

    abstract createUserTrack(timestamp, name, positions): void;
}
