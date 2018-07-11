import {WaypointAltitude} from './waypoint-altitude';
import {Clonable} from '../../shared/model/clonable';
import {Position2d} from '../../shared/model/geometry/position2d';
import {WaypointType} from './waypoint-type';
import {Angle} from '../../shared/model/quantities/angle';
import {Distance} from '../../shared/model/quantities/distance';
import {AngleUnit} from '../../shared/model/units';


export class Waypoint implements Clonable<Waypoint> {
    public mt: Angle;
    public dist: Distance;
    public mtText = '';
    public distText = '';
    public eetText = '';
    public vacTime = 0;
    public variation = new Angle(0, AngleUnit.DEG);


    constructor(
        public type: WaypointType,
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
