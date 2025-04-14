import {IRestOgnTrafficResponse} from './i-rest-ogn-traffic-response';
import {RestOgnTrafficConverter} from './rest-ogn-traffic-converter';
import {OgnTraffic} from '../../domain/model/ogn-traffic';


export class RestOgnTrafficResponseConverter {
    public static fromRest(response: IRestOgnTrafficResponse): OgnTraffic[] {
        return response.aclist.map(ac => RestOgnTrafficConverter.fromRest(ac));
    }
}
