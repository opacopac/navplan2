import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {DistancePerformanceTable} from '../../../aircraft-performance/domain/model/distance-performance-table';
import {WeightItem} from '../../../aircraft-wnb/domain/model/weight-item';
import {WnbEnvelope} from '../../../aircraft-wnb/domain/model/wnb-envelope';
import {VehicleType} from './vehicle-type';
import {FuelType} from './fuel-type';
import {Length} from '../../../geo-physics/domain/model/quantities/length';

export class Aircraft {
    public static createMinimal(
        vehicleType: VehicleType,
        registration: string,
        icaoType: string,
        cruiseSpeed: Speed,
        cruiseFuel: Consumption,
        fuelType: FuelType
    ): Aircraft {
        return new Aircraft(
            0,
            vehicleType,
            registration,
            icaoType,
            cruiseSpeed,
            cruiseFuel,
            fuelType,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            [],
            []
        );
    }


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
        public rocSealevel: Speed,
        public serviceCeiling: Length,
        public cruiseClimbSpeed: Speed,
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
            this.rocSealevel?.clone(),
            this.serviceCeiling?.clone(),
            this.cruiseClimbSpeed?.clone(),
            this.perfTakeoffGroundRoll?.clone(),
            this.perfTakeoffDist50ft?.clone(),
            this.perfLandingGroundRoll?.clone(),
            this.perfLandingDist50ft?.clone(),
            this.wnbWeightItems?.map(wi => wi.clone()),
            this.wnbEnvelopes?.map(we => we.clone())
        );
    }
}
