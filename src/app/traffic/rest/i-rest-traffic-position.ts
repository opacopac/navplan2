import {IRestPosition4d} from '../../common/geo-math/rest-model/i-rest-position4d';


export interface IRestTrafficPosition {
    position: IRestPosition4d;
    method: string;
    receiver: string;
    timestamp: number;
}
