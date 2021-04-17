import {Clonable} from '../../system/domain-model/clonable';
import {Speed} from '../../geo-math/domain-model/quantities/speed';
import {Consumption} from '../../geo-math/domain-model/quantities/consumption';


export class Aircraft implements Clonable<Aircraft> {
    constructor(
        public speed: Speed,
        public consumption: Consumption) {
    }


    clone(): Aircraft {
        return new Aircraft(this.speed, this.consumption);
    }
}
