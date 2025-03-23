import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class TrackProfile {
    constructor(
        public readonly altitudeProfile: [Length, Date][],
        public readonly speedProfile: [Speed, Date][],
        public readonly verticalSpeedProfile: [Speed, Date][],
        public readonly offBlockTime: Date,
        public readonly takeoffTime: Date,
        public readonly landingTime: Date,
        public readonly onBlockTime: Date,
    ) {
    }


    public getFirstDate(): Date {
        return this.altitudeProfile[0][1];
    }


    public getLastDate(): Date {
        return this.altitudeProfile[this.altitudeProfile.length - 1][1];
    }
}
