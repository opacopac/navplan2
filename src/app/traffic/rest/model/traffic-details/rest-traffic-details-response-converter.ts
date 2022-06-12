import {IRestTrafficDetailsResponse} from './i-rest-traffic-details-response';
import {RestTrafficDetailsConverter} from './rest-traffic-details-converter';
import {TrafficDetails} from '../../../domain/model/traffic-details';


export class RestTrafficDetailsResponseConverter {
    public static fromRest(response: IRestTrafficDetailsResponse): TrafficDetails[] {
        if (!response.aclist) {
            return [];
        }

        return response.aclist.map(ac => RestTrafficDetailsConverter.fromRest(ac));
    }
}
