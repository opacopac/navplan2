import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Track} from './track';
import {GeodesyHelper} from '../../../geo-physics/domain/service/geometry/geodesy-helper';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';
import {AltitudeUnit} from '../../../geo-physics/domain/model/geometry/altitude-unit';
import {AltitudeReference} from '../../../geo-physics/domain/model/geometry/altitude-reference';
import {Position4d} from '../../../geo-physics/domain/model/geometry/position4d';
import {Timestamp} from '../../../geo-physics/domain/model/quantities/timestamp';
import { StatisticsHelper } from '../../../common/model/statistics-helper';


export class TrackProfile {
    private static readonly MIN_TAXI_SPEED = Speed.ofKt(5);
    private static readonly MIN_FLIGHT_SPEED = Speed.ofKt(35);
    private static readonly MIN_CONSECUTIVE_SPEEDS = 3;

    public readonly altitudeProfile: [Length, Date][];
    public readonly distanceProfile: [Length, Date][];
    public readonly speedProfile: [Speed, Date][];
    public readonly verticalSpeedProfile: [Speed, Date][];
    public readonly maxAltitude: Length;
    public readonly maxSpeed: Speed;
    public readonly maxVerticalSpeed: Speed;
    public readonly offBlockTime: Date;
    public readonly takeoffTime: Date;
    public readonly landingTime: Date;
    public readonly onBlockTime: Date;

    constructor(track: Track) {
        // const posList = track.positionList;
        const posList = this.calcSmoothedPositions(track);
        this.altitudeProfile = this.calculateAltitudeProfile(posList);
        this.distanceProfile = this.calculateDistanceProfile(posList);
        this.speedProfile = this.calculateSpeedProfile();
        this.verticalSpeedProfile = this.calculateVerticalSpeedProfile(posList);

        this.maxAltitude = this.calculateMaxAltitude();
        this.maxSpeed = this.calculateMaxSpeed();
        this.maxVerticalSpeed = this.calculateMaxVerticalSpeed();

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


    // average over N points
    private calcSmoothedPositions(track: Track): Position4d[] {
        const windowSize = 5;
        const avgLatList = StatisticsHelper.movingAverage(
            track.positionList.map(pos => pos.latitude),
            windowSize
        );
        const avgLonList = StatisticsHelper.movingAverage(
            track.positionList.map(pos => pos.longitude),
            windowSize
        );
        const avgAltList = StatisticsHelper.movingAverage(
            track.positionList.map(pos => pos.altitude.getHeightAmsl().m),
            windowSize
        );
        const avgTimestampList = StatisticsHelper.movingAverage(
            track.positionList.map(pos => pos.timestamp.epochMs),
            windowSize
        );

        const smoothedPos: Position4d[] = [];
        for (let i = 0; i < avgLatList.length; i++) {
            const smoothedPos4d = new Position4d(
                avgLonList[i],
                avgLatList[i],
                new Altitude(avgAltList[i], AltitudeUnit.M, AltitudeReference.MSL),
                Timestamp.createFromMs(avgTimestampList[i])
            );
            smoothedPos.push(smoothedPos4d);
        }

        return smoothedPos;
    }


    private calculateAltitudeProfile(posList: Position4d[]): [Length, Date][] {
        return posList.map(pos => [pos.altitude.getHeightAmsl(), pos.timestamp.date]);
    }


    private calculateMaxAltitude(): Length {
        return this.altitudeProfile
            .reduce((max, cur) => cur[0].ft > max.ft ? cur[0] : max, Length.ofZero());
    }


    private calculateMaxSpeed(): Speed {
        return this.speedProfile
            .reduce((max, cur) => cur[0].mps > max.mps ? cur[0] : max, Speed.ofZero());
    }


    private calculateMaxVerticalSpeed(): Speed {
        const maxAbsSpeedFpm = this.verticalSpeedProfile
            .map(vSpeed => Math.abs(vSpeed[0].fpm))
            .reduce((max, cur) => cur > max ? cur : max, 0);

        return Speed.ofFpm(maxAbsSpeedFpm);
    }


    private calculateDistanceProfile(posList: Position4d[]): [Length, Date][] {
        const distanceProfile: [Length, Date][] = [];

        let accumulatedDistanceM = Length.ofM(0);
        distanceProfile.push([accumulatedDistanceM, posList[0].timestamp.date]);

        for (let i = 1; i < posList.length; i++) {
            const pos1 = posList[i - 1];
            const pos2 = posList[i];
            const distM = GeodesyHelper.calcDistance(pos1, pos2).m;
            if (distM > 0) {
                accumulatedDistanceM = accumulatedDistanceM.add(Length.ofM(distM));
                distanceProfile.push([accumulatedDistanceM, pos2.timestamp.date]);
            }
        }

        return distanceProfile;
    }


    private calculateSpeedProfile(): [Speed, Date][] {
        const speedProfile: [Speed, Date][] = [];

        for (let i = 1; i < this.distanceProfile.length; i++) {
            const lastPoint = this.distanceProfile[i - 1];
            const currentPoint = this.distanceProfile[i];
            const timeMs = currentPoint[1].getTime() - lastPoint[1].getTime();
            const speed = Speed.ofMps((currentPoint[0].m - lastPoint[0].m) / timeMs * 1000);
            speedProfile.push([speed, currentPoint[1]]);
        }

        return speedProfile;

    }


    private calculateSpeedProfile2(posList: Position4d[]): [Speed, Date][] {
        const speedProfile: [Speed, Date][] = [];

        for (let i = 1; i < posList.length; i++) {
            const pos1 = posList[i - 1];
            const pos2 = posList[i];
            const distM = GeodesyHelper.calcDistance(pos1, pos2).m;
            const timeMs = pos2.timestamp.epochMs - pos1.timestamp.epochMs;
            const speed = Speed.ofMps(distM / timeMs * 1000);
            speedProfile.push([speed, pos2.timestamp.date]);
        }

        return speedProfile;
    }


    private calculateVerticalSpeedProfile(posList: Position4d[]): [Speed, Date][] {
        const verticalSpeedProfile: [Speed, Date][] = [];

        for (let i = 1; i < posList.length; i++) {
            const pos1 = posList[i - 1];
            const pos2 = posList[i];
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
