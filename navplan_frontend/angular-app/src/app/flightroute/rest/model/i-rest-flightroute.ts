import {IRestWaypoint} from './i-rest-waypoint';
import {IRestSpeed} from '../../../geo-physics/rest/model/i-rest-speed';
import {IRestConsumption} from '../../../geo-physics/rest/model/i-rest-consumption';
import {IRestVolume} from '../../../geo-physics/rest/model/i-rest-volume';
import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';


export interface IRestFlightroute {
    id: number;
    title: string;
    aircraft_speed: IRestSpeed;
    aircraft_consumption: IRestConsumption;
    extra_fuel: IRestVolume;
    cruise_alt?: IRestLength;
    comments: string;
    waypoints: IRestWaypoint[];
    alternate: IRestWaypoint;
}
