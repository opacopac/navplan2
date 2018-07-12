import {WaypointAltitude} from './waypoint-altitude';
import {Clonable} from '../../shared/model/clonable';
import {Position2d} from '../../shared/model/geometry/position2d';
import {WaypointType} from './waypoint-type';
import {Angle} from '../../shared/model/quantities/angle';
import {Distance} from '../../shared/model/quantities/distance';
import {AngleUnit, TimeUnit} from '../../shared/model/units';
import {Time} from '../../shared/model/quantities/time';


export class Waypoint implements Clonable<Waypoint> {
    public mt: Angle;
    public dist: Distance;
    public eet = new Time(0, TimeUnit.M);
    public vacTime = new Time(0, TimeUnit.M);
    public variation = new Angle(0, AngleUnit.DEG);
    public mtText = '';
    public distText = '';
    public eetText = '';


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
            this.position ? this.position.clone() : undefined,
            this.alt ? this.alt.clone() : undefined
        );
    }
}
