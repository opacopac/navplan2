import {Flightroute} from '../../domain/model/flightroute';
import {IRestFlightrouteResponse} from '../model/i-rest-flightroute-response';
import {RestFlightrouteConverter} from './rest-flightroute-converter';


export class RestFlightrouteResponseConverter {
    public static fromRest(restFlightrouteResponse: IRestFlightrouteResponse): Flightroute {
        return RestFlightrouteConverter.fromRest(restFlightrouteResponse.navplan);
    }
}
