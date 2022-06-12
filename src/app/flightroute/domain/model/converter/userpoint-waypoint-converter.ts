import {UserPoint} from '../../../../user/domain/model/user-point';
import {WaypointType} from '../waypoint-type';
import {Waypoint} from '../waypoint';
import {WaypointAltitude} from '../waypoint-altitude';


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
