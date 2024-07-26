import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {DistancePerformanceTable} from './distance-performance-table';
import {WeightItem} from './weight-item';
import {WnbEnvelope} from './wnb-envelope';

export class Aircraft {
    constructor(
        public id: number,
        public vehicleType: string,
        public registration: string,
        public icaoType: string,
        public cruiseSpeed: Speed,
        public cruiseFuel: Consumption,
        public fuelType: string,
        public mtow: Weight,
        public bew: Weight,
        public perfTakeoffGroundRoll: DistancePerformanceTable,
        public perfTakeoffDist50ft: DistancePerformanceTable,
        public perfLandingGroundRoll: DistancePerformanceTable,
        public perfLandingDist50ft: DistancePerformanceTable,
        public wnbWeightItems: WeightItem[],
        public wnbEnvelopes: WnbEnvelope[]
    ) {
    }
}
