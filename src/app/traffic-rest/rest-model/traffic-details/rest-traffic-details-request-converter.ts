import {RestTrafficDetailsConverter} from './rest-traffic-details-converter';
import {Traffic} from '../../../traffic/domain-model/traffic';
import {IRestTrafficDetailsRequest} from './i-rest-traffic-details-request';
import {TrafficAddressType} from '../../../traffic/domain-model/traffic-address-type';


export class RestTrafficDetailsRequestConverter {
    public static toRest(trafficList: Traffic[]): IRestTrafficDetailsRequest {
        return {
            action: 'readtrafficdetails',
            aclist: trafficList
                .filter(traffic => traffic.address.type === TrafficAddressType.ICAO)
                .map(ac => RestTrafficDetailsConverter.toRest(ac))
        };
    }
}
