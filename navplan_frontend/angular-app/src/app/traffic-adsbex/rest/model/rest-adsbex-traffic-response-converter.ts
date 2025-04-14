import {IRestAdsbexTrafficResponse} from './i-rest-adsbex-traffic-response';
import {AdsbexTraffic} from '../../domain/model/adsbex-traffic';
import {RestAdsbexTrafficConverter} from './rest-adsbex-traffic-converter';


export class RestAdsbexTrafficResponseConverter {
    public static fromRest(response: IRestAdsbexTrafficResponse): AdsbexTraffic[] {
        return response.aclist.map(ac => RestAdsbexTrafficConverter.fromRest(ac));
    }
}
