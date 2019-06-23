import {IRestOpenskyTrafficResponse} from './i-rest-opensky-traffic-response';
import {RestOpenskyTraffic} from './rest-opensky-traffic';
import {TrafficOpensky} from '../../domain/traffic-opensky';


export class RestOpenskyTrafficResponse {
    public static fromRest(response: IRestOpenskyTrafficResponse): TrafficOpensky[] {
        if (!response.states) {
            return [];
        }

        return response.states.map(ac => RestOpenskyTraffic.fromRest(ac, response.time));
    }
}
