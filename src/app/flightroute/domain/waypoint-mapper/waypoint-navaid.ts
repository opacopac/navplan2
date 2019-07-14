import {WaypointBase} from './waypoint-base';
import {Position2d} from '../../../geo-math/domain/geometry/position2d';
import {WaypointType} from '../waypoint-type';
import {Navaid} from '../../../open-aip/domain/navaid';


export class WaypointNavaid extends WaypointBase {
    constructor(public navaid: Navaid) {
        super();
    }


    public getType(): WaypointType {
        return WaypointType.navaid;
    }


    public getPosition(): Position2d {
        return this.navaid.position;
    }


    public getFrequency(): string {
        return this.navaid.frequency;
    }


    public getCallsign(): string {
        return this.navaid.kuerzel;
    }


    public getCheckpoint(): string {
        return this.navaid.kuerzel + ' ' + this.navaid.getTypeString();
    }
}
