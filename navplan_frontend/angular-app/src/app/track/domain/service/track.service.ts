import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Track} from '../model/track';
import {ITrackRepoService} from './i-track-repo.service';
import {ITrackService} from './i-track.service';
import {ExportedFile} from '../../../exporter/domain/model/exported-file';


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


    public deleteUserTrack(trackid: number): Observable<boolean> {
        return this.trackRepo.deleteUserTrack(trackid);
    }


    public exportTrackKml(trackid: number): Observable<ExportedFile> {
        return this.trackRepo.exportTrackKml(trackid);
    }
}
