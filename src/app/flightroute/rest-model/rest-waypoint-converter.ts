import {Waypoint} from '../domain-model/waypoint';
import {WaypointType} from '../domain-model/waypoint-type';
import {IRestWaypoint} from './i-rest-waypoint';
import {Position2dConverter} from '../../common/geo-math/rest-model/position2d-converter';
import {RestWaypointAltitudeConverter} from './rest-waypoint-altitude-converter';


export class RestWaypointConverter {
    public static fromRest(restWp: IRestWaypoint): Waypoint {
        return new Waypoint(
            WaypointType[restWp.type],
            restWp.freq,
            restWp.callsign,
            restWp.checkpoint,
            restWp.remark,
            restWp.supp_info,
            Position2dConverter.fromRest(restWp.pos),
            RestWaypointAltitudeConverter.fromRest(restWp.wp_alt)
        );
    }


    public static fromRestList(restWpList: IRestWaypoint[]): Waypoint[] {
        return restWpList.map(restWp => RestWaypointConverter.fromRest(restWp));
    }


    public static toRest(wp: Waypoint): IRestWaypoint {
        return {
            type: WaypointType[wp.type],
            freq: wp.freq,
            callsign: wp.callsign,
            checkpoint: wp.checkpoint,
            mt_text: wp.mtText,
            dist_text: wp.distText,
            wp_alt: RestWaypointAltitudeConverter.toRest(wp.alt),
            eet_text: wp.eetText,
            remark: wp.remark,
            supp_info: wp.supp_info,
            pos: Position2dConverter.toRest(wp.position),
        };
    }


    public static toRestList(wpList: Waypoint[]): IRestWaypoint[] {
        return wpList.map(wp => RestWaypointConverter.toRest(wp));
    }
}
