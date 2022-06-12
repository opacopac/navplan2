import {IRestPosition2d} from '../../../geo-physics/rest/model/i-rest-position2d';


export interface IRestUserpoint {
    id: number;
    type: string;
    name: string;
    pos: IRestPosition2d;
    remark: string;
    supp_info: string;
}
