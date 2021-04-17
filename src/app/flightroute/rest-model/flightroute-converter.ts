import {Speed} from '../../geo-math/domain-model/quantities/speed';
import {Consumption} from '../../geo-math/domain-model/quantities/consumption';
import {Time} from '../../geo-math/domain-model/quantities/time';
import {Flightroute} from '../domain-model/flightroute';
import {Aircraft} from '../domain-model/aircraft';
import {Waypoint} from '../domain-model/waypoint';
import {ConsumptionUnit, SpeedUnit, TimeUnit} from '../../geo-math/domain-model/quantities/units';
import {IRestFlightroute} from './i-rest-flightroute';
import {FlightrouteWaypointConverter} from './flightroute-waypoint-converter';


export class FlightrouteConverter {
    public static fromRest(restFlightroute: IRestFlightroute): Flightroute {
        const aircraft = new Aircraft(
            new Speed(restFlightroute.aircraft_speed, SpeedUnit.KT),
            new Consumption(restFlightroute.aircraft_consumption, ConsumptionUnit.L_PER_H)
        );

        const waypoints: Waypoint[] = [];
        for (let i = 0; i < restFlightroute.waypoints.length; i++) {
            const waypoint = FlightrouteWaypointConverter.fromRest(restFlightroute.waypoints[i]);
            waypoints.push(waypoint);
        }

        let alternate: Waypoint;
        if (restFlightroute.alternate) {
            alternate = FlightrouteWaypointConverter.fromRest(restFlightroute.alternate);
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
