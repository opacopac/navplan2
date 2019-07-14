import {RestMapperTrafficDetails} from './rest-mapper-traffic-details';
import {Traffic} from '../../domain/traffic';
import {IRestTrafficDetailsRequest} from './i-rest-traffic-details-request';
import {TrafficAddressType} from '../../domain/traffic-address-type';


export class RestMapperTrafficDetailsRequest {
    public static toRest(trafficList: Traffic[]): IRestTrafficDetailsRequest {
        return {
            action: 'readtrafficdetails',
            aclist: trafficList
                .filter(traffic => traffic.address.type === TrafficAddressType.ICAO)
                .map(ac => RestMapperTrafficDetails.toRest(ac))
        };
    }
}
