import {IRestPosition2d} from '../../common/geo-math/rest-model/i-rest-position2d';
import {IRestAltitude} from '../../common/geo-math/rest-model/i-rest-altitude';


export interface IRestSmaStation {
    id: string;
    name: string;
    pos: IRestPosition2d;
    alt: IRestAltitude;
}
