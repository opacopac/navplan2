import {IRestTrafficAddress} from '../../../traffic/rest/model/i-rest-traffic-address';


export interface IRestTrafficDetailsRequestItem {
    addr: IRestTrafficAddress;
    ac_type: string;
}
