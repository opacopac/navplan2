import { WaypointBase } from './waypoint-base';
import { Position2d } from '../position';
import { Waypointtype } from '../waypoint';


export class WaypointCoordinate extends WaypointBase{
    constructor(public position: Position2d) {
        super();
    }


    public getType(): Waypointtype {
        return Waypointtype.geoname;
    }


    public getPosition(): Position2d {
        return this.position;
    }


    public getCheckpoint(): string {
        return Math.round(this.position.latitude * 10000) / 10000 + " " + Math.round(this.position.longitude * 10000) / 10000;
    }
}
