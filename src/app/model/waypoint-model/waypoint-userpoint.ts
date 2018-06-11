import {WaypointBase} from './waypoint-base';
import {Userpoint} from '../userpoint';
import {Position2d} from '../position';
import {Waypointtype} from '../waypoint';


export class WaypointUserpoint extends WaypointBase {
    constructor(public userpoint: Userpoint) {
        super();
    }


    public getType(): Waypointtype {
        return Waypointtype.user;
    }


    public getPosition(): Position2d {
        return this.userpoint.position;
    }


    public getCheckpoint(): string {
        return this.userpoint.name;
    }


    public getRemarks(): string {
        return this.userpoint.remark;
    }


    public getSuppInfo(): string {
        return this.userpoint.supp_info;
    }
}
