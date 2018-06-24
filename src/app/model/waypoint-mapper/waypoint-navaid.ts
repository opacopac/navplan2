import {WaypointBase} from './waypoint-base';
import {Position2d} from '../geometry/position2d';
import {Navaid} from '../navaid';
import {Waypointtype} from '../waypoint';


export class WaypointNavaid extends WaypointBase {
    constructor(public navaid: Navaid) {
        super();
    }


    public getType(): Waypointtype {
        return Waypointtype.navaid;
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
        return this.navaid.kuerzel + ' ' + this.navaid.type;
    }
}
