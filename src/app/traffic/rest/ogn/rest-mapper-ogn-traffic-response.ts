import {IRestOgnTrafficResponse} from './i-rest-ogn-traffic-response';
import {RestMapperOgnTraffic} from './rest-mapper-ogn-traffic';
import {TrafficOgn} from '../../domain-model/traffic-ogn';


export class RestMapperOgnTrafficResponse {
    public static fromRest(response: IRestOgnTrafficResponse): TrafficOgn[] {
        return response.aclist.map(ac => RestMapperOgnTraffic.fromRest(ac));
    }
}
