import {WaypointType} from '../model/waypoint-type';
import {Navaid} from '../../../navaid/domain/model/navaid';
import {Waypoint} from '../model/waypoint';
import {WaypointAltitude} from '../model/waypoint-altitude';


export class NavaidWaypointConverter {
    public static convert(navaid: Navaid): Waypoint {
        return new Waypoint(
            WaypointType.navaid,
            navaid.frequency.getValueString(),
            navaid.kuerzel,
            navaid.kuerzel + ' ' + navaid.getTypeString(),
            '',
            '',
            navaid.position,
            new WaypointAltitude()
        );
    }
}
