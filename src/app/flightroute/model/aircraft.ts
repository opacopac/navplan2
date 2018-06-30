import {Consumption} from "../../model/quantities/consumption";
import {Speed} from "../../model/quantities/speed";
import {Clonable} from "../../model/clonable";


export class Aircraft implements Clonable<Aircraft> {
    constructor(
        public speed: Speed,
        public consumption: Consumption) {
    }


    clone(): Aircraft {
        return new Aircraft(this.speed, this.consumption);
    }
}
