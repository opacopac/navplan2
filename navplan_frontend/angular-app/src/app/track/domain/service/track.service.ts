import {Injectable} from '@angular/core';
import {Track} from '../model/track';
import {ITrackService} from './i-track.service';
import {TrackProfile} from '../model/track-profile';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {GeodesyHelper} from '../../../geo-physics/domain/service/geometry/geodesy-helper';


@Injectable()
export class TrackService implements ITrackService {
    private static readonly MIN_TAXI_SPEED = Speed.ofKt(5);

    public calculateTrackProfile(track: Track): TrackProfile {
        const speedProfile = this.calculateSpeedProfile(track);
        return undefined;
    }


    private calculateSpeedProfile(track: Track): Speed[] {
        const speedProfile: Speed[] = [];
        for (let i = 1; i < track.positionList.length; i++) {
            const pos1 = track.positionList[i - 1];
            const pos2 = track.positionList[i];
            const distM = GeodesyHelper.calcDistance(pos1, pos2).m;
            const timeMs = pos2.timestamp.epochMs - pos1.timestamp.epochMs;
            const speed = Speed.ofMps(distM / timeMs * 1000);
            speedProfile.push(speed);
        }

        return speedProfile;
    }
}
