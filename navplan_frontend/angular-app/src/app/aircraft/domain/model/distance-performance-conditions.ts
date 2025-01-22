import {Speed} from '../../../geo-physics/domain/model/quantities/speed';


export class DistancePerformanceConditions {
    public constructor(
        public isGrassRwy: boolean,
        public isWetRwy: boolean,
        public headwind: Speed,
        public reservePercent: number
    ) {
    }
}
