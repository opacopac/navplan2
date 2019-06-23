import {WaypointBase} from './waypoint-base';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {Geoname} from '../../../open-aip/domain/geoname';
import {WaypointType} from '../waypoint-type';


export class WaypointGeoname extends WaypointBase {
    constructor(public geoname: Geoname) {
        super();
    }


    public getType(): WaypointType {
        return WaypointType.geoname;
    }


    public getPosition(): Position2d {
        return this.geoname.position;
    }


    public getCheckpoint(): string {
        return this.geoname.name;
    }
}
