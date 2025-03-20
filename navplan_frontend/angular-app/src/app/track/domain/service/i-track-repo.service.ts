import {Observable} from 'rxjs';
import {Track} from '../model/track';
import {ExportedFile} from '../../../exporter/domain/model/exported-file';


export abstract class ITrackRepoService {
    abstract readUserTrackList(): Observable<Track[]>;

    abstract readUserTrack(trackid: number): Observable<Track>;

    abstract updateUserTrack(track: Track): Observable<Track>;

    abstract createUserTrack(timestamp, name, positions): Observable<Track>;

    abstract deleteUserTrack(trackid: number): Observable<boolean>;

    abstract exportTrackKml(trackid: number): Observable<ExportedFile>;
}
