import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class TrackProfile {
    constructor(
        public readonly altitudeProfile: [Length, Date][],
        public readonly speedProfile: [Speed, Date][],
        public readonly verticalSpeedProfile: [Speed, Date][],
        public readonly offBlockTime: Date,
        public readonly takeoffTime: Date,
        public readonly LandingTime: Date,
        public readonly onBlockTime: Date,
    ) {
    }
}
