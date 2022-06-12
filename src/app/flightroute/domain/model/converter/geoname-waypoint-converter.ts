import {Geoname} from '../../../../geoname/domain/model/geoname';
import {WaypointType} from '../waypoint-type';
import {Waypoint} from '../waypoint';
import {WaypointAltitude} from '../waypoint-altitude';


export class GeonameWaypointConverter {
    public static convert(geoname: Geoname): Waypoint {
        return new Waypoint(
            WaypointType.geoname,
            '',
            '',
            geoname.name,
            '',
            '',
            geoname.position,
            new WaypointAltitude()
        );
    }
}
