import {Observable} from 'rxjs';
import {User} from '../../user/domain-model/user';
import {Track} from '../domain-model/track';


export abstract class ITrackService {
    abstract readUserTrackList(user: User): Observable<Track[]>;

    abstract readUserTrack(trackid, user: User): Observable<Track>;

    abstract createUserTrack(timestamp, name, positions): void;
}
