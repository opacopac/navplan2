import {Clonable} from '../../shared/model/clonable';
import {Speed} from '../../shared/model/quantities/speed';
import {Consumption} from '../../shared/model/quantities/consumption';


export class Aircraft implements Clonable<Aircraft> {
    constructor(
        public speed: Speed,
        public consumption: Consumption) {
    }


    clone(): Aircraft {
        return new Aircraft(this.speed, this.consumption);
    }
}
