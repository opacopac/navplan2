import {IRestWaypoint} from './i-rest-waypoint';
import {IRestSpeed} from '../../geo-physics-rest/rest-model/i-rest-speed';
import {IRestConsumption} from '../../geo-physics-rest/rest-model/i-rest-consumption';
import {IRestVolume} from '../../geo-physics-rest/rest-model/i-rest-volume';


export interface IRestFlightroute {
    id: number;
    title: string;
    aircraft_speed: IRestSpeed;
    aircraft_consumption: IRestConsumption;
    extra_fuel: IRestVolume;
    comments: string;
    waypoints: IRestWaypoint[];
    alternate: IRestWaypoint;
}
