import {IRestOgnTrafficResponse} from './i-rest-ogn-traffic-response';
import {RestOgnTraffic} from './rest-ogn-traffic';
import {TrafficOgn} from '../../domain/traffic-ogn';


export class RestOgnTrafficResponse {
    public static fromRest(response: IRestOgnTrafficResponse): TrafficOgn[] {
        return response.aclist.map(ac => RestOgnTraffic.fromRest(ac));
    }
}
