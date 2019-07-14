import {IRestTrafficDetailsResponse} from './i-rest-traffic-details-response';
import {RestMapperTrafficDetails} from './rest-mapper-traffic-details';
import {TrafficDetails} from '../../domain/traffic-details';


export class RestMapperTrafficDetailsResponse {
    public static fromRest(response: IRestTrafficDetailsResponse): TrafficDetails[] {
        if (!response.aclist) {
            return [];
        }

        return response.aclist.map(ac => RestMapperTrafficDetails.fromRest(ac));
    }
}
