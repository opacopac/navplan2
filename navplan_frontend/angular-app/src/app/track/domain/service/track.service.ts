import {Injectable} from '@angular/core';
import {Track} from '../model/track';
import {ITrackService} from './i-track.service';
import {TrackProfile} from '../model/track-profile';


@Injectable()
export class TrackService implements ITrackService {
    public calculateTrackProfile(track: Track): TrackProfile {
        if (!track) {
            return null;
        }

        return new TrackProfile(track);
    }
}
