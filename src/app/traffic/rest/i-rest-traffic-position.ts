import {IRestPosition4d} from '../../geo-math/rest/i-rest-position4d';


export interface IRestTrafficPosition {
    position: IRestPosition4d;
    method: string;
    receiver: string;
    timestamp: number;
}
