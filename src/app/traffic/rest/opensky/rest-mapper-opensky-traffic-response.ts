import {IRestOpenskyTrafficResponse} from './i-rest-opensky-traffic-response';
import {RestMapperOpenskyTraffic} from './rest-mapper-opensky-traffic';
import {TrafficOpensky} from '../../domain-model/traffic-opensky';


export class RestMapperOpenskyTrafficResponse {
    public static fromRest(response: IRestOpenskyTrafficResponse): TrafficOpensky[] {
        if (!response.states) {
            return [];
        }

        return response.states.map(ac => RestMapperOpenskyTraffic.fromRest(ac, response.time));
    }
}
