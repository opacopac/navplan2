import {Clonable} from '../../system/domain-model/clonable';
import {Altitude} from '../../geo-physics/domain-model/geometry/altitude';


export class WaypointAltitude implements Clonable<WaypointAltitude> {
    constructor(
        public alt: Altitude = undefined,
        public isminalt = false,
        public ismaxalt = false,
        public isaltatlegstart = false) {
    }


    clone(): WaypointAltitude {
        return new WaypointAltitude(
            this.alt,
            this.isminalt,
            this.ismaxalt,
            this.isaltatlegstart);
    }
}
