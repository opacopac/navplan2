import {Injectable} from '@angular/core';
import {Track} from '../model/track';
import {ITrackService} from './i-track.service';
import {TrackProfile} from '../model/track-profile';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {GeodesyHelper} from '../../../geo-physics/domain/service/geometry/geodesy-helper';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


@Injectable()
export class TrackService implements ITrackService {
    private static readonly MIN_TAXI_SPEED = Speed.ofKt(5);
    private static readonly MIN_FLIGHT_SPEED = Speed.ofKt(40);
    private static readonly MIN_CONSECUTIVE_SPEEDS = 5;


    public calculateTrackProfile(track: Track): TrackProfile {
        if (!track) {
            return null;
        }

        const altitudeProfile = this.calculateAltitudeProfile(track);
        const speedProfile = this.calculateSpeedProfile(track);
        const verticalSpeedProfile = this.calculateVerticalSpeedProfile(track);
        const blockTime = this.calculateBlockTime(speedProfile);
        const flightTime = this.calculateFlightTime(speedProfile);

        return new TrackProfile(
            altitudeProfile,
            speedProfile,
            verticalSpeedProfile,
            blockTime[0],
            flightTime[0],
            flightTime[1],
            blockTime[1]
        );
    }


    private calculateAltitudeProfile(track: Track): [Length, Date][] {
        return track.positionList
            .map(pos => [pos.altitude.getHeightAmsl(), pos.timestamp.date]);
    }


    private calculateSpeedProfile(track: Track): [Speed, Date][] {
        const speedProfile: [Speed, Date][] = [];

        for (let i = 1; i < track.positionList.length; i++) {
            const pos1 = track.positionList[i - 1];
            const pos2 = track.positionList[i];
            const distM = GeodesyHelper.calcDistance(pos1, pos2).m;
            const timeMs = pos2.timestamp.epochMs - pos1.timestamp.epochMs;
            const speed = Speed.ofMps(distM / timeMs * 1000);
            speedProfile.push([speed, pos2.timestamp.date]);
        }

        return speedProfile;
    }


    private calculateVerticalSpeedProfile(track: Track): [Speed, Date][] {
        const verticalSpeedProfile: [Speed, Date][] = [];

        for (let i = 1; i < track.positionList.length; i++) {
            const pos1 = track.positionList[i - 1];
            const pos2 = track.positionList[i];
            const alt1 = pos1.altitude.getHeightAmsl();
            const alt2 = pos2.altitude.getHeightAmsl();
            const timeMs = pos2.timestamp.epochMs - pos1.timestamp.epochMs;
            const verticalSpeed = Speed.ofFpm((alt2.ft - alt1.ft) / (timeMs / 1000) * 60);
            verticalSpeedProfile.push([verticalSpeed, pos2.timestamp.date]);
        }

        return verticalSpeedProfile;
    }


    private calculateBlockTime(speedProfile: [Speed, Date][]): [Date, Date] {
        return [
            this.findFirstSpeedDate(speedProfile, TrackService.MIN_TAXI_SPEED),
            this.findLastSpeedDate(speedProfile, TrackService.MIN_TAXI_SPEED)
        ];
    }


    private calculateFlightTime(speedProfile: [Speed, Date][]): [Date, Date] {
        return [
            this.findFirstSpeedDate(speedProfile, TrackService.MIN_FLIGHT_SPEED),
            this.findLastSpeedDate(speedProfile, TrackService.MIN_FLIGHT_SPEED)
        ];
    }


    private findFirstSpeedDate(speedProfile: [Speed, Date][], minSpeed: Speed): Date {
        let consecutiveSpeeds = 0;

        for (let i = 0; i < speedProfile.length; i++) {
            if (speedProfile[i][0].kt > minSpeed.kt) {
                if (consecutiveSpeeds > TrackService.MIN_CONSECUTIVE_SPEEDS) {
                    return speedProfile[i][1];
                } else {
                    consecutiveSpeeds++;
                }
            } else {
                consecutiveSpeeds = 0;
            }
        }

        return speedProfile[0][1];
    }


    private findLastSpeedDate(speedProfile: [Speed, Date][], minSpeed: Speed): Date {
        let consecutiveSpeeds = 0;

        for (let i = speedProfile.length - 1; i >= 0; i--) {
            if (speedProfile[i][0].kt > minSpeed.kt) {
                if (consecutiveSpeeds > TrackService.MIN_CONSECUTIVE_SPEEDS) {
                    return speedProfile[i][1];
                } else {
                    consecutiveSpeeds++;
                }
            } else {
                consecutiveSpeeds = 0;
            }
        }

        return speedProfile[speedProfile.length - 1][1];
    }
}
