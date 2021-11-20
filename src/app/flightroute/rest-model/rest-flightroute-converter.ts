import {Speed} from '../../common/geo-math/domain-model/quantities/speed';
import {Consumption} from '../../common/geo-math/domain-model/quantities/consumption';
import {Time} from '../../common/geo-math/domain-model/quantities/time';
import {Flightroute} from '../domain-model/flightroute';
import {Aircraft} from '../domain-model/aircraft';
import {Waypoint} from '../domain-model/waypoint';
import {TimeUnit} from '../../common/geo-math/domain-model/quantities/time-unit';
import {IRestFlightroute} from './i-rest-flightroute';
import {RestFlightrouteWaypointConverter} from './rest-flightroute-waypoint-converter';
import {SpeedUnit} from '../../common/geo-math/domain-model/quantities/speed-unit';
import {ConsumptionUnit} from '../../common/geo-math/domain-model/quantities/consumption-unit';


export class RestFlightrouteConverter {
    public static fromRest(restFlightroute: IRestFlightroute): Flightroute {
        const aircraft = new Aircraft(
            new Speed(restFlightroute.aircraft_speed, SpeedUnit.KT),
            new Consumption(restFlightroute.aircraft_consumption, ConsumptionUnit.L_PER_H)
        );

        const waypoints: Waypoint[] = [];
        for (let i = 0; i < restFlightroute.waypoints.length; i++) {
            const waypoint = RestFlightrouteWaypointConverter.fromRest(restFlightroute.waypoints[i]);
            waypoints.push(waypoint);
        }

        let alternate: Waypoint;
        if (restFlightroute.alternate) {
            alternate = RestFlightrouteWaypointConverter.fromRest(restFlightroute.alternate);
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
