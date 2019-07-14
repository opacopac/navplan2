import {Clonable} from '../../system/domain/clonable';
import {Speed} from '../../geo-math/domain/quantities/speed';
import {Consumption} from '../../geo-math/domain/quantities/consumption';


export class Aircraft implements Clonable<Aircraft> {
    constructor(
        public speed: Speed,
        public consumption: Consumption) {
    }


    clone(): Aircraft {
        return new Aircraft(this.speed, this.consumption);
    }
}
