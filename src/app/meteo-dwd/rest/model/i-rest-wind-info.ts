import {IRestSpeed} from '../../../geo-physics/rest/model/i-rest-speed';
import {IRestAngle} from '../../../geo-physics/rest/model/i-rest-angle';


export interface IRestWindInfo {
    0: IRestSpeed;
    1: IRestAngle;
    2: IRestSpeed;
}
