import {WaypointType} from '../waypoint-type';
import {Navaid} from '../../../../enroute/domain/model/navaid';
import {Waypoint} from '../waypoint';
import {WaypointAltitude} from '../waypoint-altitude';


export class NavaidWaypointConverter {
    public static convert(navaid: Navaid): Waypoint {
        return new Waypoint(
            WaypointType.navaid,
            navaid.frequency,
            navaid.kuerzel,
            navaid.kuerzel + ' ' + navaid.getTypeString(),
            '',
            '',
            navaid.position,
            new WaypointAltitude()
        );
    }
}
