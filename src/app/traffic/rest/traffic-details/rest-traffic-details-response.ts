import {IRestTrafficDetailsResponse} from './i-rest-traffic-details-response';
import {RestTrafficDetails} from './rest-traffic-details';
import {TrafficDetails} from '../../domain/traffic-details';


export class RestTrafficDetailsResponse {
    public static fromRest(response: IRestTrafficDetailsResponse): TrafficDetails[] {
        if (!response.aclist) {
            return [];
        }

        return response.aclist.map(ac => RestTrafficDetails.fromRest(ac));
    }
}
