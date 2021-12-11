import {IRestPosition4d} from '../../geo-physics-rest/rest-model/i-rest-position4d';


export interface IRestTrafficPosition {
    position: IRestPosition4d;
    method: string;
    receiver: string;
    timestamp: number;
}
