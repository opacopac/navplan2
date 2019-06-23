import {Flightroute} from '../domain/flightroute';
import {IRestFlightrouteResponse} from './i-rest-flightroute-response';
import {RestFlightroute} from './rest-flightroute';


export class RestFlightrouteResponse {
    public static fromRest(restFlightrouteResponse: IRestFlightrouteResponse): Flightroute {
        return RestFlightroute.fromRest(restFlightrouteResponse.navplan);
    }
}
