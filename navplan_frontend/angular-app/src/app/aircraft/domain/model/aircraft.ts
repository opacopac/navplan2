import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {DistancePerformanceTable} from './distance-performance-table';
import {WeightItem} from './weight-item';
import {WnbEnvelope} from './wnb-envelope';
import {VehicleType} from './vehicle-type';
import { FuelType } from './fuel-type';

export class Aircraft {
    constructor(
        public id: number,
        public vehicleType: VehicleType,
        public registration: string,
        public icaoType: string,
        public cruiseSpeed: Speed,
        public cruiseFuel: Consumption,
        public fuelType: FuelType,
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


    public clone(): Aircraft {
        return new Aircraft(
            this.id,
            this.vehicleType,
            this.registration,
            this.icaoType,
            this.cruiseSpeed?.clone(),
            this.cruiseFuel?.clone(),
            this.fuelType,
            this.mtow?.clone(),
            this.bew?.clone(),
            this.perfTakeoffGroundRoll?.clone(),
            this.perfTakeoffDist50ft?.clone(),
            this.perfLandingGroundRoll?.clone(),
            this.perfLandingDist50ft?.clone(),
            this.wnbWeightItems?.map(wi => wi.clone()),
            this.wnbEnvelopes?.map(we => we.clone())
        );
    }
}
