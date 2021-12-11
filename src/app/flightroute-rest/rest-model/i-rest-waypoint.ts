import {IRestPosition2d} from '../../geo-physics-rest/rest-model/i-rest-position2d';
import {IRestWaypointAltitude} from './i-rest-waypoint-altitude';


export interface IRestWaypoint {
    type: string;
    freq: string;
    callsign: string;
    checkpoint: string;
    mt_text: string;
    dist_text: string;
    wp_alt: IRestWaypointAltitude;
    eet_text: string;
    remark: string;
    supp_info: string;
    pos: IRestPosition2d;
}
