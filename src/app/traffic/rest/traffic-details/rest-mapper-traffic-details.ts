import {IRestTrafficDetails} from './i-rest-traffic-details';
import {TrafficDetails} from '../../domain/traffic-details';
import {IRestTrafficDetailsRequestItem} from './i-rest-traffic-details-request-item';
import {Traffic} from '../../domain/traffic';
import {RestMapperTrafficAddress} from '../rest-mapper-traffic-address';


export class RestMapperTrafficDetails {
    public static toRest(traffic: Traffic): IRestTrafficDetailsRequestItem {
        return {
            addr: RestMapperTrafficAddress.toRest(traffic.address),
            ac_type: traffic.acIcao
        };
    }


    public static fromRest(restTrafficDetails: IRestTrafficDetails): TrafficDetails {
        return new TrafficDetails(
            RestMapperTrafficAddress.fromRest(restTrafficDetails.addr),
            restTrafficDetails.reg,
            restTrafficDetails.model,
            restTrafficDetails.manufacturer,
            restTrafficDetails.ac_type,
            restTrafficDetails.ac_class,
            restTrafficDetails.eng_class
        );
    }
}
