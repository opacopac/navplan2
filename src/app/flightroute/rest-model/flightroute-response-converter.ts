import {Flightroute} from '../domain-model/flightroute';
import {IRestFlightrouteResponse} from './i-rest-flightroute-response';
import {FlightrouteConverter} from './flightroute-converter';


export class FlightrouteResponseConverter {
    public static fromRest(restFlightrouteResponse: IRestFlightrouteResponse): Flightroute {
        return FlightrouteConverter.fromRest(restFlightrouteResponse.navplan);
    }
}
