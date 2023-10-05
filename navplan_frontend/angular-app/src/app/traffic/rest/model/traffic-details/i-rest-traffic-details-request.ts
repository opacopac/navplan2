import {IRestTrafficDetailsRequestItem} from './i-rest-traffic-details-request-item';


export interface IRestTrafficDetailsRequest {
    action: string;
    aclist: IRestTrafficDetailsRequestItem[];
}
