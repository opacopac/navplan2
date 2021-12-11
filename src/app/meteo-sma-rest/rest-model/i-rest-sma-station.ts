import {IRestPosition2d} from '../../geo-physics-rest/rest-model/i-rest-position2d';
import {IRestAltitude} from '../../geo-physics-rest/rest-model/i-rest-altitude';


export interface IRestSmaStation {
    id: string;
    name: string;
    pos: IRestPosition2d;
    alt: IRestAltitude;
}
