import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Waypoint} from '../domain-model/waypoint';
import {WaypointAltitude} from '../domain-model/waypoint-altitude';
import {WaypointType} from '../domain-model/waypoint-type';
import {IRestFlightrouteWaypoint} from './i-rest-flightroute-waypoint';


export class FlightrouteWaypointConverter {
    public static fromRest(restWp: IRestFlightrouteWaypoint): Waypoint {
        return new Waypoint(
            WaypointType[restWp.type],
            restWp.freq,
            restWp.callsign,
            restWp.checkpoint,
            restWp.remark,
            restWp.supp_info,
            new Position2d(restWp.longitude, restWp.latitude),
            new WaypointAltitude(
                restWp.alt,
                restWp.isminalt === 1, // 0: false, 1: true
                restWp.ismaxalt === 1, // 0: false, 1: true
                restWp.isaltatlegstart === 1 // 0: false, 1: true
            )
        );
    }
}
