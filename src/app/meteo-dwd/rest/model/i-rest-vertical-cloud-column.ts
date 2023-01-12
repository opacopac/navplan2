import {IRestVerticalCloudLevel} from './i-rest-vertical-cloud-level';
import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';


export interface IRestVerticalCloudColumn {
    0: IRestLength;
    1: IRestVerticalCloudLevel[];
}
