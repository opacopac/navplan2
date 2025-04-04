import {Geoname} from '../../../geoname/domain/model/geoname';
import {WaypointType} from '../model/waypoint-type';
import {Waypoint} from '../model/waypoint';
import {WaypointAltitude} from '../model/waypoint-altitude';


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
