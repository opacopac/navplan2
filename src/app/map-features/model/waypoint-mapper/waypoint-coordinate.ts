import {Position2d} from '../../../shared/model/geometry/position2d';
import {WaypointBase} from './waypoint-base';
import {WaypointType} from '../../../flightroute/model/waypoint-type';


export class WaypointCoordinate extends WaypointBase{
    constructor(public position: Position2d) {
        super();
    }


    public getType(): WaypointType {
        return WaypointType.geoname;
    }


    public getPosition(): Position2d {
        return this.position;
    }


    public getCheckpoint(): string {
        return Math.round(this.position.latitude * 10000) / 10000 + ' ' + Math.round(this.position.longitude * 10000) / 10000;
    }
}
