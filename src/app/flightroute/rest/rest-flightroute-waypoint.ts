import {Position2d} from '../../shared/model/geometry/position2d';
import {Waypoint} from '../domain/waypoint';
import {WaypointAltitude} from '../domain/waypoint-altitude';
import {WaypointType} from '../domain/waypoint-type';
import {IRestFlightrouteWaypoint} from './i-rest-flightroute-waypoint';


export class RestFlightrouteWaypoint {
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
