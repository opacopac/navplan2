import {IRestTrafficPosition} from '../i-rest-traffic-position';
import {IRestTrafficAddress} from '../i-rest-traffic-address';


export interface IRestAdsbexTraffic {
    addr: IRestTrafficAddress;
    icaotype: string;
    reg: string;
    call: string;
    opicao: string;
    poslist: IRestTrafficPosition[];
}
