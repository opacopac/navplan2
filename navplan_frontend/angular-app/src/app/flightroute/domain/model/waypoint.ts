import {WaypointAltitude} from './waypoint-altitude';
import {Clonable} from '../../../system/domain/model/clonable';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {WaypointType} from './waypoint-type';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {TimeUnit} from '../../../geo-physics/domain/model/quantities/time-unit';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {AngleUnit} from '../../../geo-physics/domain/model/quantities/angle-unit';


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
        public wpAlt: WaypointAltitude
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.waypoint;
    }


    public getPosition(): Position2d {
        return this.position;
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
            this.wpAlt ? this.wpAlt.clone() : undefined
        );
    }
}
