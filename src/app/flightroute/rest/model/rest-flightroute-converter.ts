import {Flightroute} from '../../domain/model/flightroute';
import {Aircraft} from '../../domain/model/aircraft';
import {IRestFlightroute} from './i-rest-flightroute';
import {RestWaypointConverter} from './rest-waypoint-converter';
import {RestSpeedConverter} from '../../../geo-physics/rest/model/rest-speed-converter';
import {RestConsumptionConverter} from '../../../geo-physics/rest/model/rest-consumption-converter';
import {RestTimeConverter} from '../../../geo-physics/rest/model/rest-time-converter';


export class RestFlightrouteConverter {
    public static fromRest(restFlightroute: IRestFlightroute): Flightroute {
        const aircraft = new Aircraft(
            RestSpeedConverter.fromRest(restFlightroute.aircraft_speed),
            RestConsumptionConverter.fromRest(restFlightroute.aircraft_consumption)
        );

        return new Flightroute(
            restFlightroute.id,
            restFlightroute.title,
            restFlightroute.comments,
            aircraft,
            RestWaypointConverter.fromRestList(restFlightroute.waypoints),
            RestWaypointConverter.fromRest(restFlightroute.alternate),
            RestTimeConverter.fromRest(restFlightroute.extra_fuel)
        );
    }


    public static toRest(flightroute: Flightroute): IRestFlightroute {
        return {
            id: flightroute.id,
            title: flightroute.title,
            comments: flightroute.comments,
            aircraft_speed: RestSpeedConverter.toRest(flightroute.aircraft.speed),
            aircraft_consumption: RestConsumptionConverter.toRest(flightroute.aircraft.consumption),
            waypoints: RestWaypointConverter.toRestList(flightroute.waypoints),
            alternate: RestWaypointConverter.toRest(flightroute.alternate),
            extra_fuel: RestTimeConverter.toRest(flightroute.extraTime),
        };
    }
}
