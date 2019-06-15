import {WaypointAltitude} from './waypoint-altitude';
import {Clonable} from '../../shared/model/clonable';
import {Position2d} from '../../shared/model/geometry/position2d';
import {WaypointType} from './waypoint-type';
import {Angle} from '../../shared/model/quantities/angle';
import {Length} from '../../shared/model/quantities/length';
import {AngleUnit, TimeUnit} from '../../shared/model/quantities/units';
import {Time} from '../../shared/model/quantities/time';
import {DataItem, DataItemType} from '../../shared/model/data-item';


export class Waypoint extends DataItem implements Clonable<Waypoint> {
    public mt: Angle;
    public dist: Length;
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

        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.waypoint;
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
