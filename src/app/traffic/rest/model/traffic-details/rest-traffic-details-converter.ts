import {IRestTrafficDetails} from './i-rest-traffic-details';
import {TrafficDetails} from '../../../domain/model/traffic-details';
import {IRestTrafficDetailsRequestItem} from './i-rest-traffic-details-request-item';
import {Traffic} from '../../../domain/model/traffic';
import {RestTrafficAddressConverter} from '../rest-traffic-address-converter';


export class RestTrafficDetailsConverter {
    public static toRest(traffic: Traffic): IRestTrafficDetailsRequestItem {
        return {
            addr: RestTrafficAddressConverter.toRest(traffic.address),
            ac_type: traffic.acIcao
        };
    }


    public static fromRest(restTrafficDetails: IRestTrafficDetails): TrafficDetails {
        return new TrafficDetails(
            RestTrafficAddressConverter.fromRest(restTrafficDetails.addr),
            restTrafficDetails.reg,
            restTrafficDetails.model,
            restTrafficDetails.manufacturer,
            restTrafficDetails.ac_type,
            restTrafficDetails.ac_class,
            restTrafficDetails.eng_class
        );
    }
}
