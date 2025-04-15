import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Track} from './track';
import {GeodesyHelper} from '../../../geo-physics/domain/service/geometry/geodesy-helper';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';
import {AltitudeUnit} from '../../../geo-physics/domain/model/geometry/altitude-unit';
import {AltitudeReference} from '../../../geo-physics/domain/model/geometry/altitude-reference';
import {Position4d} from '../../../geo-physics/domain/model/geometry/position4d';
import {Timestamp} from '../../../geo-physics/domain/model/quantities/timestamp';
import {StatisticsHelper} from '../../../common/model/statistics-helper';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {TimeUnit} from '../../../geo-physics/domain/model/quantities/time-unit';
import {KalmanFilter} from 'kalman-filter';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {KalmanFilterConstAcc} from '../../../geo-physics/domain/service/kalman/kalman-filter-const-acc';
import {HampelFilter} from '../../../geo-physics/domain/service/hampel/hampel-filter';


export class TrackProfile {
    private static readonly MIN_TAXI_SPEED = Speed.ofKt(5);
    private static readonly MIN_FLIGHT_SPEED = Speed.ofKt(35);
    private static readonly MIN_CONSECUTIVE_SPEEDS = 3;
    private static readonly OUTLIER_THRESHOLD = 5;
    private static readonly AVERAGE_WINDOW_SIZE = 10;

    public readonly altitudeProfile: [Length, Date][];
    public readonly speedProfile: [Speed, Date][];
    public readonly verticalSpeedProfile: [Speed, Date][];
    public readonly maxAltitude: Length;
    public readonly maxSpeed: Speed;
    public readonly maxVerticalSpeed: Speed;
    public readonly offBlockTime: Date;
    public readonly onBlockTime: Date;
    public readonly blockTime: Time;
    public readonly takeoffTime: Date;
    public readonly landingTime: Date;
    public readonly flightTime: Time;


    constructor(track: Track) {
        const posList = track.positionList;
        // const posList = this.calcSmoothedPositions(track);
        // const posList = this.calcKalmanFilter2(track);

        this.altitudeProfile = this.calculateAltitudeProfile(posList);

        // this.speedProfile = this.calculateSpeedProfile(posList);
        this.speedProfile = this.filterAndSmoothSpeedProfile(
            this.calculateSpeedProfile(posList),
            TrackProfile.AVERAGE_WINDOW_SIZE,
            TrackProfile.OUTLIER_THRESHOLD
        );

        // this.verticalSpeedProfile = this.calculateVerticalSpeedProfile(posList);
        this.verticalSpeedProfile = this.filterAndSmoothVerticalSpeedProfile(
            this.calculateVerticalSpeedProfile(posList),
            TrackProfile.AVERAGE_WINDOW_SIZE,
            TrackProfile.OUTLIER_THRESHOLD
        );

        this.maxAltitude = this.calculateMaxAltitude();
        this.maxSpeed = this.calculateMaxSpeed();
        this.maxVerticalSpeed = this.calculateMaxVerticalSpeed();

        const blockTimes = this.calculateBlockTime(this.speedProfile);
        this.offBlockTime = blockTimes[0];
        this.onBlockTime = blockTimes[1];
        this.blockTime = blockTimes[2];

        const flightTimes = this.calculateFlightTime(this.speedProfile);
        this.takeoffTime = flightTimes[0];
        this.landingTime = flightTimes[1];
        this.flightTime = flightTimes[2];
    }


    public getFirstDate(): Date {
        return this.altitudeProfile[0][1];
    }


    public getLastDate(): Date {
        return this.altitudeProfile[this.altitudeProfile.length - 1][1];
    }


    private calcKalmanFilter2(track: Track): Position4d[] {
        const latLonFact = 10000;
        let prevPos = track.positionList[0];

        const kfLat = new KalmanFilterConstAcc({x: prevPos.latitude * latLonFact, v: 0, a: 0}, 10);
        const kfLon = new KalmanFilterConstAcc({x: prevPos.longitude * latLonFact, v: 0, a: 0}, 10);
        const kfAlt = new KalmanFilterConstAcc({x: prevPos.altitude.getHeightAmsl().m, v: 0, a: 0}, 1);

        const smoothedPos: Position4d[] = [];
        for (let i = 1; i < track.positionList.length; i++) {
            const pos = track.positionList[i];
            console.log('orig', pos);
            const dt = (pos.timestamp.epochMs - prevPos.timestamp.epochMs) / 1000;
            kfLat.predict(dt);
            kfLon.predict(dt);
            kfAlt.predict(dt);

            kfLat.update(pos.latitude * latLonFact);
            kfLon.update(pos.longitude * latLonFact);
            kfAlt.update(pos.altitude.getHeightAmsl().m);

            const stateLat = kfLat.getState();
            const stateLon = kfLon.getState();
            const stateAlt = kfAlt.getState();

            if (!isNaN(stateLat.x) && !isNaN(stateLon.x) && !isNaN(stateAlt.x)) {
                const newPos = new Position4d(
                    stateLon.x / latLonFact,
                    stateLat.x / latLonFact,
                    Altitude.fromLengthUnit(stateAlt.x, LengthUnit.M, AltitudeReference.MSL),
                    pos.timestamp
                );
                console.log('smoothed', newPos);
                smoothedPos.push(newPos);
            } else {
                console.log('nan');
            }

            prevPos = pos;
        }

        return smoothedPos;
    }


