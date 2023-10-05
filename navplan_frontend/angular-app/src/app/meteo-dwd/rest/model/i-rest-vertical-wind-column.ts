import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';
import {IRestVerticalWindLevel} from './i-rest-vertical-wind-level';


export interface IRestVerticalWindColumn {
    0: IRestLength;
    1: IRestVerticalWindLevel[];
}
