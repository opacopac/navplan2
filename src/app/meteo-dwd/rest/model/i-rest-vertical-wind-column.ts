import {IRestVerticalWindLevel} from './i-rest-vertical-wind-level';
import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';


export interface IRestVerticalWindColumn {
    0: IRestLength;
    1: IRestVerticalWindColumn[];
}
