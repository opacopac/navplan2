import {WaypointBase} from './waypoint-base';
import {UserPoint} from '../../../user/domain-model/user-point';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {WaypointType} from '../waypoint-type';


export class WaypointUserpoint extends WaypointBase {
    constructor(public userpoint: UserPoint) {
        super();
    }


    public getType(): WaypointType {
        return WaypointType.user;
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
