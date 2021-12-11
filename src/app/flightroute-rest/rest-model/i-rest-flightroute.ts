import {IRestWaypoint} from './i-rest-waypoint';
import {IRestSpeed} from '../../common/geo-math/rest-model/i-rest-speed';
import {IRestConsumption} from '../../common/geo-math/rest-model/i-rest-consumption';
import {IRestVolume} from '../../common/geo-math/rest-model/i-rest-volume';


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
