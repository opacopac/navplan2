import {IRestTrafficPosition} from '../../../traffic/rest/model/i-rest-traffic-position';
import {IRestTrafficAddress} from '../../../traffic/rest/model/i-rest-traffic-address';


export interface IRestAdsbexTraffic {
    addr: IRestTrafficAddress;
    icaotype: string;
    reg: string;
    call: string;
    opicao: string;
    poslist: IRestTrafficPosition[];
}
