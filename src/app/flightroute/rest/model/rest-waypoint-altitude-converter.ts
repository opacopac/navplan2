import {WaypointAltitude} from '../../domain/model/waypoint-altitude';
import {IRestWaypointAltitude} from './i-rest-waypoint-altitude';
import {RestAltitudeConverter} from '../../../geo-physics/rest/model/rest-altitude-converter';


export class RestWaypointAltitudeConverter {
    public static fromRest(restWpAlt: IRestWaypointAltitude): WaypointAltitude {
        return restWpAlt ? new WaypointAltitude(
            restWpAlt.alt ? RestAltitudeConverter.fromRest(restWpAlt.alt) : undefined,
            restWpAlt.isminalt,
            restWpAlt.ismaxalt,
            restWpAlt.isaltatlegstart
        ) : undefined;
    }


    public static toRest(wpAlt: WaypointAltitude): IRestWaypointAltitude {
        return wpAlt ? {
            alt: RestAltitudeConverter.toRest(wpAlt.alt),
            isminalt: wpAlt.isminalt,
            ismaxalt: wpAlt.ismaxalt,
            isaltatlegstart: wpAlt.isaltatlegstart
        } : undefined;
    }
}
