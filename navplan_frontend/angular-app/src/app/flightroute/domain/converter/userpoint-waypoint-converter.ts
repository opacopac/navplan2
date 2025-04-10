import {UserPoint} from '../../../user-point/domain/model/user-point';
import {WaypointType} from '../model/waypoint-type';
import {Waypoint} from '../model/waypoint';
import {WaypointAltitude} from '../model/waypoint-altitude';


export class UserpointWaypointConverter {
    public static convert(userpoint: UserPoint): Waypoint {
        return new Waypoint(
            WaypointType.user,
            '',
            '',
            userpoint.name,
            userpoint.remark,
            userpoint.supp_info,
            userpoint.position,
            new WaypointAltitude()
        );
    }
}