    private calcKalmanFilter(track: Track): Position4d[] {
        /*const kf = new KalmanFilter();
        let prevCorrected = null;
        const smoothedPos: Position4d[] = [];
        track.positionList.forEach(pos => {
            const observation = [pos.latitude, pos.longitude, pos.altitude.getHeightAmsl().m];
            prevCorrected = kf.filter({prevCorrected, observation});
        });

        return smoothedPos;*/


        const kf = new KalmanFilter({
            observation: {
                sensorDimension: 3,
                name: 'sensor'
            },
            dynamic: {
                name: 'constant-acceleration',
                timeStep: 1,
                covariance: [30, 30, 30, 40, 40, 40, 50, 50, 50]
            }
        });
        const pureNumbersPos = track.positionList.map(pos => [pos.latitude, pos.longitude, pos.altitude.getHeightAmsl().m]);
        const smoothedNumers = kf.filterAll(pureNumbersPos);

        return smoothedNumers.map(((num, index) => new Position4d(
            num[1],
            num[0],
            Altitude.fromLengthUnit(num[2], LengthUnit.M, AltitudeReference.MSL),
            track.positionList[index].timestamp
        )));
    }


    // average over N points
    private calcSmoothedPositions(track: Track, windowSize: number): Position4d[] {
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
                Timestamp.fromEpochMs(avgTimestampList[i])
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


    private calculateSpeedProfile(posList: Position4d[]): [Speed, Date][] {
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


    private filterAndSmoothSpeedProfile(speedList: [Speed, Date][], window: number, thresholdKt: number): [Speed, Date][] {
        const speedValues = speedList.map(speed => speed[0].kt);
        const filteredSpeedValues = HampelFilter.filter(speedValues, window, thresholdKt);
        const smoothedSpeedValues = StatisticsHelper.movingAverage(filteredSpeedValues, window);

        return smoothedSpeedValues.map((speed, index) => {
            const originalDate = speedList[index][1];
            return [Speed.ofKt(speed), originalDate];
        });
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


    private filterAndSmoothVerticalSpeedProfile(verticalSpeedList: [Speed, Date][], window: number, thresholdFpm: number): [Speed, Date][] {
        const verticalSpeedValues = verticalSpeedList.map(vSpeed => vSpeed[0].fpm);
        const filteredVerticalSpeedValues = HampelFilter.filter(verticalSpeedValues, window, thresholdFpm);
        const smoothedVerticalSpeedValues = StatisticsHelper.movingAverage(filteredVerticalSpeedValues, window);

        return smoothedVerticalSpeedValues.map((vSpeed, index) => {
            const originalDate = verticalSpeedList[index][1];
            return [Speed.ofFpm(vSpeed), originalDate];
        });
    }


    private calculateBlockTime(speedProfile: [Speed, Date][]): [Date, Date, Time] {
        const offBlockTime = this.findFirstSpeedDate(speedProfile, TrackProfile.MIN_TAXI_SPEED);
        const onBlockTime = this.findLastSpeedDate(speedProfile, TrackProfile.MIN_TAXI_SPEED);
        const blockTime = new Time(onBlockTime.getTime() - offBlockTime.getTime(), TimeUnit.MS);

        return [offBlockTime, onBlockTime, blockTime];
    }


    private calculateFlightTime(speedProfile: [Speed, Date][]): [Date, Date, Time] {
        const takeoffTime = this.findFirstSpeedDate(speedProfile, TrackProfile.MIN_FLIGHT_SPEED);
        const landingTime = this.findLastSpeedDate(speedProfile, TrackProfile.MIN_FLIGHT_SPEED);
        const flightTime = new Time(landingTime.getTime() - takeoffTime.getTime(), TimeUnit.MS);

        return [takeoffTime, landingTime, flightTime];
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
