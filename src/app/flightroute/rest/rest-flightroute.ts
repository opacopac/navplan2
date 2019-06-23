import {Speed} from '../../shared/model/quantities/speed';
import {Consumption} from '../../shared/model/quantities/consumption';
import {Time} from '../../shared/model/quantities/time';
import {Flightroute} from '../domain/flightroute';
import {Aircraft} from '../domain/aircraft';
import {Waypoint} from '../domain/waypoint';
import {ConsumptionUnit, SpeedUnit, TimeUnit} from '../../shared/model/quantities/units';
import {IRestFlightroute} from './i-rest-flightroute';
import {RestFlightrouteWaypoint} from './rest-flightroute-waypoint';


export class RestFlightroute {
    public static fromRest(restFlightroute: IRestFlightroute): Flightroute {
        const aircraft = new Aircraft(
            new Speed(restFlightroute.aircraft_speed, SpeedUnit.KT),
            new Consumption(restFlightroute.aircraft_consumption, ConsumptionUnit.L_PER_H)
        );

        const waypoints: Waypoint[] = [];
        for (let i = 0; i < restFlightroute.waypoints.length; i++) {
            const waypoint = RestFlightrouteWaypoint.fromRest(restFlightroute.waypoints[i]);
            waypoints.push(waypoint);
        }

        let alternate: Waypoint;
        if (restFlightroute.alternate) {
            alternate = RestFlightrouteWaypoint.fromRest(restFlightroute.alternate);
        }

        return new Flightroute(
            restFlightroute.id,
            restFlightroute.title,
            restFlightroute.comments,
            aircraft,
            waypoints,
            alternate,
            new Time(restFlightroute.extra_fuel, TimeUnit.M)
        );
    }
}
