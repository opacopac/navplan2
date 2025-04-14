import {IRestTrafficPosition} from '../../../traffic/rest/model/i-rest-traffic-position';
import {IRestTrafficAddress} from '../../../traffic/rest/model/i-rest-traffic-address';


export interface IRestOgnTraffic {
    addr: IRestTrafficAddress;
    actype: string;
    poslist: IRestTrafficPosition[];
}
