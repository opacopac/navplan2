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


    public clone() {
        return new DistancePerformanceCorrectionFactors(
            this.grassRwyIncPercent,
            this.wetRwyIncPercent,
            this.headwindDecPercent,
            this.headwindDecPerSpeed.clone(),
            this.tailwindIncPercent,
            this.tailwindIncPerSpeed.clone()
        );
    }
}
