import {IRestTrafficPosition} from '../i-rest-traffic-position';
import {IRestTrafficAddress} from '../i-rest-traffic-address';


export interface IRestOgnTraffic {
    addr: IRestTrafficAddress;
    actype: string;
    poslist: IRestTrafficPosition[];
}
