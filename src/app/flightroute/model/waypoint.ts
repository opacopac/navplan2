import {Position2d} from "../../model/geometry/position2d";
import {WaypointAltitude} from "./waypoint-altitude";
import {Waypointtype} from "../../model/waypoint";
import {Clonable} from "../../model/clonable";

export class Waypoint implements Clonable<Waypoint> {
    constructor(
        public type: Waypointtype,
        public freq: string,
        public callsign: string,
        public checkpoint: string,
        public remark: string,
        public supp_info: string,
        public position: Position2d,
        public alt: WaypointAltitude) {
    }


    clone(): Waypoint {
        return new Waypoint(
            this.type,
            this.freq,
            this.callsign,
            this.checkpoint,
            this.remark,
            this.supp_info,
            this.position.clone(),
            this.alt.clone());
    }
}
