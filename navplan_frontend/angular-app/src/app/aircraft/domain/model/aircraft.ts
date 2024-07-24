import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';

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
        public bew: Weight
    ) {
    }
}
