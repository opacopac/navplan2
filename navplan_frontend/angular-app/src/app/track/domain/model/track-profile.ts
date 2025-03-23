import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Track} from './track';
import {GeodesyHelper} from '../../../geo-physics/domain/service/geometry/geodesy-helper';


export class TrackProfile {
    private static readonly MIN_TAXI_SPEED = Speed.ofKt(5);
    private static readonly MIN_FLIGHT_SPEED = Speed.ofKt(35);
    private static readonly MIN_CONSECUTIVE_SPEEDS = 3;

    public readonly altitudeProfile: [Length, Date][];
    public readonly speedProfile: [Speed, Date][];
    public readonly verticalSpeedProfile: [Speed, Date][];
    public readonly offBlockTime: Date;
    public readonly takeoffTime: Date;
    public readonly landingTime: Date;
    public readonly onBlockTime: Date;

    constructor(track: Track) {
        this.altitudeProfile = this.calculateAltitudeProfile(track);
        this.speedProfile = this.calculateSpeedProfile(track);
        this.verticalSpeedProfile = this.calculateVerticalSpeedProfile(track);

        const blockTimes = this.calculateBlockTime(this.speedProfile);
        const flightTimes = this.calculateFlightTime(this.speedProfile);
        this.offBlockTime = blockTimes[0];
        this.takeoffTime = flightTimes[0];
        this.landingTime = flightTimes[1];
        this.onBlockTime = blockTimes[1];
    }


    public getFirstDate(): Date {
        return this.altitudeProfile[0][1];
    }


    public getLastDate(): Date {
        return this.altitudeProfile[this.altitudeProfile.length - 1][1];
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
            this.findFirstSpeedDate(speedProfile, TrackProfile.MIN_TAXI_SPEED),
            this.findLastSpeedDate(speedProfile, TrackProfile.MIN_TAXI_SPEED)
        ];
    }


    private calculateFlightTime(speedProfile: [Speed, Date][]): [Date, Date] {
        return [
            this.findFirstSpeedDate(speedProfile, TrackProfile.MIN_FLIGHT_SPEED),
            this.findLastSpeedDate(speedProfile, TrackProfile.MIN_FLIGHT_SPEED)
        ];
    }


    private findFirstSpeedDate(speedProfile: [Speed, Date][], minSpeed: Speed): Date {
        let consecutiveSpeeds = 0;

        for (let i = 0; i < speedProfile.length; i++) {
            if (speedProfile[i][0].kt > minSpeed.kt) {
                if (consecutiveSpeeds >= TrackProfile.MIN_CONSECUTIVE_SPEEDS) {
                    return speedProfile[i - TrackProfile.MIN_CONSECUTIVE_SPEEDS][1];
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
                if (consecutiveSpeeds >= TrackProfile.MIN_CONSECUTIVE_SPEEDS) {
                    return speedProfile[i + TrackProfile.MIN_CONSECUTIVE_SPEEDS][1];
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
