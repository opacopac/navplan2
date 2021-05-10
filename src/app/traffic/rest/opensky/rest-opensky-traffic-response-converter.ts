import {IRestOpenskyTrafficResponse} from './i-rest-opensky-traffic-response';
import {RestOpenskyTrafficConverter} from './rest-opensky-traffic-converter';
import {OpenskyTraffic} from '../../domain-model/opensky-traffic';


export class RestOpenskyTrafficResponseConverter {
    public static fromRest(response: IRestOpenskyTrafficResponse): OpenskyTraffic[] {
        if (!response.states) {
            return [];
        }

        return response.states.map(ac => RestOpenskyTrafficConverter.fromRest(ac, response.time));
    }
}
