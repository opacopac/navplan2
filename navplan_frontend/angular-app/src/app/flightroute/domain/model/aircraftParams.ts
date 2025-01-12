import {Clonable} from '../../../system/domain/model/clonable';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';


export class AircraftParams implements Clonable<AircraftParams> {
    constructor(
        public speed: Speed,
        public consumption: Consumption) {
    }


    clone(): AircraftParams {
        return new AircraftParams(this.speed, this.consumption);
    }
}
