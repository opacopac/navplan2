import {IRestAdsbexTrafficResponse} from './i-rest-adsbex-traffic-response';
import {TrafficAdsbex} from '../../domain-model/traffic-adsbex';
import {RestMapperAdsbexTraffic} from './rest-mapper-adsbex-traffic';


export class RestMapperAdsbexTrafficResponse {
    public static fromRest(response: IRestAdsbexTrafficResponse): TrafficAdsbex[] {
        return response.aclist.map(ac => RestMapperAdsbexTraffic.fromRest(ac));
    }
}
