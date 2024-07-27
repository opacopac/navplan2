import {Speed} from '../../../geo-physics/domain/model/quantities/speed';

export class DistancePerformanceCorrectionFactors {
    constructor(
        public grassRwyIncPercent: number,
        public wetRwyIncPercent: number,
        public headwindDecPercent: number,
        public headwindDecPerSpeed: Speed,
        public tailwindIncPercent: number,
        public tailwindIncPerSpeed: Speed,
    ) {
    }
}
