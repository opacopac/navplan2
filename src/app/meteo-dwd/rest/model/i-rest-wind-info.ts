import {IRestSpeed} from '../../../geo-physics/rest/model/i-rest-speed';
import {IRestAngle} from '../../../geo-physics/rest/model/i-rest-angle';
import {IRestPosition2d} from '../../../geo-physics/rest/model/i-rest-position2d';


export interface IRestWindInfo {
    0: IRestSpeed;
    1: IRestAngle;
    2: IRestSpeed;
    3: IRestPosition2d;
}
