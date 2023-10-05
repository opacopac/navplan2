import {IRestAltitude} from '../../../geo-physics/rest/model/i-rest-altitude';
import {IRestAngle} from '../../../geo-physics/rest/model/i-rest-angle';
import {IRestSpeed} from '../../../geo-physics/rest/model/i-rest-speed';


export interface IRestVerticalWindLevel {
    0: IRestAltitude;
    1: IRestAngle;
    2: IRestSpeed;
}
