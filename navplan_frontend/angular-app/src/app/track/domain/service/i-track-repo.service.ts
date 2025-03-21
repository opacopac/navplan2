import {Observable} from 'rxjs';
import {Track} from '../model/track';
import {ExportedFile} from '../../../exporter/domain/model/exported-file';
import {Position4d} from '../../../geo-physics/domain/model/geometry/position4d';


export abstract class ITrackRepoService {
    abstract readUserTrackList(): Observable<Track[]>;

    abstract readUserTrack(trackid: number): Observable<Track>;

    abstract updateUserTrack(track: Track): Observable<Track>;

    abstract createUserTrack(timestamp, name: string, positions: Position4d[]): Observable<Track>;

    abstract deleteUserTrack(trackid: number): Observable<boolean>;

    abstract exportTrackKml(trackid: number): Observable<ExportedFile>;
}
