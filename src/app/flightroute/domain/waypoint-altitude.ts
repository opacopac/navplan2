import {Clonable} from '../../system/domain/clonable';


export class WaypointAltitude implements Clonable<WaypointAltitude> {
    constructor(
        public alt_ft?: number, // TODO: typed
        public isminalt = false,
        public ismaxalt = false,
        public isaltatlegstart = false) {
    }


    clone(): WaypointAltitude {
        return new WaypointAltitude(
            this.alt_ft,
            this.isminalt,
            this.ismaxalt,
            this.isaltatlegstart);
    }
}
