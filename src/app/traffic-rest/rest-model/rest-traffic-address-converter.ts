import {TrafficAddressType} from '../../traffic/domain-model/traffic-address-type';
import {IRestTrafficAddress} from './i-rest-traffic-address';
import {TrafficAddress} from '../../traffic/domain-model/traffic-address';


export class RestTrafficAddressConverter {
    public static fromRest(restTrafficAddress: IRestTrafficAddress): TrafficAddress {
        return new TrafficAddress(
            restTrafficAddress[0].toString().toUpperCase(),
            TrafficAddressType[restTrafficAddress[1]]
        );
    }


    public static toRest(trafficAddress: TrafficAddress): IRestTrafficAddress {
        return [
            trafficAddress.value,
            TrafficAddressType[trafficAddress.type]
        ];
    }
}
