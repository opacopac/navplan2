import {WaypointBase} from './waypoint-base';
import {Geoname} from '../geoname';
import {Position2d} from '../geometry/position2d';
import {Waypointtype} from '../waypoint';


export class WaypointGeoname extends WaypointBase {
    constructor(public geoname: Geoname) {
        super();
    }


    public getType(): Waypointtype {
        return Waypointtype.geoname;
    }


    public getPosition(): Position2d {
        return this.geoname.position;
    }


    public getCheckpoint(): string {
        return this.geoname.name;
    }
}
