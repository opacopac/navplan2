import {Speed} from '../../../geo-physics/domain/model/quantities/speed';

export class DistancePerformanceCorrectionFactors {
    constructor(
        public grassRwyIncPercent: number,
        public wetRwyIncPercent: number,
        public headwindDecPercent: number,
        public headwindDecPerDelta: Speed,
        public tailwindIncPercent: number,
        public tailwindIncPerDelta: Speed,
    ) {
    }
}
