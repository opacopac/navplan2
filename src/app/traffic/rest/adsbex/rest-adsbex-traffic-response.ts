import {IRestAdsbexTrafficResponse} from './i-rest-adsbex-traffic-response';
import {TrafficAdsbex} from '../../domain/traffic-adsbex';
import {RestAdsbexTraffic} from './rest-adsbex-traffic';


export class RestAdsbexTrafficResponse {
    public static fromRest(response: IRestAdsbexTrafficResponse): TrafficAdsbex[] {
        return response.aclist.map(ac => RestAdsbexTraffic.fromRest(ac));
    }
}
