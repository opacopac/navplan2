import {IRestFlightrouteWaypoint} from './i-rest-flightroute-waypoint';


export interface IRestFlightroute {
    id: number;
    title: string;
    aircraft_speed: number;
    aircraft_consumption: number;
    extra_fuel: number;
    comments: string;
    waypoints: IRestFlightrouteWaypoint[];
    alternate: IRestFlightrouteWaypoint;
}
